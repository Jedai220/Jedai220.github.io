import { Vec3 } from "./math/math.js";
import { Mat4 } from "./math/math.js";
import { toArray } from "./utils/utils.js";

// gl variable
let canvas, gl, timeLoc, matWL, matPL, matVL, matWVP;
// Vector and matrix operations variable
let vec3 = Vec3(),
  mat4 = Mat4();

//draw variable
let W = 600.0, // draw screen width
  H = 600.0; // draw screen height
let projSize = 0.1 /* Project plane fit square */,
  projDist = 0.1 /* Distance to project plane from viewer (near) */,
  projFarClip = 300.0; /* Distance to project far clip plane (far) */
let matProj = Mat4(),
  matVP = Mat4(),
  matView = Mat4(),
  matW = Mat4();

// OpenGL initialization function
export function initGL() {
  canvas = document.getElementById("canvasId");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.93, 0.87, 0.94, 1.0);

  // Shader creation
  let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;
  uniform mat4 MatrW;
  uniform mat4 MatrP;
  uniform mat4 MatrV;
  uniform mat4 MatrWVP;
  out vec3 DrawPos;
  uniform float Time;

  void main( void )
  {
    mat4 VP = MatrV * MatrP;
    mat4 WVP = MatrW * VP;
    gl_Position = MatrWVP * vec4(InPosition.xyz, 1.0);
    DrawPos = mat3(MatrW) * InPosition;
  }
  `;
  let fs_txt = `#version 300 es
  precision highp float;
  out vec4 OutColor;
  in vec3 DrawPos;
  uniform float Time;
 
  void main( void )
  {
    OutColor = vec4(DrawPos, 1.0);
    //OutColor = vec4(0, 0, 0, 1.0);
  }
  `;
  
  let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log("Shader program link fail: " + buf);
  }

  // Vertex buffer creation
  const size = 0.8;
  const vertexes = [
    -size, size, -size,
    -size, size, size,
    size, size, size,
    size, size, -size,
    -size, -size, -size,
    -size, -size, size,
    size, -size, size,
    size, -size, -size,
  ];

  const indexes = [
    0, 2, 1, 
    0, 2, 3,
    3, 7, 2,
    7, 2, 6,
    7, 4, 6,
    4, 6, 5,
    0, 4, 1,
    4, 1, 5,
    0, 4, 3,
    4, 3, 7,
    1, 5, 2,
    5, 2, 6,
  ];


  projSet();

  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(posLoc);
  }
  let indArray = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indArray);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(indexes),
    gl.STATIC_DRAW
  );

  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");
  matWL = gl.getUniformLocation(prg, "MatrW");
  matVL = gl.getUniformLocation(prg, "MatrV");
  matPL = gl.getUniformLocation(prg, "MatrP");
  matWVP = gl.getUniformLocation(prg, "MatrWVP");

  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(prg);
} // End of 'initGL' function

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log("Shader compile fail: " + buf);
  }
  return shader;
} // End of 'loadShader' function

// Main render frame function
export function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  // send timer to shader
  if (timeLoc != -1) {
   const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;
    
    gl.uniform1f(timeLoc, t);
  }

  // send matrix to shade
  if (matWL != -1 && matVL != -1 && matPL != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;
    projSet();
    //let matr = toArray(mat4.Mat4Inv(mat4.mat4MulMat4(, matVP)));
    // let matrW = mat4.mat4Translate(vec3.newVec3(0.0, 0.0, 0.0), mat4.rotateA(vec3.newVec3(1.0, 1.0, 1.0), t * 100.0));

    let matrW = mat4.newMat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    let matrP = matProj, matrV = matView;
    let matrWVP = mat4.mat4MulMat4(mat4.rotateA(vec3.newVec3(1.0, 1.0, 1.0), t * 100.0), matVP);

    //matrWVP = mat4.newMat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    let arr = toArray(matrWVP);
    gl.uniformMatrix4fv(matWL, true, new Float32Array(toArray(matrW)));
    gl.uniformMatrix4fv(matVL, true, new Float32Array(toArray(matrV)));
    gl.uniformMatrix4fv(matWVP, false, new Float32Array(arr));
    gl.uniformMatrix4fv(matPL, true, new Float32Array(toArray(matrP)));
    console.log(`\nWVP:  \n${matrW}\n ${matrV}\n ${matrP}\n\n\n${matrWVP}`);
  }

  //gl.drawArrays(gl.TRIANGLES, 0, 3);

  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_INT, 0);
} // End of 'render' function

function projSet() {
  let rx, ry;
  
  rx = ry = projSize;
  
  /* Correct aspect ratio */
  if (W >= H) {
    rx *= W / H;
  } else {
    ry *= H / W;
  }

  // View matrix create and set proj matrix
  matView = mat4.matView(
    Vec3(10.0, 5.0, 3.0),
    Vec3(0.0, 0.0, 0.0),
    Vec3(0.0, 1.0, 0.0)
  );
  
  matProj = mat4.matFrustum(
    -rx / 2,
    rx / 2,
    -ry / 2,
    ry / 2,
    projDist,
    projFarClip
  );

  matVP = mat4.mat4MulMat4(matView, matProj);
} // End of 'projSet' function