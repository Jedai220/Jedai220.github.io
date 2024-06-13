// 4 x 4 matrix handle description type
export default class mat4 {
  constructor(a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4) {
    this.isMatrix = true;
      this.M = [
        [a1, a2, a3, a4],
        [b1, b2, b3, b4],
        [c1, c2, c3, c4],
        [d1, d2, d3, d4],
      ];
    }
  
  // multiple 4 x 4  function
  mat4MulMat4(b, c) {
    let a = localMat4MulMat4(b, c);
    return a;
  }

  // transpose 4 x 4  matrix
  Mat4Transpose() {
    let a = localMat4Transpose(arguments);
    return a;
  }

  // matrix determinant calculating function
  Mat4Determinant() {
    let a = localMat4Determinant(arguments);
    return a;
  }

  // inverting 4 x 4 matrix function
  Mat4Inv() {
    let a = localMat4Inv(arguments[0]);
    return a;
  }

  rotateY() {
    let a = localMat4RotateY(arguments[0]);
    return a;
  }
}

/** Local matrix function description **/

// create matrix function
mat4.prototype.newMat4 = (a) => {
    if (typeof a[0] == 'undefined') {
      return localMatrixIdentity();
    }
    return new mat4(
      a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]            
    );
}; // end of 'localMat4' function

// multiple matrix function
function localMat4MulMat4(a, b) {
  
  let m = new mat4();

  m.M[0][0] = a.M[0][0] * b.M[0][0] + a.M[0][1] * b.M[1][0] + a.M[0][2] * b.M[2][0] +
    a.M[0][3] * b.M[3][0];

  m.M[0][1] = a.M[0][0] * b.M[0][1] + a.M[0][1] * b.M[1][1] + a.M[0][2] * b.M[2][1] +
    a.M[0][3] * b.M[3][1];

  m.M[0][2] = a.M[0][0] * b.M[0][2] + a.M[0][1] * b.M[1][2] + a.M[0][2] * b.M[2][2] +
    a.M[0][3] * b.M[3][2];

  m.M[0][3] = a.M[0][0] * b.M[0][3] + a.M[0][1] * b.M[1][3] + a.M[0][2] * b.M[2][3] +
    a.M[0][3] * b.M[3][3];

  m.M[1][0] = a.M[1][0] * b.M[0][0] + a.M[1][1] * b.M[1][0] + a.M[1][2] * b.M[2][0] +
    a.M[1][3] * b.M[3][0];

  m.M[1][1] = a.M[1][0] * b.M[0][1] + a.M[1][1] * b.M[1][1] + a.M[1][2] * b.M[2][1] +
    a.M[1][3] * b.M[3][1];

  m.M[1][2] = a.M[1][0] * b.M[0][2] + a.M[1][1] * b.M[1][2] + a.M[1][2] * b.M[2][2] +
    a.M[1][3] * b.M[3][2];

  m.M[1][3] = a.M[1][0] * b.M[0][3] + a.M[1][1] * b.M[1][3] + a.M[1][2] * b.M[2][3] +
    a.M[1][3] * b.M[3][3];


  m.M[2][0] = a.M[2][0] * b.M[0][0] + a.M[2][1] * b.M[1][0] + a.M[2][2] * b.M[2][0] +
    a.M[2][3] * b.M[3][0];

  m.M[2][1] = a.M[2][0] * b.M[0][1] + a.M[2][1] * b.M[1][1] + a.M[2][2] * b.M[2][1] +
    a.M[2][3] * b.M[3][1];

  m.M[2][2] = a.M[2][0] * b.M[0][2] + a.M[2][1] * b.M[1][2] + a.M[2][2] * b.M[2][2] +
    a.M[2][3] * b.M[3][2];

  m.M[2][3] = a.M[2][0] * b.M[0][3] + a.M[2][1] * b.M[1][3] + a.M[2][2] * b.M[2][3] +
    a.M[2][3] * b.M[3][3];


  m.M[3][0] = a.M[3][0] * b.M[0][0] + a.M[3][1] * b.M[1][0] + a.M[3][2] * b.M[2][0] +
    a.M[3][3] * b.M[3][0];

  m.M[3][1] = a.M[3][0] * b.M[0][1] + a.M[3][1] * b.M[1][1] + a.M[3][2] * b.M[2][1] +
    a.M[3][3] * b.M[3][1];

  m.M[3][2] = a.M[3][0] * b.M[0][2] + a.M[3][1] * b.M[1][2] + a.M[3][2] * b.M[2][2] +
    a.M[3][3] * b.M[3][2];

  m.M[3][3] = a.M[3][0] * b.M[0][3] + a.M[3][1] * b.M[1][3] + a.M[3][2] * b.M[2][3] +
    a.M[3][3] * b.M[3][3];

    return m;
} // end of 'localMat4MulMat4' function.

