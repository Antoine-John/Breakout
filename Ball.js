
	/*Need Velocity
	* color
	* radius*/
function Ball(radius, speed, startingAngle) {
	this.rad = radius;
	this.vel = {spd: speed, agl: startingAngle}
	this.col = "0095DD";
	this.pos = {x: 100, y: 200}
}