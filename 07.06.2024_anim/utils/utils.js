export function toArray(notArray) {
  if (Array.isArray(notArray)) {
      return;
  }
  let newArray = new Array();
  
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