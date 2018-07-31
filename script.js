
/*
function draw(){
	var canvas = document.getElementById('wheel_of_fortune');
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FFFAFA";

	//Draw 'Pie' wheel
	for (i=1; i<=segments; i++){
		ctx.beginPath();
		ctx.moveTo(300,300);
		newAngle = i * angle;
		ctx.arc(300, 300, 200, 0, newAngle);
		ctx.lineTo(300, 300);
	  	ctx.stroke();
	}

}

window.onload = draw;
*/
//^used a canvas to draw the pie wheel, however the resulting wheel was rather pixelated, need to find way to make the wheel higher resolution or choose different method.



//This is the end goal to reach, make a function rotate, that runs similarly to the one below, uncomment for example

/*
$(document).ready(function(){
	$('.btn').click(function(){
		$("#test").css("-webkit-animation-duration", "1s");
		$("#test").delay(4000).queue(function(next){
			$(this).css("-webkit-animation-duration", "0.2s");
			next();
		});

		setTimeout(function(){
			$("#test").css("-webkit-animation-duration", "1s");
			setTimeout(function(){
				$("#test").css("-webkit-animation-duration", "0.5s");
				setTimeout(function(){
					$("#test").css("-webkit-animation-duration", "0.2s");
					setTimeout(function(){
						$("#test").css("-webkit-animation-duration", "1s");
						setTimeout(function(){
							$("#test").css("-webkit-animation-duration", "0s");
						}, 1000);
					}, 1000);
				}, 4000);
			}, 1000);
		}, 500);

	})
});
*/

/*
jQuery-Rotate-Plugin v0.2 by anatol.at
http://jsfiddle.net/Anatol/T6kDR/
*/

//currently random, but in future will take winners off of data
// .rotate() DEMO

/*
var end = 0;
$(function() {

  $('.btn').click(function() {
    $('#test').rotate({ count:4, duration:0.3, easing:'ease-in' });
    $('#test').rotate({ count:15, duration:0.1});
    for(var i=0.1; i<1.5; i=i+0.5){
    	$('#test').rotate({ count:1, duration:i});
    }
    for(var j=1.5; j<2.5; j=j+0.75){
    	$('#test').rotate({ count:1, duration:j});
    }
    for(var k=2.5; k<3.5; k=k+1){
    	$('#test').rotate({ count:1, duration:k});
    }
    end = Math.random()*360;

    //ensure that it the spinner does not land exactly between two categories, not necessary with predetermined winnings however
    if (end%30 == 0){
    	end=end+1;
    }
    time = end / 180 * 4;
    $('#test').rotate({duration:time, endDeg:end, easing:'ease-out', persist:true });
    var final = 12 - Math.floor(end/30);
    alert ('you got '+ final); 
  })
})

$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);

  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }

  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }

  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }

  supports.transform=supports('Transform');
  supports.transition=supports('Transition');

  opts.endDeg*=opts.count;
  opts.duration*=opts.count;

  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
          .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
          .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
          .css(opts.animate);
      }, wait4css);

      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });

  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;

    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
            .css(prefixed('transform', 'rotate('+deg+'deg)'))
            .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }

  return $this;
};
*/









//DAY 2 NEW TRIAL

/*
function SmoothRotate(o, d, t){
    var obj = $(o);

    $({deg: 0}).animate({deg: d}, {
        duration: t,
        step: function(now){
            obj.css({
                 transform: "rotate(" + now + "deg)"
            });
        }
    });
}
*/


/*
Force Prizes, need to input an angle
		   0-30:  12
		  31-60:  11
		  61-90:  10
		 91-120:  9
		121-150:  8
		151-180:  7 
		181-210:  6
		211-240:  5
		241-270:  4
		271-300:  3
		301-330:  2
		331-360:  1
/*
var isSpinning = false;

$(document).ready(function(){
	$('.btn').click(function(){
		if (isSpinning) {

		} else {
			isSpinning = true;
			$("#spin").addClass("swingimageup");
			setTimeout(function(){
				$("#spin").removeClass("swingimageup");
				$("#spin").addClass("swingimage");
			}, 200);


		//Setup variables
			var obj = $('#test');
			var end = Math.random() * 360;
			if (end%30 == 0){
    			end=end+1;
   			}

			var final = 12 - Math.floor(end/30);

			//map function
			var time = (360 - end) * (1300 - 500) / (360) + 500;

			//Give final result before wheel is spun
  		  	//alert ('you got '+ final); 

    		//Should find a way to optimise this, get more smooth transitions, this is not smooth and requires more code than should be neccessary
			obj.SmoothRotate(0, 1700, 800, 'linear', function () {});
			setTimeout(function(){
				obj.SmoothRotate(1700, 2600, 600, 'linear', function () {});
				setTimeout(function(){
					obj.SmoothRotate(2600, 3050, 400, 'linear', function () {});
					setTimeout(function(){
						obj.SmoothRotate(3050, 3300, 400, 'linear', function () {});
						setTimeout(function(){
							obj.SmoothRotate(3300, 3600, 1000, 'linear', function () {});
							setTimeout(function(){
								obj.SmoothRotate(3600, end + 3600, time, 'linear', function () {});
								setTimeout(function(){
									$("#spin").removeClass("swingimage");
									$("#spin").addClass("swingimagedown");
									setTimeout(function(){
										$("#spin").removeClass("swingimagedown");
										isSpinning = false;
										alert ('You landed a '+ final + '! Play again to win more!'); 
									}, 200);
								}, time);
							}, 1000);
						}, 400);
					}, 400);
				}, 600);
			}, 800);
		}
	});
});
*/

