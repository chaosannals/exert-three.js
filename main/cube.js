import * as three from 'three';

const camera = new three.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.z = 1;
const geometry = new three.BoxGeometry(0.2, 0.2, 0.2);
const material = new three.ShaderMaterial({
    vertexShader: `
    uniform float uWidth;
    uniform float uHeight;
    varying vec4 vPos;

    void main() {
        vPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position = vPos;
    }
    `,
    fragmentShader: `
    uniform float uWidth;
    uniform float uHeight;
    varying vec4 vPos;
    
    void main() {
        float x = gl_FragCoord.x / uWidth * 2.0 - 1.0;
        float y = gl_FragCoord.y / uHeight * 2.0 - 1.0;
        float z = gl_FragCoord.z;
        float w = 1.0 / gl_FragCoord.w;
        float d = length(gl_FragCoord.xyz - vPos.xyz);
        gl_FragColor = vec4(x, y, 0.0, 1.0);
        //gl_FragColor = d > 1.0 ? vec4(1.0, 0.0, 0.0, 1.0) : vec4(1.0, 1.0, 0.0, 1.0);
    }
    `,
    uniforms: {
        uWidth: {
            value: window.innerWidth
        },
        uHeight: {
            value: window.innerHeight
        }
    }
});
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