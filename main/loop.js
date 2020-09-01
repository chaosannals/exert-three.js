import * as three from 'three';

const camera = new three.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.z = 1;
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

animate();