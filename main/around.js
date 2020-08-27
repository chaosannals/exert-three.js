import * as three from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 环绕轨道控制器
import Stone from './gadget/stone';

class AroundCamera extends three.PerspectiveCamera {
    constructor(width, height) {
        super(70, width / height, 1, 1000);
        this.spherical = new three.Spherical(10);
        this.position.setFromSpherical(this.spherical);
        this.lookAt(new three.Vector3(0, 0, 0));
    }

    moveViewport(v) {
        let phi = this.spherical.phi - v.y;
        let theta = this.spherical.theta - v.x;
        if (phi > 0 && phi < Math.PI) {
            this.spherical.phi = phi;
        }
        this.spherical.theta = theta;
        this.position.setFromSpherical(this.spherical);
        this.lookAt(new three.Vector3(0, 0, 0));
    }
}

const camera = new AroundCamera(
    window.innerWidth,
    window.innerHeight,
)

const mesh = new Stone();
const scene = new three.Scene();
scene.add(mesh);

const renderer = new three.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
}

let point = null;
let ptnow = window.performance.now();

function onMove(e) {
    let ptn = window.performance.now();
    let dt = (ptn - ptnow) * 0.001;
    ptnow = ptn;
    let now = new three.Vector2(e.pageX, e.pageY);
    let n = now.clone().sub(point).multiplyScalar(dt);
    point = now;
    camera.moveViewport(n);
    // console.log('move', e.pageX, e.pageY, n);
}

// 鼠标按下
document.body.addEventListener('mousedown', (e) => {
    point = new three.Vector2(e.pageX, e.pageY);
    document.body.addEventListener('mousemove', onMove);
});

// 鼠标松开
document.body.addEventListener('mouseup', e => {
    console.log('up', e.pageX, e.pageY);
    document.body.removeEventListener('mousemove', onMove);
});

animate();