var canvas = document.getElementById("test");
var ctx = canvas.getContext("2d");
var lastend = Math.PI/2*3;
var segmentNo = 20;//prompt("How many segments in this wheel?"); //Change just this to add more segments
var prize = ["Try Again", "Try Again", "$5", "Try Again", "$10", "Try Again", "$10", "Try Again", "$5", "Try Again", "$5", "Try Again", "Try Again", "$5", "Try Again", "$5", "$1000", "Try Again", "Try Again", "Try Again"]; //- More segments, more prizes needed
var color = ['blue', 'green', 'black', 'yellow', 'purple', 'red', 'orange'];
var txtColor = ['white', 'white', 'white', 'black', 'white', 'white', 'white'];

//Draw the spinning wheel:
for (var i = 1; i < segmentNo+1; i++) {
  	//ctx.fillStyle = 'rgb(' + Math.floor(255/segmentNo*i) + ',' + Math.floor(255/segmentNo*(segmentNo-i)) + ',' + Math.floor(Math.random()*255) + ')';
  	ctx.fillStyle = color[i%7];
  	ctx.beginPath();
  	ctx.moveTo(canvas.width / 2, canvas.height / 2);
  	// Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
  	var x = canvas.width / 2;
  	var y = canvas.height / 2
  	var segmentAngle = Math.PI * 2 / segmentNo;
  	ctx.arc(x, y, y*0.9, lastend, lastend + segmentAngle, false);
  	ctx.lineTo(canvas.width / 2, canvas.height / 2);
  	ctx.lineWidth = 40;
  	ctx.strokeStyle = "white";
  	ctx.stroke();
  	ctx.fill();
  	lastend += Math.PI * 2 / segmentNo;

  	ctx.save();
	ctx.translate( canvas.width / 2, canvas.height / 2 );
	var rotateBy = lastend - (Math.PI/segmentNo);
	var offset = 0.045;
	ctx.rotate(rotateBy + offset);
	ctx.font = "60px PressStart2P";
	ctx.fillStyle = txtColor[i%7];
	ctx.textAlign = "start";
	ctx.fillText("												" + prize[i-1], 0, 0);
	ctx.restore();
}

//SmoothRotate function defined here
$.fn.SmoothRotate = function(oldAngle, angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: oldAngle}).animate({deg: angle}, args);
  });
};

var isSpinning = false;
var timeIncrement = 50;
var angleIncrement = 120;
var iterations = 5;
var error = 13;

//t - time, oa - old angle, na - new angle, iter - number of iterations, e - end angle, t2 - end time, final - final number attained - not neccessary)
var spinner = function(t, oa, na, iter, e, t2, final){
	//Turn the wheel
	$('#test').SmoothRotate(oa, na, t, 'linear', function () {});
	//Slow down the wheel at each angleIncrement
	var tincrease = (iterations-iter)*timeIncrement;
	t += tincrease; //Increase the time taken for one angleIncrement, would it be better to keep time constant but reduce angle? - Tested, multiple issues experienced, not desireable.
	//Update the new/old angle
	oa = na;
	na += angleIncrement;

	//Check if we should 
	if (iter > 0){
		iter--;
		setTimeout(function(){
			spinner(t, oa, na, iter, e, t2, final);
		}, t-tincrease);
	} else {
		setTimeout(function(){
			$("#spin").removeClass("swingimage");
			$("#spin").addClass("lowswingimage");
			$('#test').SmoothRotate(oa, oa+e, t2, 'easeOutSine', function () {});
			setTimeout(function(){
				$("#spin").removeClass("lowswingimage");
				//Swing the pointer down
				$("#spin").addClass("swingimagedown");
				setTimeout(function(){
					//Reset the pointer
					$("#spin").removeClass("swingimagedown");
					alert ('You landed with '+ prize[final-1] + '! Play again to win more!');
					isSpinning = false;
				}, 200);
			}, t2);										 
		}, t-tincrease);
	}
}

$(document).ready(function(){
	$('.btn').click(function(){
		if (isSpinning) {
		} else {
			isSpinning = true;
			//Swing the pointer up
			$("#spin").addClass("swingimageup");
			setTimeout(function(){
				$("#spin").removeClass("swingimageup");
				//Moving pointer animation
				$("#spin").addClass("swingimage");
			}, 200);

			//Setup variables
			var obj = $('#test');

			//In final version can pull information from file to check if token is winning case, and then force outcome
			var end = Math.random() * 360;
			if (end%(Math.PI*2/segmentNo) == 0){
    			end=end+1;
   			}

			var final = segmentNo - Math.floor(end/(360/segmentNo));
			//map function
			var time = (360-end) * (1200) / (360) + 2500;

			//Give final result before wheel is spun
  		  	//alert ('you got '+ final); 
  		  	$('#test').SmoothRotate(0, 720, 500, 'linear', function () {});
  		  	setTimeout(function(){spinner(50, 720, 840, iterations, end, time, final);}, 500);
		}
	});
});

/*Have list, array of commands, speeds to accurately control wheel*/


