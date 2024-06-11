// 4 x 4 matrix handle description type
class mat4 {
    constructor (a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4){
        this.isMatrix = true;
        if (a1 == undefined || a2 == undefined || a3 == undefined || a4 == undefined || b1 == undefined || b2 == undefined || b3 == undefined || b4 == undefined || c1 == undefined || c2 == undefined || c3 == undefined || c4 == undefined || d1 == undefined || d2 == undefined || d3 == undefined || d4 == undefined) {
            this.M = localMatrixIdentity();
        }
        else {
            this.M = [[a1, a2, a3, a4],[b1, b2, b3, b4],[c1, c2, c3, c4],[d1, d2, d3, d4]];
        }
    }    

    // multiple 4 x 4  function
    mat4MulMat4() {
        let a = localMat4MulMat4(arguments) ;
        return a;
    }

    // transpose 4 x 4  matrix 
    Mat4Transpose() {
        let a = localMat4Transpose(arguments) ;
        return a;
    }

    // matrix determinant calculating function
    Mat4Determinant() {
        let a = localMat4Determinant(arguments) ;
        return a;
    }  

    // inverting 4 x 4 matrix function
    Mat4Inv() { 
        let a = localMat4Inv(arguments) ;
        return a;
    }
}

/** Local matrix function description **/

