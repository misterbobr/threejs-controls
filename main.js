/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\n\r\n\r\n\r\n\r\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\r\n\r\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 2000 );\r\n\r\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\r\nrenderer.setSize(window.innerWidth, window.innerHeight);\r\nrenderer.setClearColor(0x999999, 1);\r\ndocument.body.appendChild(renderer.domElement);\r\n\r\nwindow.addEventListener('resize', () =>\r\n{\r\n    camera.aspect = window.innerWidth / window.innerHeight;\r\n    camera.updateProjectionMatrix();\r\n\r\n    renderer.setSize(window.innerWidth, window.innerHeight);\r\n    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r\n});\r\n\r\nvar X, Y, moveInterval,\r\n    angleX = 0,\r\n    angleY = 0,\r\n    camDist = 70,\r\n    look = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);\r\n\r\ncamera.position.x = 0;\r\ncamera.position.y = 0;\r\ncamera.position.z = camDist;\r\ncamera.lookAt(look);\r\n\r\ndocument.addEventListener('contextmenu', event => event.preventDefault());\r\n\r\nwindow.addEventListener('mousemove', (e) =>\r\n{\r\n    X = e.clientX;\r\n    Y = e.clientY;\r\n});\r\n\r\nfunction camRotation(mX, mY, camDist) {\r\n    // let direction = new THREE.Vector3(0, 0, -camDist);\r\n    // camera.getWorldDirection(direction);\r\n    // direction = direction.applyMatrix4(camera.matrixWorld)\r\n    // console.log(direction);\r\n    angleX += 2 * Math.PI * (mX - X) / window.innerWidth;\r\n    angleY = Math.abs(angleY + 2 * Math.PI * (mY - Y) / window.innerHeight) < Math.PI / 2\r\n        ? (angleY + 2 * Math.PI * (mY - Y) / window.innerHeight)\r\n        : Math.PI / 2 * (angleY > 0 ? 1 : -1);\r\n    // angleY += 2 * Math.PI * (mY - Y) / window.innerHeight;\r\n    // console.log(X - mX);\r\n    // console.log(Math.sqrt(Math.pow(camera.position.z, 2) + Math.pow(camera.position.x, 2)));\r\n    camera.position.x = Math.sin(angleX) * Math.cos(angleY) * camDist;\r\n    camera.position.y = -Math.sin(angleY) * camDist;\r\n    camera.position.z = Math.cos(angleX) * Math.cos(angleY) * camDist;\r\n    camera.lookAt(look);\r\n    // console.log(Math.sin(2 * Math.PI * (X - mX) / window.innerWidth));\r\n    // console.log('X: ' + (angleX / Math.PI).toFixed(2) + ' pi');\r\n    // console.log('Y: ' + (angleY / Math.PI).toFixed(2) + ' pi');\r\n};\r\n\r\nfunction camPosition(mX, mY) {\r\n    // let direction = new THREE.Vector3(0, 0, -camera.position.z);\r\n    // direction = direction.applyMatrix4(camera.matrixWorld);\r\n    // console.log(direction);\r\n    // camera.getWorldDirection(direction);\r\n    // console.log(direction);\r\n    // let dist = Math.sqrt(mX*mX + mY*mY);\r\n    // console.log('1:');\r\n    // console.log(direction);\r\n    let dX = (Math.cos(angleX) * (mX - X) - Math.sin(angleY) * Math.sin(angleX) * (mY - Y)) * 0.05;\r\n    let dY = -(Math.cos(angleY) * (mY - Y)) * 0.05;\r\n    let dZ = -(Math.sin(angleX) * (mX - X) + Math.sin(angleY) * Math.cos(angleX) * (mY - Y)) * 0.05;// + Math.sin(angleY) * (mY - Y)) * 0.02;\r\n    // console.log(dX);\r\n    // console.log(dY);\r\n    // console.log(dZ);\r\n    // console.log('aX: ' + angleX);\r\n    // console.log('aY: ' + angleY);\r\n    console.log(angleX, (mX - X));\r\n    console.log(angleY, (mY - Y));\r\n    // direction.x += dX;\r\n    // direction.z += dZ;\r\n    look.x += dX;\r\n    look.y += dY;\r\n    look.z += dZ;\r\n    camera.position.x += dX;// + Math.sin(angleY) * (dY - Y)) * 0.02;\r\n    camera.position.y += dY;\r\n    camera.position.z += dZ; // + Math.sin(angleY) * (dY - Y)) * 0.02;\r\n    // camera.lookAt(direction);\r\n    camera.lookAt(look);\r\n    // console.log('2:');\r\n    console.log(look);\r\n}\r\n\r\nwindow.addEventListener('mousedown', (e) =>\r\n{\r\n    // 0: Main button pressed, usually the left button or the un-initialized state\r\n    // 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)\r\n    // 2: Secondary button pressed, usually the right button\r\n    // 3: Fourth button, typically the Browser Back button\r\n    // 4: Fifth button, typically the Browser Forward button\r\n    let mX = e.clientX;\r\n    let mY = e.clientY;\r\n    // console.log(e);\r\n    if (e.button === 0) {\r\n        angleX += 2 * Math.PI * (mX - X) / window.innerWidth;\r\n        angleY = Math.abs(angleY + 2 * Math.PI * (mY - Y) / window.innerHeight) < Math.PI / 2\r\n                ? (angleY + 2 * Math.PI * (mY - Y) / window.innerHeight)\r\n                : Math.PI / 2 * (angleY > 0 ? 1 : -1);\r\n        moveInterval = setInterval(() => {\r\n            camRotation(mX, mY, camDist);\r\n            mX = X;\r\n            mY = Y;\r\n        }, 4);\r\n    }\r\n\r\n    if (e.button === 2) {\r\n        moveInterval = setInterval(() => {\r\n            camPosition(mX, mY);\r\n            mX = X;\r\n            mY = Y;\r\n        }, 4);\r\n    }\r\n});\r\n\r\nwindow.addEventListener('mouseup', (e) =>\r\n{\r\n    clearInterval(moveInterval);\r\n    moveInterval = null;\r\n});\r\n\r\nfunction camDistance(delta) {\r\n    camDist += delta;\r\n    camRotation(X, Y, camDist);\r\n}\r\n\r\nwindow.addEventListener('wheel', (e) => {\r\n    // console.log(distInterval);\r\n    let delta = e.deltaY * 0.02;\r\n    // if (!distInterval) {\r\n    let distInterval = setInterval(() => {\r\n        if (Math.abs(delta) > 0.01 && camDist + delta > 20) {\r\n            camDistance(delta);\r\n            delta *= 0.9;\r\n        }\r\n        else {\r\n            clearInterval(distInterval);\r\n            distInterval = null;\r\n        }\r\n    }, 4);\r\n    // }\r\n});\r\n\r\n// window.addEventListener('mousemove', (e) =>\r\n// {\r\n//     console.log(e);\r\n// });\r\n\r\n// let camY = 0;\r\n// window.addEventListener('wheel', (e) => \r\n// {\r\n//     camY = e.deltaY * 0.002;\r\n// })\r\n\r\nconst loader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader();\r\n\r\nconst geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(16, 16, 16, 16, 16, 16);\r\nconst dotGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(1, 8, 8);\r\n\r\nconst material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial({ color: 0x33bb33 });\r\nconst dotMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xff0000 });\r\n\r\nconst mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\r\nconst dotMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(dotGeometry, dotMaterial);\r\nscene.add(mesh);\r\nscene.add(dotMesh);\r\n\r\nconst clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock();\r\n\r\n// const ctrl = new OrbitControls(camera, renderer.domElement);\r\n// let i = setInterval(() => console.log(clock.getElapsedTime()), 1000);\r\nfunction anim() {\r\n    let time = clock.getElapsedTime();\r\n    // camera.position.x = Math.sin(time) * 70; // 70 - radius\r\n    // camera.position.z = Math.cos(time) * 70;\r\n    // camera.lookAt(0, 0, 0);\r\n    dotMesh.position.set(look.x, look.y, look.z);\r\n    // console.log(dotMesh.position);\r\n    requestAnimationFrame(anim);\r\n    renderer.render(scene, camera);\r\n}\r\nanim();\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;