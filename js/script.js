var canvas = document.getElementById('board');
var context = canvas.getContext('2d');

context.strokeStyle = '#BFBFBF';
window.onload = function(){
	drawBoard();
	onStep(0, 0, true);
	onStep(1, 1, false);
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
