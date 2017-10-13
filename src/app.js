import moment from 'moment';
import P5 from 'p5';

const today = moment();
const christmas = moment('12/25/2017 12:00', 'MM-DD-YYYY HH:mm');
const diff = moment.duration(christmas.diff(today));

console.log(today.format('MMMM DD, YYYY hh:MM a'));
console.log(christmas.format('MMMM DD, YYYY hh:mm a'));

console.log(`Years: ${diff.years()}`);
console.log(`Months: ${diff.months()}`);
console.log(`Days: ${diff.days()}`);
console.log(`Hours: ${diff.hours()}`);
console.log(`Minutes: ${diff.minutes()}`);
console.log(`Seconds: ${diff.seconds()}`);

console.log(`Days in current month: ${today.daysInMonth()}`);
console.log(`Days in Dec: ${christmas.daysInMonth()}`);

const clock = new P5( (c) => {
	c.setup = () => {
		c.createCanvas(500,500);
		c.background(0);
	}

	c.draw = () => {
		c.stroke(255);
		c.ellipse(250, 250, 100, 100);
		c.textSize(32);
		c.fill(255);
		c.text(`Days: ${diff.days()}`, 25, 25);
	}
}, 'Box');
