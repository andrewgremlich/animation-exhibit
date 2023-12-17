import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Apple } from "./renderApple.js"

const query = (sel) => document.querySelector(sel);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
query('#animation-exhibit').appendChild(renderer.domElement);

window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	controls.update();
});

// APPLE MODEL BELOW

const apple = new Apple(scene, camera, renderer, controls);

apple.loadModel();

const appleButton = query('#visit-apple');
let appleActive = false;

appleButton.addEventListener('click', () => {
	if (appleActive) {
		apple.clear();
		apple.loadModel();
		appleActive = false;
		appleButton.innerText = 'Visit Apple';
	} else {
		apple.render();
		appleActive = true;
		appleButton.innerText = 'Remove Apple';
	}
});