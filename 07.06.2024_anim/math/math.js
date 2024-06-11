// import vector and matrix file
import {vec3Add} from "./vec.js" 
import {newMat4} from "./mat4.js"

// matrix and vector handle description type
class myMath {
    newVec3 = () => {vec3Add()};
    newMat4 = () => {newMat4()}
}

// matrix and vector variable type
let math = new myMath();
let vector = vec3Add();
let matrix = newMat4();

// matrix prototype 4 x 4 scale function
myMath.prototype.mat4Scale = (a) => {
    try {
      return newMat4(a.vec3.x, 0, 0, 0, 0, a.vec3.y, 0, 0, 0, 0, a.vec3.z, 0, 0, 0, 0, 1); 
    } catch (error) {
      console.log("is not a vector");  
    }
}  // end of 'mat4Scale' prototype function

// matrix prototype 4 x 4 rotate function
myMath.prototype.rotateA = (v, a) => {

    let D2R = (d) => {
        return d * 3.141592 / 180;
    }
    let R2D = (r) => {
        return r * 180 / 3.141592;
    }
    
    try {
        let c = Math.cos(D2R(a));
        let s = Math.sin(D2R(a));
        return newMat4((c + v.vec3.x * v.vec3.x * (c - 1)), (v.vec3.x * v.vec3.y * (c- 1) - v.vec3.z * s), (v.vec3.x * v.vec3.z * (1 - c) + v.vec3.y * s), 0,
                                    (v.vec3.x * v.vec3.y * (1 - c) + v.vec3.z * s), (c + v.vec3.y * v.vec3.y * v.vec3.y * (c - 1)), (v.vec3.y * v.vec3.z * (1 - c) - v.vec3.x * s), 0,
                                    (v.vec3.x * v.vec3.z * (1 - c) - v.vec3.y * s), (v.vec3.y * v.vec3.z * (1 - c) + v.vec3.x * s), (c + v.vec3.z * v.vec3.z * (c - 1)), 0,
                                    0, 0, 0, 1);
    } catch (error) {
        console.log("EXCEPTION!!! rotateA");
    }
} // end of 'rotateA' function

// matrix view prototype function
myMath.prototype.matView = (l, a, u) => {
    try {
        let Dir = vector.vec3Norm(vector.vec3Sub(a, l)),
            Right = vector.vec3Norm(vector.vec3Cross(Dir, u)),
            Up = vector.vec3Norm(vector.vec3Cross(Right, Dir));
        
        return newMat4(Right.vec3.x, Up.vec3.x, Dir.vec3.x, 0, Right.vec3.y, Up.vec3.y, Dir.vec3.y, 0, Right.vec3.z, Up.vec3.z, Dir.vec3.z, 0, vector.vec3Mul(l, Right), vector.vec3Mul(l, Up), vector.vec3Mul(l, Dir),1);
    } catch (error) {
        console.log("EXCEPTION!!! mtOrtho");        
    }
} // end of 'matView' function

// matrix view prototype function
myMath.prototype.matOrtho = (l, r, b, t, n, f) => {
    return newMat4(2 / (r - l), 0, 0, 0, 0, 2 / (t - b), 0, 0, 0, 0, -2 / (f - n), 0, 0, 0, -(f + n) / (f - n), 1);
} // end of 'matOrtho' function

// matrix view prototype function
myMath.prototype.matFrustum = (l, r, b, t, n, f) => {
    try {
        return newMat4(2 * n / (r - l), 0, 0, 0,
                                0, 2 * n/ (t - b), 0, 0,
                                (r + l) / (r - l), (t + b) / (t - b), - (f + n) / (f - n), -1,
                                0, 0, -2 * n * f / (f - n), 1);
    } catch (error) {
        console.log("EXCEPTION!!! mtFrustum");        
    }
} // end of 'matFrustum' function

console.log("math.js completed");