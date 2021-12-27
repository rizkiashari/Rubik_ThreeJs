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
  initCube();

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

function initCube() {
  for (let i = 0; i < 27; i++) {
    cube[i] = new THREE.BoxGeometry(50, 50, 50);
  }

  for (let i = 0; i < 9; i++) {
    cube[i].getAttribute("position")[2];
    console.log(cube[i].getAttribute("position"));
  }

  for (let i = 9; i < 18; i++) {}

  for (let i = 18; i < 27; i++) {}

  for (let i = 0; i < 27; i++) {
    var material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.FaceColors,
    });

    mesh[i] = new THREE.Mesh(cube[i], material);
    mesh[i].position.set(
      (Math.floor(i / 9) - 1) * 53,
      (Math.floor((i % 9) / 3) - 1) * 53,
      (Math.floor((i % 9) % 3) - 1) * 53
    );
    scene.add(mesh[i]);
    x[i] = mesh[i].position.x;
    y[i] = mesh[i].position.y;
    z[i] = mesh[i].position.z;
    axisX[i] = 1;
    axisY[i] = 2;
    axisZ[i] = 3;
  }
}

const doRender = () => {
  requestAnimationFrame(doRender);
  controls.update();
  renderer.render(scene, camera);
};

window.onload = () => {
  raycaster = new THREE.Raycaster();
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
