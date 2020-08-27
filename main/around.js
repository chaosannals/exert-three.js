import * as three from 'three';

class AroundCamera extends three.PerspectiveCamera {
    constructor(width, height) {
        super(70, width / height, 0.01, 10)
        this.position.z = 1;
    }
}

const camera = new AroundCamera(
    window.innerWidth,
    window.innerHeight,
)

const geometry = new three.BoxGeometry(0.2, 0.2, 0.2);
const material = new three.MeshNormalMaterial();
const mesh = new three.Mesh(geometry, material);
const scene = new three.Scene();
scene.add(mesh);

const renderer = new three.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
}

let point = null;

// 鼠标按下
document.body.addEventListener('mousedown', (e) => {
    console.log('down', e.pageX, e.pageY);
});

// 鼠标松开
document.body.addEventListener('mouseup', e => {
    console.log('up', e.pageX, e.pageY);
});

// 鼠标移动
document.body.addEventListener('mousemove', (e) => {
    console.log('move', e.pageX, e.pageY);
});

animate();