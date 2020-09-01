# [exert-three.js](https://github.com/chaosannals/exert-three.js)

## WebGL

### 顶点着色器

```glsl
gl_Postion; // 顶点着色器结果
```

### 片元着色器

```glsl
gl_FragCoord; // 屏幕空间坐标
// z 深度
// x 屏幕x坐标 求取投影坐标： x / 屏幕宽度 * 2.0 - 1.0;
// y 屏幕y坐标 求取投影坐标： y / 屏幕高度 * 2.0 - 1.0;

gl_FragColor; // 片元着色器结果

texture2D(t, c); // c 坐标阿取值必须是 [0.0, 1.0] 所以需要变换到这个区间内。
```

## 空间

### 投影空间

顶点着色器处理后只有进入投影空间的顶点会进入下一阶段，不然被抛弃。

x [-1.0, 1.0]
y [-1.0, 1.0]
z [0.0, 1.0]
