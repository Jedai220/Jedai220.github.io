'use strict';

/* 3-d vector handle description type */
let vec3$1 = class vec3{
    constructor (a, b, c) {
        if (typeof a == 'undefined' && typeof b == 'undefined' && typeof c == 'undefined') {
            return;
        }
        else if (typeof a != 'undefined' && typeof b == 'undefined' && typeof c == 'undefined') {
            if(a.length == 3) {
                this.vec3 = {x: a[0], y: a[1], z: a[2], 0: a[0], 1: a[1], 2: a[2]};
            }
            else if (a.length == 1) {
                this.vec3 = {x: a[0], y: a[0], z: a[0], 0: a[0], 1: a[0], 2: a[0]};
            }
            else {
                return;
            }
        }
        else if (typeof a != 'undefined' && typeof b != 'undefined' && typeof c != 'undefined') {
            this.vec3 = {x: a, y: b, z: c, 0: a, 1: b, 2: c};
        }
        else {
            return;
        }
        this.isVec3 = true;
    }
};

// vec3 using variable
let def3$1 =  new vec3$1;

// 3d vector create prototype function
vec3$1.prototype.newVec3 = (a, b, c) => {
    return new vec3$1(a, b, c);
}; // end of 'newVec3' prototype function


//3-d vector additional prototype function
vec3$1.prototype.vec3Add = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 add (2).");
        return;
    }    
    return new vec3$1(a.vec3.x + b.vec3.x, a.vec3.y + b.vec3.y, a.vec3.z + b.vec3.z);
}; // end of 'vec3Add' prototype function

//3-d vector multiple prototype function
vec3$1.prototype.vec3Mul = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 add (2).");
        return;
    }    
    return (a.vec3.x * b.vec3.x + a.vec3.y * b.vec3.y + a.vec3.z * b.vec3.z);
}; // end of 'vec3Mul' prototype function

//3-d vector subtracting prototype function
vec3$1.prototype.vec3Sub = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 sub (2).");
        return;
    }
    return new vec3$1(a.vec3.x - b.vec3.x, a.vec3.y - b.vec3.y, a.vec3.z - b.vec3.z);
}; // end of 'vec3Sub' prototype function

//3-d vector multiple number prototype function
vec3$1.prototype.vec3MulNum = (a, b) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b == 'undefined') {
        console.log("EXCEPTION!!! vec3 mul num.");
        return;
    }
    return new vec3$1(a.vec3.x * b, a.vec3.y * b, a.vec3.z * b);
}; // end of 'vec3MulNum' prototype function

//3-d vector divide number prototype function
vec3$1.prototype.vec3DivNum = (a, b) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b == 'undefined') {
        console.log("EXCEPTION!!! vec3 div num.");
        return;
    }    
    return new vec3$1(a.vec3.x / b, a.vec3.y / b, a.vec3.z / b);
}; // end of 'vec3DivNum' prototype function

//3-d vector set negative prototype function
vec3$1.prototype.vec3Neg = (a) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 neg (2).");
        return;
    }    
    return new vec3$1(-a.vec3.x, -a.vec3.y, -a.vec3.z);
}; // end of 'vec3Neg' prototype function

//3-d vector set normalize prototype function
vec3$1.prototype.vec3Norm = (a) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 norm (2).");
        return;
    }    

    let len = def3$1.vec3Mul(a, a);
    if (len == 1 || len == 0)
        return a;
    return def3$1.vec3DivNum(a, Math.sqrt(len));
}; // end of 'vec3Neg' prototype function

// 3-d vectors crossing prototype function
vec3$1.prototype.vec3Cross = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 sub (2).");
        return;
    }

    return def3$1.newVec3(a.vec3.y * b.vec3.z - a.vec3.z * b.vec3.y, -(a.vec3.x * b.vec3.z - a.vec3.z * b.vec3.x), a.vec3.x * b.vec3.y - a.vec3.y * b.vec3.x);
}; // end of 'vec3Cross' prototype function

console.log("vec.js complete");

// 4 x 4 matrix handle description type
let mat4$1 = class mat4 {
  constructor(a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4) {
    this.isMatrix = true;
    if (
      a1 == undefined ||
      a2 == undefined ||
      a3 == undefined ||
      a4 == undefined ||
      b1 == undefined ||
      b2 == undefined ||
      b3 == undefined ||
      b4 == undefined ||
      c1 == undefined ||
      c2 == undefined ||
      c3 == undefined ||
      c4 == undefined ||
      d1 == undefined ||
      d2 == undefined ||
      d3 == undefined ||
      d4 == undefined
    ) {
      this.M = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
    } else {
      this.M = [
        [a1, a2, a3, a4],
        [b1, b2, b3, b4],
        [c1, c2, c3, c4],
        [d1, d2, d3, d4],
      ];
    }
  }

  // multiple 4 x 4  function
  mat4MulMat4() {
    let a = localMat4MulMat4(arguments);
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
};

/** Local matrix function description **/

// create matrix function
mat4$1.prototype.newMat4 = (args) => {
  try {
    return new mat4$1(
        args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15] 
    );
  } catch (err) {
    return localMatrixIdentity();
  }
}; // end of 'localMat4' function

