'use strict';

///////////// loader /////////////
let textWrapper = document.querySelector('.loader_intro-title');
textWrapper.innerHTML = textWrapper.textContent.replace(
	/([^\x00-\x80]|\w)/g,
	"<span class='letter'>$&</span>"
);

anime
	.timeline({ loop: false })
	.add({
		targets: '.loader_intro-title .letter',
		translateX: [140, 0],
		translateZ: 0,
		opacity: [0, 1],
		easing: 'easeOutExpo',
		duration: 1400,
		delay: function (el, i) {
			return 500 + 50 * i;
		},
	})
	.add({
		targets: '.loader_intro-title .letter',
		translateX: [0, -140],
		opacity: [1, 0],
		easing: 'easeInExpo',
		duration: 1200,
		delay: function (el, i) {
			return 700 + 50 * i;
		},
	});

// TimelineMax

const tl = new TimelineMax();

tl.to('.loader', 2.2, {
	delay: 5,
	top: '-100%',
	ease: Expo.easeInOut,
});

///////////// cursor /////////////

const cursormove = () => {
	let cursor = document.querySelector('.cursor');
	let follower = document.querySelector('.cursor-follower');

	let posX = 0;
	let posY = 0;
	let mouseX = 0;
	let mouseY = 0;

	setTimeout(() => {
		cursor.style.opacity = 1;
		follower.style.opacity = 1;
	}, 10000);

	tl.to({}, 0.016, {
		repeat: -1,
		onRepeat: function () {
			posX += (mouseX - posX) / 9;
			posY += (mouseY - posY) / 9;

			tl.set(follower, {
				css: {
					left: posX - 20,
					top: posY - 20,
				},
			});

			tl.set(cursor, {
				css: {
					left: mouseX,
					top: mouseY,
				},
			});
		},
	});

	document.addEventListener('mousemove', (e) => {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});
};

cursormove();

tl.from('.line span', 1.8, {
	y: 100,
	ease: 'power4.out',
	delay: 1,
	skewY: 7,
	stagger: {
		amount: 0.3,
	},
});

///////////circleType//////////
const circleType = new CircleType(document.getElementById('rotated')).radius(
	80
);

window.addEventListener('scroll', () => {
	var offset = window.scrollY;
	offset = offset * 0.4;

	const text = document.querySelector('.circular-text');
	text.style.transform = 'rotate(' + offset + 'deg)';
	text.style.opacity = 1;
});

//////////// maintext //////////////
const content = document.querySelector('section');
let currentPos = window.pageYOffset;

const callDistort = () => {
	const newPos = window.pageYOffset;
	const diff = newPos - currentPos;
	const speed = diff * 0.35;

	content.style.transform = 'skewY(' + speed + 'deg)';
	currentPos = newPos;
	requestAnimationFrame(callDistort);
};

callDistort();

////img/////
