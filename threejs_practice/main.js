import './style.css'
import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('chessboard');
const scene = new three.Scene();

const renderer = new three.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new three.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.setZ(20);
camera.position.setY(10);

// const geometry = new three.TorusGeometry(10, 3, 16, 100);
// const material = new three.MeshStandardMaterial({
//   color: 0xFF6347,
// });
// const torus = new three.Mesh(geometry, material);

const light = new three.PointLight(0xffffff, 750);
light.position.y += 10;
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
let chess_board;
loader.load('/chess_scene.glb', function (gltf) {
  chess_board = gltf.scene;
  chess_board.scale.set(0.25, 0.25, 0.25)
	scene.add(chess_board);
}, undefined, function (error) {
	console.error(error);
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  chess_board.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate()