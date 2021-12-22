import * as THREE from "../../three.js-master/build/three.module.js";

import { OrbitControls } from "../../three.js-master/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, light, ambient, controls;

let cube = [];
let cube_to_rotate = [];
let mesh = [];
let raycaster,
  obj_click_pos = [];
let startpoint = [],
  leavepoint = []; // Mouse click to leave the point
let rotate = -1,
  direction = -1; //turn around

let x = [],
  y = [],
  z = [],
  x1 = [],
  y1 = [],
  z1 = []; // Diagram of positioned position
let axisX = [],
  axisY = [],
  axisZ = [];

const doInit = () => {
  scene = new THREE.Scene();

  const FOV = 45;
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const ASPECT = WIDTH / HEIGHT;

  camera = new THREE.PerspectiveCamera(FOV, ASPECT);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x111545);
  renderer.shadowMap.enabled = true;

  light = initLight();
  ambient = initAmbient();

  scene.add(light);
  scene.add(ambient);

  controls = new OrbitControls(camera, renderer.domElement);

  controls.update();

  document.body.appendChild(renderer.domElement);
};

const initLight = () => {
  const light = new THREE.PointLight(0xffffff);
  light.position.set(400, 200, 300);

  return light;
};

const initAmbient = () => {
  const ambient = new THREE.AmbientLight(0x555555);
  return ambient;
};

const doRender = () => {
  requestAnimationFrame(doRender);
  controls.update();
  renderer.render(scene, camera);
};

window.onload = () => {
  doInit();
  doRender();
};

window.onresize = () => {
  const NEW_WIDTH = innerWidth;
  const NEW_HEIGHT = innerHeight;

  renderer.setSize(NEW_WIDTH, NEW_HEIGHT);

  camera.aspect = NEW_WIDTH / NEW_HEIGHT;
  camera.updateProjectionMatrix();
};
