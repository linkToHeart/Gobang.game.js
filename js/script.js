var canvas = document.getElementById('board');
var context = canvas.getContext('2d');

context.strokeStyle = '#BFBFBF';
for (var i = 0; i < 15; i++) {
	context.moveTo(15 + i*30, 15);
	context.lineTo(15 + i*30, 435);
	context.stroke();
	context.moveTo(15, 15 + i*30);
	context.lineTo(435, 15 + i*30);
	context.stroke();
};