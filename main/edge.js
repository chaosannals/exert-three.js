import * as three from 'three';
import { Color } from 'three';

const camera = new three.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
);
camera.position.z = 1;
const geometry = new three.BoxGeometry(0.2, 0.2, 0.2);

// 遮罩层 材质。
const material = new three.ShaderMaterial({
    vertexShader: `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader: `
    void main() {
        // 输出白色
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }`,
    depthTest: false,
});

// 边框材质。
let edgeMaterial = new three.ShaderMaterial({
    vertexShader: `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader: `
    uniform sampler2D maskTexture;
    uniform vec3 color;
    uniform vec3 bcolor;
    uniform float swidth;
    uniform float sheight;
    
    void main() {
        // 分别取出 上下左右 4点像素，maskTexture 是预先的截屏，白色为物体，其余为黑色。
        vec4 top = texture2D(maskTexture, vec2((gl_FragCoord.x + 0.0) / swidth, (gl_FragCoord.y + 1.0) / sheight ));
        vec4 left = texture2D(maskTexture, vec2((gl_FragCoord.x - 1.0) / swidth, (gl_FragCoord.y + 0.0) / sheight ));
        vec4 right = texture2D(maskTexture, vec2((gl_FragCoord.x + 1.0) / swidth, (gl_FragCoord.y + 0.0) / sheight ));
        vec4 bottom = texture2D(maskTexture, vec2((gl_FragCoord.x + 0.0) / swidth, (gl_FragCoord.y - 1.0) / sheight ));

        // 取出红色值（因为只有黑白所以其他管道也无所谓），任意出现 0 即是边界，相乘则是 0，所以 c 非 1 即 0。
        float c = top.r * left.r * right.r * bottom.r;

        // 边界和实体填色。缺点，由于这样取只能确认边框单个像素，所以不能调整边框宽度。
        gl_FragColor = c > 0.5 ? vec4(color, 1.0) : vec4(bcolor, 1.0);
    }`,
    uniforms: {
        maskTexture: {
            type: 't',
            value: null
        },
        color: {
            value: new three.Color(1, 0, 0),
        },
        bcolor: {
            value: new three.Color(1, 1, 0),
        },
        swidth: {
            type: 'f',
            value: window.innerWidth,
        },
        sheight: {
            type: 'f',
            value: window.innerHeight,
        },
        transparent: true
    },
    depthTest: false
})
const mesh = new three.Mesh(geometry, material);
const scene = new three.Scene();
scene.add(mesh);

const bmesh = mesh.clone();
const bscene = new three.Scene();
bscene.add(bmesh);

const renderer = new three.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const bufferTexture = new three.WebGLRenderTarget(
    window.innerWidth, window.innerHeight
)
let nm = new three.MeshNormalMaterial();
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    bmesh.rotation.x += 0.02;
    bmesh.rotation.y += 0.02;

    // 截屏，得到抠图层，白为物体，其余为空。
    bmesh.material = material;
    renderer.setRenderTarget(bufferTexture);
    renderer.clear();
    renderer.render(bscene, camera);

    // 利用遮罩层画出边框。
    edgeMaterial.uniforms.maskTexture.value = bufferTexture.texture;
    bmesh.material = edgeMaterial;
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(bscene, camera);
}

animate();