// multiple matrix function
function localMat4MulMat4() {
  if (
    typeof arguments[0][0] != "object" ||
    typeof arguments[0][1] != "object" ||
    arguments[0][0].isMatrix != true ||
    arguments[0][1].isMatrix != true ||
    typeof arguments[0][0].M[0][0] == "undefined" ||
    typeof arguments[0][1].M[0][0] == "undefined"
  ) {
    console.log("EXCEPTION!!! multiple matrix");
    return;
  }

  let b = arguments[0][0],
    a = arguments[0][1];

  console.log("matrix mul matrix passed the test");
  return new mat4$1(
    a.M[0][0] * b.M[0][0] +  
      a.M[0][1] * b.M[1][0] +
      a.M[0][2] * b.M[2][0] +
      a.M[0][3] * b.M[3][0], 
    a.M[0][0] * b.M[0][1] +  
      a.M[0][1] * b.M[1][1] +
      a.M[0][2] * b.M[2][1] +
      a.M[0][3] * b.M[3][1],
    a.M[0][0] * b.M[0][2] +
      a.M[0][1] * b.M[1][2] +
      a.M[0][2] * b.M[2][2] +
      a.M[0][3] * b.M[3][2],
    a.M[0][0] * b.M[0][3] +
      a.M[0][1] * b.M[1][3] +
      a.M[0][2] * b.M[2][3] +
      a.M[0][3] * b.M[3][3],
    a.M[1][0] * b.M[0][0] +
      a.M[1][1] * b.M[1][0] +
      a.M[1][2] * b.M[2][0] +
      a.M[1][3] * b.M[3][0],
    a.M[1][0] * b.M[0][1] +
      a.M[1][1] * b.M[1][1] +
      a.M[1][2] * b.M[2][1] +
      a.M[1][3] * b.M[3][1],
    a.M[1][0] * b.M[0][2] +
      a.M[1][1] * b.M[1][2] +
      a.M[1][2] * b.M[2][2] +
      a.M[1][3] * b.M[3][2],
    a.M[1][0] * b.M[0][3] +
      a.M[1][1] * b.M[1][3] +
      a.M[1][2] * b.M[2][3] +
      a.M[1][3] * b.M[3][3],
    a.M[2][0] * b.M[0][0] +
      a.M[2][1] * b.M[1][0] +
      a.M[2][2] * b.M[2][0] +
      a.M[2][3] * b.M[3][0],
    a.M[2][0] * b.M[0][1] +
      a.M[2][1] * b.M[1][1] +
      a.M[2][2] * b.M[2][1] +
      a.M[2][3] * b.M[3][1],
    a.M[2][0] * b.M[0][2] +
      a.M[2][1] * b.M[1][2] +
      a.M[2][2] * b.M[2][2] +
      a.M[2][3] * b.M[3][2],
    a.M[2][0] * b.M[0][3] +
      a.M[2][1] * b.M[1][3] +
      a.M[2][2] * b.M[2][3] +
      a.M[2][3] * b.M[3][3],
    a.M[3][0] * b.M[0][0] +
      a.M[3][1] * b.M[1][0] +
      a.M[3][2] * b.M[2][0] +
      a.M[3][3] * b.M[3][0],
    a.M[3][0] * b.M[0][1] +
      a.M[3][1] * b.M[1][1] +
      a.M[3][2] * b.M[2][1] +
      a.M[3][3] * b.M[3][1],
    a.M[3][0] * b.M[0][2] +
      a.M[3][1] * b.M[1][2] +
      a.M[3][2] * b.M[2][2] +
      a.M[3][3] * b.M[3][2],
    a.M[3][0] * b.M[0][3] +
      a.M[3][1] * b.M[1][3] +
      a.M[3][2] * b.M[2][2] +
      a.M[3][3] * b.M[3][3]
  );
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

  return new mat4$1(
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
  return new mat4$1(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
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

  let r = new mat4$1();

  if (det == 0) return localMatrixIdentity();

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
mat4$1.prototype.rotateX = (a) => {
  let c = Math.cos(a),
    s = Math.sin(a);

  return localMat4(1, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 0, 1);
}; //end of 'localMat4RotateX' function

// rotate y axis function
function localMat4RotateY(a) {
  let c = Math.cos(a),
    s = Math.sin(a);

  return new mat4$1(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
} //end of 'localMat4RotateY' function

mat4$1.prototype.mat4Translate = (V) => {
  try {
    let M = new mat4$1;

    M.M[3][0] = V.vec3.x;
    M.M[3][1] = V.vec3.y;
    M.M[3][2] = V.vec3.z;
  
    return M;
  } catch (error) {
    console.log("EXCEPTION!!! Translate");  
  }
};

console.log("mat4.js completed");

// import vector and matrix file

let def3 = new vec3$1;
let def4 = new mat4$1;

function Vec3() {return def3.newVec3(arguments)}function Mat4() {return def4.newMat4(arguments)}
// matrix and vector variable type
let vector = Vec3();
Mat4();

// matrix prototype 4 x 4 scale function
mat4$1.prototype.mat4Scale = (a) => {
    try {
      return Mat4(a.vec3.x, 0, 0, 0, 0, a.vec3.y, 0, 0, 0, 0, a.vec3.z, 0, 0, 0, 0, 1); 
    } catch (error) {
      console.log("is not a vector");  
    }
};  // end of 'mat4Scale' prototype function

// matrix prototype 4 x 4 rotate function
mat4$1.prototype.rotateA = (v, a) => {

    let D2R = (d) => {
        return d * 3.141592 / 180;
    };
    
    try {
        let c = Math.cos(D2R(a));
        let s = Math.sin(D2R(a));
        return Mat4((c + v.vec3.x * v.vec3.x * (1 - c)), (v.vec3.x * v.vec3.y * (1 - c) - v.vec3.z * s), (v.vec3.x * v.vec3.z * (1 - c) + v.vec3.y * s), 0,
                                    (v.vec3.x * v.vec3.y * (1 - c) + v.vec3.z * s), (c + v.vec3.y * v.vec3.y * v.vec3.y * (c - 1)), (v.vec3.y * v.vec3.z * (1 - c) - v.vec3.x * s), 0,
                                    (v.vec3.x * v.vec3.z * (1 - c) - v.vec3.y * s), (v.vec3.y * v.vec3.z * (1 - c) + v.vec3.x * s), (c + v.vec3.z * v.vec3.z * (1 - c)), 0,
                                    0, 0, 0, 1);
    } catch (error) {
        console.log("EXCEPTION!!! rotateA");
    }
}; // end of 'rotateA' function

// matrix view prototype function
mat4$1.prototype.matView = (loc, at, u1) => {
    try {
        let Dir = vector.vec3Norm(vector.vec3Sub(at, loc)),
            Right = vector.vec3Norm(vector.vec3Cross(Dir, u1)),
            Up = vector.vec3Norm(vector.vec3Cross(Right, Dir));
        
        return Mat4(Right.vec3.x, Up.vec3.x, -Dir.vec3.x, 0.0,
                    Right.vec3.y, Up.vec3.y, -Dir.vec3.y, 0.0,
                    Right.vec3.z, Up.vec3.z, -Dir.vec3.z, 0.0,
                    -vector.vec3Mul(loc, Right), -vector.vec3Mul(loc, Up), vector.vec3Mul(loc, Dir), 1.0);
    } catch (error) {
        console.log("EXCEPTION!!! matrOrtho");        
    }
}; // end of 'matView' function

// matrix view prototype function
mat4$1.prototype.matOrtho = (l, r, b, t, n, f) => {
    return Mat4(2.0 / (r - l), 0.0, 0.0, 0.0,
                0.0, 2.0 / (t - b), 0.0, 0.0,
                0.0, 0.0, -2.0 / (f - n), 0.0,
                0.0, 0.0, -(f + n) / (f - n), 1.0);
}; // end of 'matOrtho' function

// matrix view prototype function
mat4$1.prototype.matFrustum = (l, r, b, t, n, f) => {
    try {
        return Mat4((2.0 * n) / (r - l), 0.0, 0.0, 0.0,
                    0.0, (2.0 * n) / (t - b), 0.0, 0.0,
                    (r + l) / (r - l), (t + b) / (t - b), (-((f + n) / (f - n))), -1.0,
                    0.0, 0.0, (-((2.0 * n * f) / (f - n))), 0.0);
    } catch (error) {
        console.log("EXCEPTION!!! mtFrustum");        
    }
}; // end of 'matFrustum' function

console.log("math.js completed");

function toArray(notArray) {
  if (Array.isArray(notArray)) {
      return;
  }
  let newArray = new Array;
  
  let index = 0;
  if (notArray.isMatrix) {
    notArray = notArray.M;
    for (let inter of notArray) {
      for (let iterator of inter) {
        newArray[index++] = iterator; 
      }
      console.log(inter);
    }
  }
  console.log(`utils debug message (ta):\nARRAY: ${Array.isArray(newArray)}\tVALUE: ${newArray}`);
  return newArray; 
}

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
let matProj = Mat4();
  Mat4();
  let matView = Mat4();
  Mat4();

// OpenGL initialization function
function initGL() {
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
function render() {
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
  {
    rx *= W / H;
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

exports.initGL = initGL;
exports.render = render;
