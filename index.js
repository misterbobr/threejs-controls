import * as THREE from 'three';
import { Clock } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { randFloat } from 'three/src/math/mathutils';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 2000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x999999, 1);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () =>
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

var X, Y, moveInterval,
    angleX = 0,
    angleY = 0,
    camDist = 70,
    look = new THREE.Vector3(0, 0, 0);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = camDist;
camera.lookAt(look);

document.addEventListener('contextmenu', event => event.preventDefault());

window.addEventListener('mousemove', (e) =>
{
    X = e.clientX;
    Y = e.clientY;
});

function camRotation(mX, mY, camDist) {
    // let direction = new THREE.Vector3(0, 0, -camDist);
    // camera.getWorldDirection(direction);
    // direction = direction.applyMatrix4(camera.matrixWorld)
    // console.log(direction);
    angleX += 2 * Math.PI * (mX - X) / window.innerWidth;
    angleY = Math.abs(angleY + 2 * Math.PI * (mY - Y) / window.innerHeight) < Math.PI / 2
        ? (angleY + 2 * Math.PI * (mY - Y) / window.innerHeight)
        : Math.PI / 2 * (angleY > 0 ? 1 : -1);
    // angleY += 2 * Math.PI * (mY - Y) / window.innerHeight;
    // console.log(X - mX);
    // console.log(Math.sqrt(Math.pow(camera.position.z, 2) + Math.pow(camera.position.x, 2)));
    camera.position.x = Math.sin(angleX) * Math.cos(angleY) * camDist;
    camera.position.y = -Math.sin(angleY) * camDist;
    camera.position.z = Math.cos(angleX) * Math.cos(angleY) * camDist;
    camera.lookAt(look);
    // console.log(Math.sin(2 * Math.PI * (X - mX) / window.innerWidth));
    // console.log('X: ' + (angleX / Math.PI).toFixed(2) + ' pi');
    // console.log('Y: ' + (angleY / Math.PI).toFixed(2) + ' pi');
};

function camPosition(mX, mY) {
    // let direction = new THREE.Vector3(0, 0, -camera.position.z);
    // direction = direction.applyMatrix4(camera.matrixWorld);
    // console.log(direction);
    // camera.getWorldDirection(direction);
    // console.log(direction);
    // let dist = Math.sqrt(mX*mX + mY*mY);
    // console.log('1:');
    // console.log(direction);
    let dX = (Math.cos(angleX) * (mX - X) - Math.sin(angleY) * Math.sin(angleX) * (mY - Y)) * 0.05;
    let dY = -(Math.cos(angleY) * (mY - Y)) * 0.05;
    let dZ = -(Math.sin(angleX) * (mX - X) + Math.sin(angleY) * Math.cos(angleX) * (mY - Y)) * 0.05;// + Math.sin(angleY) * (mY - Y)) * 0.02;
    // console.log(dX);
    // console.log(dY);
    // console.log(dZ);
    // console.log('aX: ' + angleX);
    // console.log('aY: ' + angleY);
    console.log(angleX, (mX - X));
    console.log(angleY, (mY - Y));
    // direction.x += dX;
    // direction.z += dZ;
    look.x += dX;
    look.y += dY;
    look.z += dZ;
    camera.position.x += dX;// + Math.sin(angleY) * (dY - Y)) * 0.02;
    camera.position.y += dY;
    camera.position.z += dZ; // + Math.sin(angleY) * (dY - Y)) * 0.02;
    // camera.lookAt(direction);
    camera.lookAt(look);
    // console.log('2:');
    console.log(look);
}

window.addEventListener('mousedown', (e) =>
{
    // 0: Main button pressed, usually the left button or the un-initialized state
    // 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
    // 2: Secondary button pressed, usually the right button
    // 3: Fourth button, typically the Browser Back button
    // 4: Fifth button, typically the Browser Forward button
    let mX = e.clientX;
    let mY = e.clientY;
    // console.log(e);
    if (e.button === 0) {
        angleX += 2 * Math.PI * (mX - X) / window.innerWidth;
        angleY = Math.abs(angleY + 2 * Math.PI * (mY - Y) / window.innerHeight) < Math.PI / 2
                ? (angleY + 2 * Math.PI * (mY - Y) / window.innerHeight)
                : Math.PI / 2 * (angleY > 0 ? 1 : -1);
        moveInterval = setInterval(() => {
            camRotation(mX, mY, camDist);
            mX = X;
            mY = Y;
        }, 4);
    }

    if (e.button === 2) {
        moveInterval = setInterval(() => {
            camPosition(mX, mY);
            mX = X;
            mY = Y;
        }, 4);
    }
});

window.addEventListener('mouseup', (e) =>
{
    clearInterval(moveInterval);
    moveInterval = null;
});

function camDistance(delta) {
    camDist += delta;
    camRotation(X, Y, camDist);
}

window.addEventListener('wheel', (e) => {
    // console.log(distInterval);
    let delta = e.deltaY * 0.02;
    // if (!distInterval) {
    let distInterval = setInterval(() => {
        if (Math.abs(delta) > 0.01 && camDist + delta > 20) {
            camDistance(delta);
            delta *= 0.9;
        }
        else {
            clearInterval(distInterval);
            distInterval = null;
        }
    }, 4);
    // }
});

// window.addEventListener('mousemove', (e) =>
// {
//     console.log(e);
// });

// let camY = 0;
// window.addEventListener('wheel', (e) => 
// {
//     camY = e.deltaY * 0.002;
// })

const loader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
const dotGeometry = new THREE.SphereGeometry(1, 8, 8);

const material = new THREE.MeshNormalMaterial({ color: 0x33bb33 });
const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const mesh = new THREE.Mesh(geometry, material);
const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
scene.add(mesh);
scene.add(dotMesh);

const clock = new Clock();

// const ctrl = new OrbitControls(camera, renderer.domElement);
// let i = setInterval(() => console.log(clock.getElapsedTime()), 1000);
function anim() {
    let time = clock.getElapsedTime();
    // camera.position.x = Math.sin(time) * 70; // 70 - radius
    // camera.position.z = Math.cos(time) * 70;
    // camera.lookAt(0, 0, 0);
    dotMesh.position.set(look.x, look.y, look.z);
    // console.log(dotMesh.position);
    requestAnimationFrame(anim);
    renderer.render(scene, camera);
}
anim();