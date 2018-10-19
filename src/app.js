import moment from 'moment';
import P5 from 'p5';
import $ from 'jquery';

const clock = new P5( (c) => {
	let boxWidth = $('#sketchbox').width();
	let boxHeight = boxWidth + 100;
	let centerPointX = boxWidth / 2;
	let centerPointY = (boxHeight / 2);
	let radius = boxWidth / 4;
	let arcDiff = boxWidth * 0.12;
	let stroke = arcDiff * 0.4;

	c.setup = () => {
		c.createCanvas(boxWidth, boxHeight);
		c.angleMode(c.DEGREES);
	}

	c.windowResized = () => {
		boxWidth = $('#sketchbox').width();
		boxHeight = boxWidth + 100;
		centerPointX = boxWidth / 2;
		centerPointY = (boxHeight / 2);
		radius = boxWidth / 4;
		arcDiff = boxWidth * 0.12;
		stroke = arcDiff * 0.4;
		c.resizeCanvas(boxWidth, boxHeight);
	}

	c.draw = () => {
		let timeLeft = checkTimediff();
		c.background(0);
		c.textAlign(c.CENTER, c.center);
		c.textFont("Boogaloo");
		c.textSize(50);
		c.strokeWeight(1);
		c.stroke(255, 0, 0);
		c.fill(255, 0, 0);
		c.text("Summer Camp 2019", centerPointX, 50);
		c.textFont("Libre Baskerville");
		c.textSize(15);
		c.text(`Months: ${timeLeft.Months}`, centerPointX/2, boxHeight - 50);
		c.text(`Days: ${timeLeft.Days}`, centerPointX, boxHeight - 50);
		c.text(`Hours: ${timeLeft.Hours}`, centerPointX + (centerPointX/2), boxHeight - 50);
		c.text(`Minutes: ${timeLeft.Minutes}`, boxWidth * 1/3, boxHeight - 30);
		c.text(`Seconds: ${timeLeft.Seconds}`, boxWidth * 2/3, boxHeight - 30);
		c.noFill();
		c.strokeWeight(stroke);

		//Seconds Arc: Full Red Circle.
		if (timeLeft.Seconds > 0) {
			c.stroke(255, 0, 0);
			let secArc = c.map(timeLeft.Seconds, 1, 60, 1, 360) - 90;
			c.arc(centerPointX, centerPointY, radius, radius, -90, secArc);
		} else if (timeLeft.Munites > 0 || timeLeft.Hours > 0 || timeLeft.Days > 0 || timeLeft.Months > 0) {
			c.stroke(255, 0, 0);
			c.ellipse(centerPointX, centerPointY, radius, radius);
		} else {
			c.stroke(255, 0, 102);
			c.ellipse(centerPointX, centerPointY, radius, radius);
		}

		//Minutes Arc: Green.
		if (timeLeft.Minutes > 0) {
			c.stroke(0, 153, 0);
			let minArc = c.map(timeLeft.Minutes, 1, 60, 1, 360) - 90;
			c.arc(centerPointX, centerPointY, radius + arcDiff, radius + arcDiff, -90, minArc);
		} else if (timeLeft.Hours > 0 || timeLeft.Days > 0 || timeLeft.Months > 0) {
			c.stroke(0, 153, 0);
			c.ellipse(centerPointX, centerPointY, radius + arcDiff)
		} else {
			c.stroke(255, 0, 102);
			c.ellipse(centerPointX, centerPointY, radius + arcDiff);
		}

		//Hours Arc: Yellow.
		if (timeLeft.Hours > 0) {
			c.stroke(255, 255, 0);
			let hourArc = c.map(timeLeft.Hours, 1, 24, 1, 360) -90;
			c.arc(centerPointX, centerPointY, radius + (arcDiff * 2), radius + (arcDiff * 2), -90, hourArc);
		} else if (timeLeft.Days > 0 || timeLeft.Months > 0) {
			c.stroke(255, 255, 0);
			c.ellipse(centerPointX, centerPointY, radius+(arcDiff*2));
		} else {
			c.stroke(255, 0, 102);
			c.ellipse(centerPointX, centerPointY, radius + (arcDiff * 2));
		}

		//Days Arc: Blue.
		if (timeLeft.Days > 0) {
			c.stroke(0, 0, 255);
			let dayArc = c.map(timeLeft.Days, 1, 31, 1 , 360 ) - 90;
			c.arc(centerPointX, centerPointY, radius + (arcDiff * 3), radius + (arcDiff * 3), -90, dayArc);
		} else if (timeLeft.Months > 0) {
			c.stroke(0 , 0, 255);
			c.ellipse(centerPointX, centerPointY, radius + (arcDiff * 3));
		} else {
			c.stroke(255, 0, 102);
			c.ellipse(centerPointX, centerPointY, radius + (arcDiff * 3));
		}

		//Months Arc: Orange
		if (timeLeft.Months > 0) {
			c.stroke(255, 102, 0);
			let monthArc = c.map(timeLeft.Months, 1, 12, 1, 360) -90;
			c.arc(centerPointX, centerPointY, radius+(arcDiff*4), radius+(arcDiff*4), -90, monthArc);
		} else {
			c.stroke(255, 0, 102);
			c.ellipse(centerPointX, centerPointY, radius + (arcDiff * 4));
		}

		//Outside Circle: Pink
		c.stroke (255, 0, 102);
		c.ellipse(centerPointX, centerPointY, radius+(arcDiff*5), radius+(arcDiff*5));

		//Text Countdown.
		$('#years').html(timeLeft.Years);
		$('#months').html(timeLeft.Months);
		$('#days').html(timeLeft.Days);
		$('#hours').html(timeLeft.Hours);
		$('#minutes').html(timeLeft.Minutes);
		$('#seconds').html(timeLeft.Seconds);
	}
	const checkTimediff = () => {
		const today = moment();
		const christmas = moment('6/9/2019 12:00', 'MM-DD-YYYY HH:mm');
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

	const dummyTime = () => {
		return {
			Years: 0,
			Months: 0,
			Days: 0,
			Hours: 0,
			Minutes: 1,
			Seconds: 1
		}
	}

}, 'sketchbox');