// matrix transpose function
function localMat4Transpose(a) {
  let m = a;
  if (
    typeof m != "object" ||
    m.isMatrix != true ||
    typeof m.M[0][0] == "undefined"
  ) {
    console.log("EXCEPTION!!! transpose matrix");
    return;
  }

  return new mat4(
    m.M[0][0],
    m.M[1][0],
    m.M[2][0],
    m.M[3][0],
    m.M[0][1],
    m.M[1][1],
    m.M[2][0],
    m.M[3][1],
    m.M[0][2],
    m.M[1][2],
    m.M[2][0],
    m.M[3][2],
    m.M[0][3],
    m.M[1][3],
    m.M[2][0],
    m.M[3][3]
  );
}

// calculating 3 x 3  determinant function
function localMat3Determinant(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
  let d =
    a11 * a22 * a33 -
    a11 * a23 * a32 +
    a12 * a23 * a31 -
    a12 * a21 * a33 +
    a13 * a21 * a32 -
    a13 * a22 * a31;
  return d;
} // end of 'localMat3Determinant' function

// calculating 4 x 4 determinant function
function localMat4Determinant(a) {
  let m = a;
  if (
    typeof m != "object" ||
    m.isMatrix != true ||
    typeof m.M[0][0] == "undefined"
  ) {
    console.log("EXCEPTION!!! matrix determinant");
    return;
  }

  return (
    +m.M[0][0] *
      localMat3Determinant(
        m.M[1][1],
        m.M[1][2],
        m.M[1][3],
        m.M[2][1],
        m.M[2][2],
        m.M[2][3],
        m.M[3][1],
        m.M[3][2],
        m.M[3][3]
      ) +
    -m.M[0][1] *
      localMat3Determinant(
        a.M[1][0],
        a.M[1][2],
        a.M[1][3],
        m.M[2][0],
        m.M[2][2],
        m.M[2][3],
        m.M[3][0],
        m.M[3][2],
        m.M[3][3]
      ) +
    +m.M[0][2] *
      localMat3Determinant(
        m.M[1][0],
        m.M[1][1],
        m.M[1][3],
        m.M[2][0],
        m.M[2][1],
        m.M[2][3],
        m.M[3][0],
        m.M[3][1],
        m.M[3][3]
      ) +
    -m.M[0][3] *
      localMat3Determinant(
        m.M[1][0],
        m.M[1][1],
        m.M[1][2],
        m.M[2][0],
        m.M[2][1],
        m.M[2][2],
        m.M[3][0],
        m.M[3][1],
        m.M[3][2]
      )
  );
} // end of 'localMat4Determinant' function

// create identity matrix function
function localMatrixIdentity() {
  return new mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
} // end of 'localMatrixIdentity' function

