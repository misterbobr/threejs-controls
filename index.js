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

var X, Y, 
    moveInterval, rotateLeft, rotateRight, moveForward, moveBackward, moveUp, moveDown,
    angleX = 0,
    angleY = 0,
    camDist = 70,
    look = new THREE.Vector3(0, 0, 0);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = camDist;
camera.lookAt(look);

const geometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
const dotGeometry = new THREE.SphereGeometry(1, 8, 8);

const material = new THREE.MeshNormalMaterial({ color: 0x33bb33 });
const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const mesh = new THREE.Mesh(geometry, material);
const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
scene.add(mesh);
scene.add(dotMesh);

document.addEventListener('contextmenu', event => event.preventDefault());

window.addEventListener('mousemove', (e) =>
{
    X = e.clientX;
    Y = e.clientY;
});

function camRotation(dX, dY, camDist) {
    angleX += 2 * Math.PI * dX / window.innerWidth;
    angleY = Math.abs(angleY + 2 * Math.PI * dY / window.innerHeight) < Math.PI / 2
        ? (angleY + 2 * Math.PI * dY / window.innerHeight)
        : angleY;
    // angleY += 2 * Math.PI * (mY - Y) / window.innerHeight;
    // console.log(X - mX);
    // console.log(Math.sqrt(Math.pow(camera.position.z, 2) + Math.pow(camera.position.x, 2)));
    let rotX = Math.sin(angleX) * Math.cos(angleY) * camDist;
    let rotY = -Math.sin(angleY) * camDist;
    let rotZ = Math.cos(angleX) * Math.cos(angleY) * camDist;
    camera.position.x = rotX + look.x;
    camera.position.y = rotY + look.y;
    camera.position.z = rotZ + look.z;
    // camera.lookAt(0, 0, 0);
    camera.lookAt(look);
    // console.log(look);
    // console.log(Math.sin(2 * Math.PI * (X - mX) / window.innerWidth));
    // console.log('X: ' + (angleX / Math.PI).toFixed(2) + ' pi');
    // console.log('Y: ' + (angleY / Math.PI).toFixed(2) + ' pi');
};

function camPositionKey(horizontal, vertical) {
    let dX = (-Math.sin(angleX) * horizontal) * 0.05;
    let dZ = (-Math.cos(angleX) * horizontal) * 0.05;
    look.x += dX;
    look.y += vertical * 0.05;
    look.z += dZ;
    camera.position.x += dX;
    camera.position.y += vertical * 0.05;
    camera.position.z += dZ;
    camera.lookAt(look);
}

function camPositionMouse(dX, dY, dZ) {
    dZ = -(Math.sin(angleX) * dX + Math.sin(angleY) * Math.cos(angleX) * dY) * 0.05;// + Math.sin(angleY) * (mY - Y)) * 0.02;
    dX = (Math.cos(angleX) * dX - Math.sin(angleY) * Math.sin(angleX) * dY) * 0.05;
    dY = -(Math.cos(angleY) * dY) * 0.05;
    look.x += dX;
    look.y += dY;
    look.z += dZ;
    camera.position.x += dX;
    camera.position.y += dY;
    camera.position.z += dZ;
    camera.lookAt(look);
}

window.addEventListener('keydown', (e) =>
{
    switch (e.code) {
        case 'KeyA':
            if (!rotateLeft) {
                angleX += 2 * Math.PI * 2 / window.innerWidth;
                rotateLeft = setInterval(() => {
                            camRotation(1, 0, camDist);
                            // mesh.rotateY(2 * Math.PI / window.innerWidth)
                        }, 4);
            }
            break;
        case 'KeyD':
            if (!rotateRight) {
                angleX -= 2 * Math.PI * 2 / window.innerWidth;
                rotateRight = setInterval(() => {
                            camRotation(-1, 0, camDist);
                            // mesh.rotateY(-2 * Math.PI / window.innerWidth)
                        }, 4);
            }
            break;
        case 'KeyW':
            if (!moveForward) {
                moveForward = setInterval(() => {
                            camPositionKey(2, 0);
                        }, 4);
            }
            break;
        case 'KeyS':
            if (!moveBackward) {
                moveBackward = setInterval(() => {
                            camPositionKey(-2, 0);
                        }, 4);
            }
            break;
        case 'Space':
            if (!moveUp) {
                moveUp = setInterval(() => {
                            camPositionKey(0, 2);
                        }, 4);
            }
            break;
        case 'ShiftLeft':
            if (!moveDown) {
                moveDown = setInterval(() => {
                            camPositionKey(0, -2);
                        }, 4);
            }
            break;
            // default:
        }
        // console.log(e.code);
});

window.addEventListener('mousedown', (e) => 
{
    let mX = e.clientX;
    let mY = e.clientY;
    if (e.button === 0) {
        angleX += 2 * Math.PI * (mX - X) / window.innerWidth;
        angleY = Math.abs(angleY + 2 * Math.PI * (mY - Y) / window.innerHeight) < Math.PI / 2
                ? (angleY + 2 * Math.PI * (mY - Y) / window.innerHeight)
                : Math.PI / 2 * (angleY > 0 ? 1 : -1);
        moveInterval = setInterval(() => {
            camRotation((mX - X), (mY - Y), camDist);
            mX = X;
            mY = Y;
        }, 4);
    }

    if (e.button === 2) {
        moveInterval = setInterval(() => {
            camPositionMouse((mX - X), (mY - Y), 0);
            mX = X;
            mY = Y;
        }, 4);
    }
});


window.addEventListener('keyup', (e) =>
{
    switch (e.code) {
        case 'KeyA':     
                clearInterval(rotateLeft);
                rotateLeft = null;
                break;
        case 'KeyD':
                clearInterval(rotateRight);
                rotateRight = null;
                break;
        case 'KeyW':      
                clearInterval(moveForward);
                moveForward = null;
                break;
        case 'KeyS':
                clearInterval(moveBackward);
                moveBackward = null;
                break;
        case 'Space':      
                clearInterval(moveUp);
                moveUp = null;
                break;
        case 'ShiftLeft':
                clearInterval(moveDown);
                moveDown = null;
                break;
    }
});

window.addEventListener('mouseup', (e) =>
{
    clearInterval(moveInterval);
    moveInterval = null;
});

function camDistance(delta) {
    camDist += delta;
    camRotation(0, 0, camDist);
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

const clock = new Clock();

// const ctrl = new OrbitControls(camera, renderer.domElement);
// let i = setInterval(() => console.log(clock.getElapsedTime()), 1000);
function anim() {
    // let time = clock.getElapsedTime();
    // camera.position.x = Math.sin(time) * 70; // 70 - radius
    // camera.position.z = Math.cos(time) * 70;
    // camera.lookAt(0, 0, 0);
    dotMesh.position.set(look.x, look.y, look.z);
    // console.log(dotMesh.position);
    requestAnimationFrame(anim);
    renderer.render(scene, camera);
}
anim();