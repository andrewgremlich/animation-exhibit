import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
	'../models/apple_17_47_37.gltf',
	function (gltf) {
		const model = gltf.scene;

		scene.add(model);

		model.position.set(0, 0, 0);
		model.scale.set(50, 50, 50);

		camera.position.set(5, 5, 2);
		camera.lookAt(model.position);
	},
	(xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
	(error) => console.error('Error loading GLTF model', error)
);

window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	controls.update();
});

camera.position.z = 6;

export function render() {
  console.log('hello apple')
	requestAnimationFrame(render);

	controls.update();

	renderer.render(scene, camera);
}

export function clear() {
  console.log('bye apple')

  scene.remove(scene.children[0]);
}