// inverting 4 x 4 matrix function
function localMat4Inv(a) {
  if (
    typeof a != "object" ||
    a.isMatrix != true ||
    typeof a.M[0][0] == "undefined"
  ) {
    console.log("EXCEPTION!!! matrix inverse");
  }

  let det = localMat3Determinant(
    a.M[0][0],
    a.M[0][1],
    a.M[0][2],
    a.M[1][0],
    a.M[1][1],
    a.M[1][2],
    a.M[2][0],
    a.M[2][1],
    a.M[2][2]
  );

  let r = new mat4();

  if (det == 0) {
    console.assert("ERROR");
    return a;
  }

  /* build adjoint matrix */
  r.M[0][0] =
    +localMat3Determinant(
      a.M[1][1],
      a.M[1][2],
      a.M[1][3],
      a.M[2][1],
      a.M[2][2],
      a.M[2][3],
      a.M[3][1],
      a.M[3][2],
      a.M[3][3]
    ) / det;

  r.M[1][0] =
    -localMat3Determinant(
      a.M[1][0],
      a.M[1][2],
      a.M[1][3],
      a.M[2][0],
      a.M[2][2],
      a.M[2][3],
      a.M[3][0],
      a.M[3][2],
      a.M[3][3]
    ) / det;

  r.M[2][0] =
    +localMat3Determinant(
      a.M[1][0],
      a.M[1][1],
      a.M[1][3],
      a.M[2][0],
      a.M[2][1],
      a.M[2][3],
      a.M[3][0],
      a.M[3][1],
      a.M[3][3]
    ) / det;

  r.M[3][0] =
    -localMat3Determinant(
      a.M[1][0],
      a.M[1][1],
      a.M[1][2],
      a.M[2][0],
      a.M[2][1],
      a.M[2][2],
      a.M[3][0],
      a.M[3][1],
      a.M[3][2]
    ) / det;

  r.M[0][1] =
    -localMat3Determinant(
      a.M[0][1],
      a.M[0][2],
      a.M[0][3],
      a.M[2][1],
      a.M[2][2],
      a.M[2][3],
      a.M[3][1],
      a.M[3][2],
      a.M[3][3]
    ) / det;

  r.M[1][1] =
    +localMat3Determinant(
      a.M[0][0],
      a.M[0][2],
      a.M[0][3],
      a.M[2][0],
      a.M[2][2],
      a.M[2][3],
      a.M[3][0],
      a.M[3][2],
      a.M[3][3]
    ) / det;

  r.M[2][1] =
    -localMat3Determinant(
      a.M[0][0],
      a.M[0][1],
      a.M[0][3],
      a.M[2][0],
      a.M[2][1],
      a.M[2][3],
      a.M[3][0],
      a.M[3][1],
      a.M[3][3]
    ) / det;

  r.M[3][1] =
    +localMat3Determinant(
      a.M[0][0],
      a.M[0][1],
      a.M[0][2],
      a.M[2][0],
      a.M[2][1],
      a.M[2][2],
      a.M[3][0],
      a.M[3][1],
      a.M[3][2]
    ) / det;

  r.M[0][2] =
    +localMat3Determinant(
      a.M[0][1],
      a.M[0][2],
      a.M[0][3],
      a.M[1][1],
      a.M[1][2],
      a.M[1][3],
      a.M[3][1],
      a.M[3][2],
      a.M[3][3]
    ) / det;

  r.M[1][2] =
    -localMat3Determinant(
      a.M[0][0],
      a.M[0][2],
      a.M[0][3],
      a.M[1][0],
      a.M[1][2],
      a.M[1][3],
      a.M[3][0],
      a.M[3][2],
      a.M[3][3]
    ) / det;

  r.M[2][2] =
    +localMat3Determinant(
      a.M[0][0],
      a.M[0][1],
      a.M[0][3],
      a.M[1][0],
      a.M[1][1],
      a.M[1][3],
      a.M[3][0],
      a.M[3][1],
      a.M[3][3]
    ) / det;

  r.M[3][2] =
    -localMat3Determinant(
      a.M[0][0],
      a.M[0][1],
      a.M[0][2],
      a.M[1][0],
      a.M[1][1],
      a.M[1][2],
      a.M[3][0],
      a.M[3][1],
      a.M[3][2]
    ) / det;

  r.M[0][3] =
    -localMat3Determinant(
      a.M[0][1],
      a.M[0][2],
      a.M[0][3],
      a.M[1][1],
      a.M[1][2],
      a.M[1][3],
      a.M[2][1],
      a.M[2][2],
      a.M[2][3]
    ) / det;

  r.M[1][3] =
    +localMat3Determinant(
      a.M[0][0],
      a.M[0][2],
      a.M[0][3],
      a.M[1][0],
      a.M[1][2],
      a.M[1][3],
      a.M[2][0],
      a.M[2][2],
      a.M[2][3]
    ) / det;

  r.M[2][3] =
    -localMat3Determinant(
      a.M[0][0],
      a.M[0][1],
      a.M[0][3],
      a.M[1][0],
      a.M[1][1],
      a.M[1][3],
      a.M[2][0],
      a.M[2][1],
      a.M[2][3]
    ) / det;

  r.M[3][3] =
    +localMat3Determinant(
      a.M[0][0],
      a.M[0][1],
      a.M[0][2],
      a.M[1][0],
      a.M[1][1],
      a.M[1][2],
      a.M[2][0],
      a.M[2][1],
      a.M[2][2]
    ) / det;

  return r;
} // end of 'localMat4Inv' function

// rotate x axis function
mat4.prototype.rotateX = (a) => {
  let c = Math.cos(a),
    s = Math.sin(a);

  return new mat4(
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1);
} //end of 'localMat4RotateX' function

// rotate y axis function
function localMat4RotateY(a) {
  let c = Math.cos(a),
    s = Math.sin(a);

  return new mat4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
} //end of 'localMat4RotateY' function

mat4.prototype.mat4Translate = (V) => {
  try {
    let M = new mat4;

    M.M[3][0] = V.vec3.x;
    M.M[3][1] = V.vec3.y;
    M.M[3][2] = V.vec3.z;
  
    return M;
  } catch (error) {
    console.log("EXCEPTION!!! Translate");  
  }
}

console.log("mat4.js completed");
