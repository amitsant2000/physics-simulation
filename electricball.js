var ctx = document.getElementById("newCanvas").getContext("2d");
var canvas = document.querySelector('canvas');
canvas.width = (window.innerWidth);
canvas.height = (window.innerHeight);
var radiusmet = prompt("Radius (m): ");
var radius = radiusmet*360;
ctx.translate(radius,radius);
ctx.translate(50,50);
var t = 0;
var time = 0;
var x = Math.round(radius*Math.cos(t));
var y = Math.round(radius*Math.sin(t));
var vmet = prompt("Velocity (m/s): ");
var v=vmet*360;
var ay = 1;
var period = 2*radius*Math.PI / v;
var x0;
var y0;
var raf;
var clicked=false;
function canvas_arrow(context, fromx, fromy, tox, toy, color){
    var headlen = 100;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.lineWidth = 10;
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
    context.lineWidth = 1;
}
function loop() {
  canvas.width = (window.innerWidth);
  canvas.height = (window.innerHeight);
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,newCanvas.width,newCanvas.height);
  ctx.globalAlpha = 0.3;
  var img1 = document.getElementById("magnetic");
  var pat1 = ctx.createPattern(img1, "repeat");
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = pat1;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
  ctx.translate(radius,radius);
  ctx.translate(50,50);
  ctx.strokeStyle = "#000000";
  ctx.font = "30px Arial";
  ctx.clearRect(window.innerWidth-860-radius+360, -10, 200, 100);
  ctx.fillStyle = "black";
  ctx.fillText("v = " + vmet + " m/s", window.innerWidth-850-radius+360, 30);
  ctx.beginPath();
  ctx.arc(x,-y,25,0,Math.PI*2,true);
  ctx.fill();
  canvas_arrow(ctx, x, -y, x-y*(v/radius)/10, -y-x*(v/radius)/10, "black");
  ctx.fillStyle = "red";
  ctx.font = "30px Arial"
  ctx.fillText("a = " + vmet**2/radiusmet + " m/s^2", window.innerWidth-850-radius+360, 70);
  canvas_arrow(ctx, x, -y, x-x*(vmet**2/radiusmet**3)/25, -y+y*(vmet**2/radiusmet**3)/25, "red");
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(window.innerWidth-850-radius+360, 220);
  ctx.lineTo(window.innerWidth-850-radius+720, 220);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(window.innerWidth-850-radius+360, 190);
  ctx.lineTo(window.innerWidth-850-radius+360, 250);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(window.innerWidth-850-radius+720, 190);
  ctx.lineTo(window.innerWidth-850-radius+720, 250);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillText("1 m", window.innerWidth-850-radius+520, 260);
  time += Math.PI / (30*period);
  x = Math.round(radius*Math.cos(time));
  y = Math.round(radius*Math.sin(time));
  raf = window.requestAnimationFrame(loop);
  newCanvas.addEventListener("click", function(e) {
    if(!clicked){
      clicked=true;
      window.cancelAnimationFrame(raf);
      x0 = x;
      y0 = y;
      vx0 = Math.round(v*Math.cos(Math.atan2(y,x)+Math.PI/2)/60);
      vy0 = Math.round(v*Math.sin(Math.atan2(y,x))/60);
      if (x0 > 0 && y0 >= 0) {
        vy0 *= -1;
      }
      if (x0 < 0 && y0 < 0) {
        vy0 *= -1;
      }
      raf = window.requestAnimationFrame(ball);
    }
  });
}
function ball() {
  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,newCanvas.width,newCanvas.height);
  ctx.globalAlpha = 0.3;
  var img2 = document.getElementById("electric");
  var pat2 = ctx.createPattern(img2, "repeat");
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = pat2;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
  ctx.beginPath();
  ctx.arc(x,-y,25,0,Math.PI*2,true);
  ctx.fill();
  t++;
  ctx.strokeStyle = "#000000";
  ctx.font = "30px Arial";
  ctx.clearRect(window.innerWidth-860-radius+360, -10, 3500, 170);
  ctx.fillStyle = "black";
  ctx.fillText("v = " + (((vx0**2+(vy0+ay*t)**2)**.5)/6) + " m/s", window.innerWidth-850-radius+360, 30);
  ctx.fillText("\u03bex = " + vx0*t/360 + " m", window.innerWidth-850-radius+360, 110);
  ctx.fillText("\u03bey = " + (-vy0*t - 0.5*ay*t*t)/360 + " m", window.innerWidth-850-radius+360, 150);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(window.innerWidth-850-radius+360, 220);
  ctx.lineTo(window.innerWidth-850-radius+720, 220);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(window.innerWidth-850-radius+360, 190);
  ctx.lineTo(window.innerWidth-850-radius+360, 250);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(window.innerWidth-850-radius+720, 190);
  ctx.lineTo(window.innerWidth-850-radius+720, 250);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillText("1 m", window.innerWidth-850-radius+520, 260);
  canvas_arrow(ctx, x, -y, x+vx0*6, -y+(vy0 + ay*t)*6, "black");
  canvas_arrow(ctx, x, -y, x, -y+360/2.5, "red");
  x = x0 + vx0*t;
  y = y0 - vy0*t - 0.5*ay*t*t;
  ctx.fillStyle = "red";
  ctx.fillText("a = " + 10 + " m/s^2", window.innerWidth-850-radius+360, 70);
  ctx.fillStyle = "black";
  raf = window.requestAnimationFrame(ball);
  if (x >= (newCanvas.width-radius-radius) || y <= -(newCanvas.height-radius-radius) || x <= (-2*radius) || y >= (2*radius)) {
    window.cancelAnimationFrame(raf);
  }
}
raf = window.requestAnimationFrame(loop);
