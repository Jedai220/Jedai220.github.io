// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HAVE ERROR IN MATH SYSTEM NOW FIXING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \\






import * as all from "./math/math.js"

// gl variable
let
  canvas,
  gl,
  timeLoc;    

//draw variable
let W = 450, // draw screen width
    H = 450; // draw screen height
let
  projSize = 0.1,     /* Project plane fit square */
  projDist = 0.1,     /* Distance to project plane from viewer (near) */
  projFarClip = 300;  /* Distance to project far clip plane (far) */
let matProj = all.default.mv.mat4.mat.newMat4(), 
    matVP   = all.default.mv.mat4.mat.newMat4(),
    matView = all.default.mv.mat4.mat.newMat4(),
    matW = all.default.mv.mat4.mat.newMat4(); 
    

// OpenGL initialization function  
export function initGL() {
  canvas = document.getElementById("canvasId");
  gl = canvas.getContext("webgl2");
  gl.clearColor(1.0, 1.0, 1.0, 1);
  
  // Shader creation
  let vs_txt =
  `#version 300 es
  precision highp float;
  in vec3 InPosition;
  in mat4 MatrWVP;
  
  out vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
  }
  `;
  let fs_txt =
  `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
  }
  `;
  let
    vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log('Shader program link fail: ' + buf);
  }                                            
 
  // Vertex buffer creation
  const size = 0.5;
  const vertexes = [-size, size, 0, -size, -size, 0, size, size, 0, size, -size, 0];
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
 
  // Send wvp matrix to shader
  let matLoc = gl.getAttribLocation(prg, "MatrWVP");
  if (matLoc != -1) {
    gl.uniformMatrix4fv(matLoc, false, new Float32Array(all.default.mv.mat4.mat.mat4MulMat4(matW, matVP)), 0, 16);
  }

  // View matrix create and set proj matrix 
  matView = all.default.mv.matView(all.default.mv.vec.vec.newVec3(5.0, 5.0, 5.0), all.default.mv.vec.vec.newVec3(0.0, 0.0, 0.0), all.default.mv.vec.vec.newVec3(0.0, 1.0, 0.0))
  projSet();

  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");
 
  gl.useProgram(prg);
}  // End of 'initGL' function               
 
// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log('Shader compile fail: ' + buf);
  }                                            
  return shader;
} // End of 'loadShader' function

// Main render frame function
export function render() {
  // console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);
                                               
  if (timeLoc != -1) {
    const date = new Date();
    let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;
 
    gl.uniform1f(timeLoc, t);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function

function projSet() {
  let rx, ry;

  rx = ry = projSize;

  /* Correct aspect ratio */
  if (W >= H) {
    rx *= W / H;
  }
  else {
    ry *= H / W;
  }

  matProj = all.default.mv.matFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
      projDist, projFarClip);
  matVP = all.default.mv.mat4.mat.mat4MulMat4(matView, matProj);
} // End of 'projSet' function