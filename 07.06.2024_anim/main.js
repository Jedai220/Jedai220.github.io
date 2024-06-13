import { Vec3 } from "./math/math.js";
import { Mat4 } from "./math/math.js";
import { toArray } from "./utils/utils.js";

// gl variable
let canvas, gl, timeLoc, matWL, matPL, matVL;
// Vector and matrix operations variable
let vec3 = Vec3(),
  mat4 = Mat4();

//draw variable
let W = 600.0 / 2.0, // draw screen width
  H = 600.0 / 2.0; // draw screen height
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

  out vec3 DrawPos;
  uniform float Time;

  void main( void )
  {
    gl_Position =  MatrW * MatrV * MatrP * vec4(InPosition.xyz, 1.0);
    DrawPos = InPosition;
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
  const size = 0.2;
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
  
  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }
  let indArray = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indArray);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(indexes),
    gl.STATIC_DRAW
  );

  projSet();

  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");
  matWL = gl.getUniformLocation(prg, "MatrW"), matPL = gl.getUniformLocation(prg, "MatrP"), matVL = gl.getUniformLocation(prg, "MatrV");

  gl.useProgram(prg);
  gl.enable(gl.DEPTH_TEST);
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
    //let matr = mat4.mat4MulMat4(matW, matVP);
    let matrW = toArray(mat4.mat4MulMat4(mat4.mat4Translate(vec3.newVec3(-3.3, 0.0, 4.0)), mat4.rotateA(vec3.newVec3(1.0, 1.0, 1.0), t * 100.0)));
    let matrP = toArray(matProj), matrV = toArray(matView);
    gl.uniformMatrix4fv(matWL, true, new Float32Array(matrW));
    gl.uniformMatrix4fv(matVL, true, new Float32Array(matrV));
    gl.uniformMatrix4fv(matPL, true, new Float32Array(matrP));
  }

  gl.drawElements(gl.LINES, 36, gl.UNSIGNED_INT, 0);
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
    Vec3(4.0, 4.0, 4.0),
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
} // End of 'projSet' function