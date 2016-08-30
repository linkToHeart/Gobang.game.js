var canvas = document.getElementById('board');
var context = canvas.getContext('2d');
var me = true;
//游戏结束标志
var over = false;
//棋盘二维数组
var board = [];
for (var i = 0; i < 15; i++) {
	board[i] = [];
	for (var j = 0; j < 15; j++) {
		board[i][j] = 0;
	};
};
//赢法三维数组
var wins = [];
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	};
};
/**
	统计所有的赢法
*/
var count = 0;
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j+k][count] = true;
		};
		count++;
	};
};

for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j+k][i][count] = true;
		};
		count++;
	};
};

for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j+k][count] = true;
		};
		count++;
	};
};

for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j-k][count] = true;
		};
		count++;
	};
};

//赢法数组统计数组
var myWin = [];
var computerWin = [];
for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
};


context.strokeStyle = '#BFBFBF';
window.onload = function(){
	drawBoard();
}

/**
	画棋盘
*/
var drawBoard = function() {
	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}
}
/**
	画棋子
*/
var onStep = function(i, j, me) {
	//画圆
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();
	//渐变效果(两个圆的圆心相同，最外边的圆半径为13，最里面的圆半径为0)
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}

	context.fillStyle = gradient;
	context.fill();
}

canvas.onclick = function(event) {
	if (over) {
		return;
	};
	if (!me) {
		return;
	};
	var x = event.offsetX;
	var y = event.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(board[i][j] == 0){
		onStep(i, j, me);
		board[i][j] = 1;
		for (var k = 0; k < count; k++) {
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5){
					alert("你赢了！");
					over = true;
				}
			}
		};
		if (!over) {
			me = !me;
			computerAI();
		};
	}
	
}

var computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	//保存分数最高点的坐标
	var u = 0, v = 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		};
	};
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if(board[i][j] == 0){
				for (var k = 0; k < count; k++) {
					if(wins[i][j][k]){
						if (myWin[k] == 1) {
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScore[i][j] += 2100;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				};
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		};
	};
	onStep(u, v, false);
	board[u][v] = 2;
	for (var k = 0; k < count; k++) {
			if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k] = 6;
				if(computerWin[k] == 5){
					alert("你输了！");
					over = true;
				}
			}
		};
		if (!over) {
			me = !me;
		};
}