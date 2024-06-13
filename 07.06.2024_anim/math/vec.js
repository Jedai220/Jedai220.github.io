/* 3-d vector handle description type */
export default class vec3{
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
}

// vec3 using variable
let def3 =  new vec3;

// 3d vector create prototype function
vec3.prototype.newVec3 = (a, b, c) => {
    return new vec3(a, b, c);
} // end of 'newVec3' prototype function


//3-d vector additional prototype function
vec3.prototype.vec3Add = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 add (2).");
        return;
    }    
    return new vec3(a.vec3.x + b.vec3.x, a.vec3.y + b.vec3.y, a.vec3.z + b.vec3.z);
} // end of 'vec3Add' prototype function

//3-d vector multiple prototype function
vec3.prototype.vec3Mul = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 add (2).");
        return;
    }    
    return (a.vec3.x * b.vec3.x + a.vec3.y * b.vec3.y + a.vec3.z * b.vec3.z);
} // end of 'vec3Mul' prototype function

//3-d vector subtracting prototype function
vec3.prototype.vec3Sub = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 sub (2).");
        return;
    }
    return new vec3(a.vec3.x - b.vec3.x, a.vec3.y - b.vec3.y, a.vec3.z - b.vec3.z);
} // end of 'vec3Sub' prototype function

//3-d vector multiple number prototype function
vec3.prototype.vec3MulNum = (a, b) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b == 'undefined') {
        console.log("EXCEPTION!!! vec3 mul num.");
        return;
    }
    return new vec3(a.vec3.x * b, a.vec3.y * b, a.vec3.z * b);
} // end of 'vec3MulNum' prototype function

//3-d vector divide number prototype function
vec3.prototype.vec3DivNum = (a, b) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b == 'undefined') {
        console.log("EXCEPTION!!! vec3 div num.");
        return;
    }    
    return new vec3(a.vec3.x / b, a.vec3.y / b, a.vec3.z / b);
} // end of 'vec3DivNum' prototype function

//3-d vector set negative prototype function
vec3.prototype.vec3Neg = (a) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 neg (2).");
        return;
    }    
    return new vec3(-a.vec3.x, -a.vec3.y, -a.vec3.z);
} // end of 'vec3Neg' prototype function

//3-d vector set normalize prototype function
vec3.prototype.vec3Norm = (a) => {
    if (a.isVec3 != true || typeof a.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 norm (2).");
        return;
    }    

    let len = def3.vec3Mul(a, a);
    if (len == 1 || len == 0)
        return a;
    return def3.vec3DivNum(a, Math.sqrt(len));
} // end of 'vec3Neg' prototype function

// 3-d vectors crossing prototype function
vec3.prototype.vec3Cross = (a, b) => {
    if (a.isVec3 != true || b.isVec3 != true || typeof a.vec3[0] == 'undefined' || typeof b.vec3[0] == 'undefined') {
        console.log("EXCEPTION!!! vec3 sub (2).");
        return;
    }

    return def3.newVec3(a.vec3.y * b.vec3.z - a.vec3.z * b.vec3.y, -(a.vec3.x * b.vec3.z - a.vec3.z * b.vec3.x), a.vec3.x * b.vec3.y - a.vec3.y * b.vec3.x);
} // end of 'vec3Cross' prototype function

console.log("vec.js complete");