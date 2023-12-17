import { render as renderApple, clear as clearApple } from "./renderApple.js"

const query = (sel) => document.querySelector(sel);

let appleActive = false;
query('#visit-apple').addEventListener('click', () => {
	if (appleActive) {
		clearApple();
		appleActive = false;
	} else {
		renderApple();
		appleActive = true;
	}
});