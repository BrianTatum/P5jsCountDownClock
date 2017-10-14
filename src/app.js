import moment from 'moment';
import P5 from 'p5';
import $ from 'jquery';

const clock = new P5( (c) => {
	let boxWidth = $('#sketchbox').width();
	let centerPoint = boxWidth / 2
	let radius = boxWidth / 4;
	let arcDiff = boxWidth * 0.12;
	let stroke = arcDiff * 0.4;

	c.setup = () => {
		c.createCanvas(boxWidth,boxWidth);
		c.angleMode(c.DEGREES);
	}

	c.windowResized = () => {
		boxWidth = $('#sketchbox').width();
		centerPoint = boxWidth / 2
		radius = boxWidth / 4;
		arcDiff = boxWidth * 0.12;
		stroke = arcDiff * 0.4;
		c.resizeCanvas(boxWidth, boxWidth);
	}

	c.draw = () => {
		let timeLeft = checkTimediff();
		c.background(0);
		c.noFill();
		c.strokeWeight(stroke);

		//Seconds Arc: Full Red Circle.
		c.stroke(255, 0, 0);
		let secArc = c.map(timeLeft.Seconds, 1, 60, 1, 360) - 90;
		c.arc(centerPoint, centerPoint, radius, radius, -90, secArc);

		//Minutes Arc: Green.
		c.stroke(0, 153, 0);
		let minArc = c.map(timeLeft.Minutes, 1, 60, 1, 360) - 90;
		c.arc(centerPoint, centerPoint, radius+arcDiff, radius+arcDiff, -90, minArc);

		//Hours Arc: Yellow.
		c.stroke(255, 255, 0);
		let hourArc = c.map(timeLeft.Hours, 1, 22, 1, 360) -90;
		c.arc(centerPoint, centerPoint, radius+(arcDiff*2), radius+(arcDiff*2), -90, hourArc);

		//Days Arc: Blue.
		c.stroke(0, 0, 255);
		let dayArc = c.map(timeLeft.Days, 1, 31, 1 , 360 ) - 90;
		c.arc(centerPoint, centerPoint, radius+(arcDiff*3), radius+(arcDiff*3), -90, dayArc);

		//Months Arc: Orange
		c.stroke(255, 102, 0);
		let monthArc = c.map(timeLeft.Months, 1, 12, 1, 360) -90;
		c.arc(centerPoint, centerPoint, radius+(arcDiff*4), radius+(arcDiff*4), -90, monthArc);

		//Outside Circle: Pink
		c.stroke (255, 0, 102);
		c.ellipse(centerPoint, centerPoint, radius+(arcDiff*5), radius+(arcDiff*5));

		//Text Countdown.
		$('#years').html(timeLeft.Years);
		$('#months').html(timeLeft.Months);
		$('#days').html(`${timeLeft.Days}  ${dayArc}`);
		$('#hours').html(timeLeft.Hours);
		$('#minutes').html(timeLeft.Minutes);
		$('#seconds').html(timeLeft.Seconds);
	}
	const checkTimediff = () => {
		const today = moment();
		const christmas = moment('12/25/2017 12:00', 'MM-DD-YYYY HH:mm');
		const diff = moment.duration(christmas.diff(today));
		return {
			Years: diff.years(),
			Months: diff.months(),
			Days: diff.days(),
			Hours: diff.hours(),
			Minutes: diff.minutes(),
			Seconds: diff.seconds()
		}
	}
}, 'sketchbox');
