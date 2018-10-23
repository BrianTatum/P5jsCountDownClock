import moment from 'moment';
import P5 from 'p5';
import $ from 'jquery';

const clock = new P5( (c) => {
	//Ratio for size calculations.
	const titleFontRatio = 0.1296296296296296;
	const timeFontRatio = 0.0462962962962963;
	const boxHeightRatio = 0.1851851851851852;
	const titlePointYRatio = 0.1111111111111111;
	const timeRow1Ratio = 0.0925925925925926;
	const timeRow2Ratio = 0.037037037037037;

	//Calculations for element size and location.
	let boxWidth = $('#sketchbox').width();
	let headingFontSize = boxWidth * titleFontRatio;
	let timeFontSize = boxWidth * timeFontRatio;
	let boxHeight = boxWidth + (boxWidth * boxHeightRatio);
	let centerPointX = boxWidth / 2;
	let centerPointY = (boxHeight / 2);
	let titlePointY = boxWidth * titlePointYRatio;
	let timeRow1Y = boxHeight - (boxWidth * timeRow1Ratio);
	let timeRow2Y = boxHeight - (boxWidth * timeRow2Ratio);
	let radius = boxWidth / 4;
	let arcDiff = boxWidth * 0.12;
	let stroke = arcDiff * 0.4;

	c.setup = () => {
		c.createCanvas(boxWidth, boxHeight);
		c.angleMode(c.DEGREES);
	}

	c.windowResized = () => {
		boxWidth = $('#sketchbox').width();
		headingFontSize = boxWidth * titleFontRatio;
		timeFontSize = boxWidth * timeFontRatio;
		boxHeight = boxWidth + (boxWidth * boxHeightRatio);
		centerPointX = boxWidth / 2;
		centerPointY = (boxHeight / 2);
		titlePointY = boxWidth * titlePointYRatio;
		timeRow1Y = boxHeight - (boxWidth * timeRow1Ratio);
		timeRow2Y = boxHeight - (boxWidth * timeRow2Ratio);
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
		c.textSize(headingFontSize);
		c.strokeWeight(1);
		c.stroke(255, 0, 0);
		c.fill(255, 0, 0);
		c.text("Summer Camp 2019", centerPointX, titlePointY);
		c.textFont("Libre Baskerville");
		c.textSize(timeFontSize);
		c.text(`Months: ${timeLeft.Months}`, centerPointX/2, timeRow1Y);
		c.text(`Days: ${timeLeft.Days}`, centerPointX, timeRow1Y);
		c.text(`Hours: ${timeLeft.Hours}`, centerPointX + (centerPointX/2), timeRow1Y);
		c.text(`Minutes: ${timeLeft.Minutes}`, boxWidth * 1/3, timeRow2Y);
		c.text(`Seconds: ${timeLeft.Seconds}`, boxWidth * 2/3, timeRow2Y);
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
		$('#windowWidth').html(boxWidth);
		$('#headingFontSize').html(headingFontSize);
		$('#timeFontSize').html(timeFontSize);
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
