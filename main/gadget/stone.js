import * as three from 'three';

export default class Stone extends three.Object3D {
    constructor() {
        super();
        const geometry = new three.BoxGeometry(1, 1, 1);
        const material = new three.MeshNormalMaterial();
        const m0 = new three.Mesh(geometry);
        m0.material.color = new three.Color(0.2, 0.2, 0.2);
        console.log(m0);
        this.add(m0);
        const m1 = new three.Mesh(geometry);
        m1.position.x = 1;
        this.add(m1);
        const m2 = new three.Mesh(geometry);
        m2.material.color = new three.Color(0.7, 0, 0.2);
        m2.position.x = -1;
        this.add(m2);
        const m3 = new three.Mesh(geometry);
        m3.material.color = new three.Color(0.2, 0, 0.7);
        m3.position.y = 1;
        this.add(m3);
        const m6 = new three.Mesh(geometry, material);
        m6.position.y = 2;
        this.add(m6);
        const m4 = new three.Mesh(geometry, material);
        m4.position.z = 1;
        this.add(m4);
        const m5 = new three.Mesh(geometry, material);
        m5.position.z = 2;
        this.add(m5);
        this.position.set(0, 0, 0);
    }
}