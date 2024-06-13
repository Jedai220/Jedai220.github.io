// import vector and matrix file
import vec3 from './vec.js' 
import mat4 from './mat4.js'
export {Vec3}
export {Mat4}

let def3 = new vec3;
let def4 = new mat4;

function Vec3() {return def3.newVec3(arguments)}; 
function Mat4() {return def4.newMat4(arguments)}; 

// matrix and vector variable type
let vector = Vec3();
let matrix = Mat4();

// matrix prototype 4 x 4 scale function
mat4.prototype.mat4Scale = (a) => {
    try {
      return Mat4(a.vec3.x, 0, 0, 0, 0, a.vec3.y, 0, 0, 0, 0, a.vec3.z, 0, 0, 0, 0, 1); 
    } catch (error) {
      console.log("is not a vector");  
    }
}  // end of 'mat4Scale' prototype function

// matrix prototype 4 x 4 rotate function
mat4.prototype.rotateA = (v, a) => {

    let D2R = (d) => {
        return d * 3.141592 / 180;
    }
    let R2D = (r) => {
        return r * 180 / 3.141592;
    }
    
    try {
        v = def3.vec3Norm(v);
        let c = Math.cos(D2R(a));
        let s = Math.sin(D2R(a));
        return Mat4((c + v.vec3.x * v.vec3.x * (1 - c)), (v.vec3.x * v.vec3.y * (1 - c) - v.vec3.z * s), (v.vec3.x * v.vec3.z * (1 - c) + v.vec3.y * s), 0,
                                    (v.vec3.x * v.vec3.y * (1 - c) + v.vec3.z * s), (c + v.vec3.y * v.vec3.y * v.vec3.y * (1 - c)), (v.vec3.y * v.vec3.z * (1 - c) - v.vec3.x * s), 0,
                                    (v.vec3.x * v.vec3.z * (1 - c) - v.vec3.y * s), (v.vec3.y * v.vec3.z * (1 - c) + v.vec3.x * s), (c + v.vec3.z * v.vec3.z * (1 - c)), 0,
                                    0, 0, 0, 1);
    } catch (error) {
        console.log("EXCEPTION!!! rotateA");
    }
} // end of 'rotateA' function

// matrix view prototype function
mat4.prototype.matView = (loc, at, u1) => {
    try {
        let Dir = vector.vec3Norm(vector.vec3Sub(at, loc)),
            Right = vector.vec3Norm(vector.vec3Cross(Dir, u1)),
            Up = vector.vec3Norm(vector.vec3Cross(Right, Dir));
        
        return Mat4(Right.vec3.x, Up.vec3.x, -Dir.vec3.x, 0.0,
                    Right.vec3.y, Up.vec3.y, -Dir.vec3.y, 0.0,
                    Right.vec3.z, Up.vec3.z, -Dir.vec3.z, 0.0,
                    -vector.vec3Mul(loc, Right), -vector.vec3Mul(loc, Up), vector.vec3Mul(loc, Dir), 1);
    } catch (error) {
        console.log("EXCEPTION!!! matView");        
    }
} // end of 'matView' function

// matrix view prototype function
mat4.prototype.matOrtho = (l, r, b, t, n, f) => {
    return Mat4(2.0 / (r - l), 0.0, 0.0, 0.0,
                0.0, 2.0 / (t - b), 0.0, 0.0,
                0.0, 0.0, -2.0 / (f - n), 0.0,
                -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1.0);
} // end of 'matOrtho' function

// matrix view prototype function
mat4.prototype.matFrustum = (l, r, b, t, n, f) => {
    try {
        return Mat4((2.0 * n) / (r - l), 0.0, 0.0, 0.0,
                    0.0, (2.0 * n) / (t - b), 0.0, 0.0,
                    (r + l) / (r - l), (t + b) / (t - b), (-((f + n) / (f - n))), (-1.0),
                    0.0, 0.0, (-((2.0 * n * f) / (f - n))), 0.0);
    } catch (error) {
        console.log("EXCEPTION!!! mtFrustum");        
    }
} // end of 'matFrustum' function

console.log("math.js completed");