// create matrix function
function newMat4() {
    let a = arguments[0];
    console.log(a[0]);
    if (typeof arguments[0] == 'undefined') {
        return localMatrixIdentity();
    }
    return new mat4(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
} // end of 'localMat4' function

// multiple matrix function
function localMat4MulMat4() {
    if (typeof arguments[0][0] != 'object' || typeof arguments[0][1] != 'object' || arguments[0][0].isMatrix != true || arguments[0][1].isMatrix != true || typeof arguments[0][0].M.M[0][0] == 'undefined' || typeof arguments[0][1].M.M[0][0] == 'undefined') {
        console.log("EXCEPTION!!! multiple matrix");
        console.log(typeof arguments[0][0] != 'object');
        console.log(typeof arguments[0][1] != 'object');
        console.log(arguments[0][0].isMatrix != true);
        console.log(arguments[0][1].isMatrix != true);
        console.log(typeof arguments[0][0].M[0][0] == 'undefined');
        console.log(typeof arguments[0][1].M[0][0] == 'undefined');
        return;
    }

    console.log(typeof arguments[0][0].M.M[0][0]);

    let b = arguments[0][0],
        a = arguments[0][1];

    console.log("matrix mul matrix passed the test");
    return new mat4(a.M[0][0] * b.M[0][0] + a.M[0][1] * b[1][0] + a.M[0][2] * b.M[2][0] + a.M[0][3] * b[3][0],
                    a.M[0][0] * b.M[0][1] + a.M[0][1] * b[1][1] + a.M[0][2] * b.M[2][1] + a.M[0][3] * b[3][1],
                    a.M[0][0] * b.M[0][2] + a.M[0][1] * b[1][2] + a.M[0][2] * b.M[2][2] + a.M[0][3] * b[3][2],
                    a.M[0][0] * b.M[0][3] + a.M[0][1] * b[1][3] + a.M[0][2] * b.M[2][3] + a.M[0][3] * b[3][3],
                    a.M[1][0] * b.M[0][0] + a.M[1][1] * b[1][0] + a.M[1][2] * b.M[2][0] + a.M[1][3] * b[3][0],
                    a.M[1][0] * b.M[0][1] + a.M[1][1] * b[1][1] + a.M[1][2] * b.M[2][1] + a.M[1][3] * b[3][1],
                    a.M[1][0] * b.M[0][2] + a.M[1][1] * b[1][2] + a.M[1][2] * b.M[2][2] + a.M[1][3] * b[3][2],
                    a.M[1][0] * b.M[0][3] + a.M[1][1] * b[1][3] + a.M[1][2] * b.M[2][3] + a.M[1][3] * b[3][3],
                    a.M[2][0] * b.M[0][0] + a.M[2][1] * b[1][0] + a.M[2][2] * b.M[2][0] + a.M[2][3] * b[3][0],
                    a.M[2][0] * b.M[0][1] + a.M[2][1] * b[1][1] + a.M[2][2] * b.M[2][1] + a.M[2][3] * b[3][1],
                    a.M[2][0] * b.M[0][2] + a.M[2][1] * b[1][2] + a.M[2][2] * b.M[2][2] + a.M[2][3] * b[3][2],
                    a.M[2][0] * b.M[0][3] + a.M[2][1] * b[1][3] + a.M[2][2] * b.M[2][3] + a.M[2][3] * b[3][3],
                    a.M[3][0] * b.M[0][0] + a.M[3][1] * b[1][0] + a.M[3][2] * b.M[2][0] + a.M[3][3] * b[3][0],
                    a.M[3][0] * b.M[0][1] + a.M[3][1] * b[1][1] + a.M[3][2] * b.M[2][1] + a.M[3][3] * b[3][1],
                    a.M[3][0] * b.M[0][2] + a.M[3][1] * b[1][2] + a.M[3][2] * b.M[2][2] + a.M[3][3] * b[3][2],
                    a.M[3][0] * b.M[0][3] + a.M[3][1] * b[1][3] + a.M[3][2] * b.M[2][2] + a.M[3][3] * b[3][3],
    );
} // end of 'localMat4MulMat4' function.

// matrix transpose function
function localMat4Transpose(a) {
    let m = a;
    if (typeof m != 'object' || m.isMatrix != true || typeof m.M[0][0] == 'undefined') {
        console.log("EXCEPTION!!! transpose matrix");    
        return;
    }

    return new mat4(m.M[0][0], m.M[1][0], m.M[2][0], m.M[3][0],
                    m.M[0][1], m.M[1][1], m.M[2][0], m.M[3][1],
                    m.M[0][2], m.M[1][2], m.M[2][0], m.M[3][2],
                    m.M[0][3], m.M[1][3], m.M[2][0], m.M[3][3]);
}


// calculating 3 x 3  determinant function
function localMat3Determinant(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
    let d = a11 * a22 * a33 - a11 * a23 * a32 + a12 * a23 * a31 - a12 * a21 * a33 +
         a13 * a21 * a32 - a13 * a22 * a31;
    return d; 
} // end of 'localMat3Determinant' function

// calculating 4 x 4 determinant function
function localMat4Determinant(a) {
    let m = a;
    if (typeof m != 'object' || m.isMatrix != true || typeof m.M[0][0] == 'undefined') {
        console.log("EXCEPTION!!! matrix determinant");    
        return;
    }

    return (+m.M[0][0] * localMat3Determinant(m.M[1][1], m.M[1][2], m.M[1][3],
                                    m.M[2][1], m.M[2][2], m.M[2][3],
                                    m.M[3][1], m.M[3][2], m.M[3][3]) +
            -m.M[0][1] * localMat3Determinant(a.M[1][0], a.M[1][2], a.M[1][3],
                                    m.M[2][0], m.M[2][2], m.M[2][3],
                                    m.M[3][0], m.M[3][2], m.M[3][3]) +
            +m.M[0][2] * localMat3Determinant(m.M[1][0], m.M[1][1], m.M[1][3],
                                    m.M[2][0], m.M[2][1], m.M[2][3],
                                    m.M[3][0], m.M[3][1], m.M[3][3]) +
            -m.M[0][3] * localMat3Determinant(m.M[1][0], m.M[1][1], m.M[1][2],
                                    m.M[2][0], m.M[2][1], m.M[2][2],
                                    m.M[3][0], m.M[3][1], m.M[3][2]));
} // end of 'localMat4Determinant' function

// create identity matrix function
function localMatrixIdentity() {
    return new mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
} // end of 'localMatrixIdentity' function

// inverting 4 x 4 matrix function
function localMat4Inv(a) {
    if (typeof a != 'object' || a.isMatrix != true || typeof a.M[0][0] == 'undefined') {
        console.log("EXCEPTION!!! matrix inverse");
    }

    let det = localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][2],
                                a.M[1][0], a.M[1][1], a.M[1][2],
                                a.M[2][0], a.M[2][1], a.M[2][2]);

    let r = new mat4();

    if (det == 0)
        return localMatrixIdentity();

  /* build adjoint matrix */
  r.M[0][0] =
    +localMat3Determinant(a.M[1][1], a.M[1][2], a.M[1][3],
                   a.M[2][1], a.M[2][2], a.M[2][3],
                   a.M[3][1], a.M[3][2], a.M[3][3]) / det;

  r.M[1][0] =
    -localMat3Determinant(a.M[1][0], a.M[1][2], a.M[1][3],
                   a.M[2][0], a.M[2][2], a.M[2][3],
                   a.M[3][0], a.M[3][2], a.M[3][3]) / det;

  r.M[2][0] =
    +localMat3Determinant(a.M[1][0], a.M[1][1], a.M[1][3],
                   a.M[2][0], a.M[2][1], a.M[2][3],
                   a.M[3][0], a.M[3][1], a.M[3][3]) / det;

  r.M[3][0] =
    -localMat3Determinant(a.M[1][0], a.M[1][1], a.M[1][2],
                   a.M[2][0], a.M[2][1], a.M[2][2],
                   a.M[3][0], a.M[3][1], a.M[3][2]) / det;

  r.M[0][1] =
    -localMat3Determinant(a.M[0][1], a.M[0][2], a.M[0][3],
                   a.M[2][1], a.M[2][2], a.M[2][3],
                   a.M[3][1], a.M[3][2], a.M[3][3]) / det;

  r.M[1][1] =
    +localMat3Determinant(a.M[0][0], a.M[0][2], a.M[0][3],
                   a.M[2][0], a.M[2][2], a.M[2][3],
                   a.M[3][0], a.M[3][2], a.M[3][3]) / det;

  r.M[2][1] =
    -localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][3],
                   a.M[2][0], a.M[2][1], a.M[2][3],
                   a.M[3][0], a.M[3][1], a.M[3][3]) / det;

  r.M[3][1] =
    +localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][2],
                   a.M[2][0], a.M[2][1], a.M[2][2],
                   a.M[3][0], a.M[3][1], a.M[3][2]) / det;

  r.M[0][2] =
    +localMat3Determinant(a.M[0][1], a.M[0][2], a.M[0][3],
                   a.M[1][1], a.M[1][2], a.M[1][3],
                   a.M[3][1], a.M[3][2], a.M[3][3]) / det;

  r.M[1][2] =
    -localMat3Determinant(a.M[0][0], a.M[0][2], a.M[0][3],
                   a.M[1][0], a.M[1][2], a.M[1][3],
                   a.M[3][0], a.M[3][2], a.M[3][3]) / det;

  r.M[2][2] =
    +localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][3],
                   a.M[1][0], a.M[1][1], a.M[1][3],
                   a.M[3][0], a.M[3][1], a.M[3][3]) / det;

  r.M[3][2] =
    -localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][2],
                   a.M[1][0], a.M[1][1], a.M[1][2],
                   a.M[3][0], a.M[3][1], a.M[3][2]) / det;

  r.M[0][3] =
    -localMat3Determinant(a.M[0][1], a.M[0][2], a.M[0][3],
                   a.M[1][1], a.M[1][2], a.M[1][3],
                   a.M[2][1], a.M[2][2], a.M[2][3]) / det;

  r.M[1][3] =
    +localMat3Determinant(a.M[0][0], a.M[0][2], a.M[0][3],
                   a.M[1][0], a.M[1][2], a.M[1][3],
                   a.M[2][0], a.M[2][2], a.M[2][3]) / det;

  r.M[2][3] =
    -localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][3],
                   a.M[1][0], a.M[1][1], a.M[1][3],
                   a.M[2][0], a.M[2][1], a.M[2][3]) / det;

  r.M[3][3] =
    +localMat3Determinant(a.M[0][0], a.M[0][1], a.M[0][2],
                   a.M[1][0], a.M[1][1], a.M[1][2],
                   a.M[2][0], a.M[2][1], a.M[2][2]) / det;

  return r;
} // end of 'localMat4Inv' function

// rotate z axis function
function localMat4RotateZ (a) {
    let c = Math.cos(a),
        s = Math.sin(a);

    return localMat4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0);
} //end of 'localMat4RotateZ' function

// rotate x axis function
function localMat4RotateX (a) {
    let c = Math.cos(a),
        s = Math.sin(a);

    return localMat4(1, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 0, 1);
} //end of 'localMat4RotateX' function

// rotate y axis function
function localMat4RotateY (a) {
    let c = Math.cos(a),
        s = Math.sin(a);

    return localMat4(c, 0 ,-s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
} //end of 'localMat4RotateY' function

export {newMat4};

console.log("mat4.js completed");