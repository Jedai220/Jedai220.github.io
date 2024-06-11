let
  canvas,
  gl,
  timeLoc;    
 
// OpenGL initialization function  
export function initGL() {
  canvas = document.getElementById("myCan");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.30, 0.47, 0.8, 1);
  
  // Shader creation
  let vs_txt =
  `#version 300 es
  precision highp float;
  in vec3 InPosition;
  
  out vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
    vec2 p[4] = vec2[4](vec2(-1.30, 1.30), vec2(-1.30, -1.30), vec2(1.30, 1.30), vec2(1.30, -1.30));
    vec2 t[4] = vec2[4](vec2(-2.0, 2.0), vec2(-2.0, -2.0), vec2(2.0, 2.0), vec2(2.0, -2.0));
    gl_Position = vec4(p[gl_VertexID].xy, 0.0, 1.0);
    DrawPos.xy = t[gl_VertexID];
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
    vec2 Z = DrawPos;
    vec2 C = vec2(0.35 + 0.05 * sin(2.0 * Time * 1.3), 0.35 + 0.05 * sin(2.0 * Time * 0.8));
    float n = 0.0;

    while (n < 250.0 && length(Z) < 2.0)
    {
      Z = vec2(Z.x * Z.x - Z.y * Z.y, 2.0 * Z.x * Z.y) + C;
      n++;
    }

    if (n < 2.0)
      OutColor = vec4(0.0);
    else if (n > 2.0 && n < 0.5)
      OutColor = vec4(n * 80.0, n / 30.0, n * (20.0 + 5.0 * abs(sin(Time + 3.0))), 0.5);
    else
      OutColor = vec4(n * 40.0, n / 100.0, n * (20.0 + 5.0 * abs(sin(Time + 3.0))), 1.0);
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
  const size = 1;
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
  
let x = 1;                    
 
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
 
console.log("CGSG forever!!! mylib.js imported");
