import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Model } from "./model.js"

export class Apple extends Model {
	animationFrameId = null;

	constructor(scene, camera, renderer, controls) {
		super();

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.controls = controls;

		camera.position.z = 6;
	}

	loadModel() {
		const loader = new GLTFLoader();

		loader.load(
			'../models/apple_17_47_37.gltf',
			(gltf) => {
				this.model = gltf.scene;

				gltf.scene.position.set(0, 0, 0);
				gltf.scene.scale.set(50, 50, 50);
				gltf.scene.name = 'apple';

				this.scene.add(gltf.scene);

				this.camera.position.set(5, 5, 2);
				this.camera.lookAt(gltf.scene.position);
			}
		);
	}

	render() {
		this.animationFrameId = requestAnimationFrame(() => {
			this.render();
		});

		this.controls.update();

		this.renderer.render(this.scene, this.camera);
	}

	clear() {
		if (this.model !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.scene.remove(this.scene.getObjectByName('apple'));
			this.model = null;
		} else {
			console.error('No model to remove');
		}
	}
}