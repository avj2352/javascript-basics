const numbers = [10,20,30,40,50];

const slice1 = numbers.slice(1,4);
const slice2 = numbers.slice.call(numbers,1,4); // Call format
const slice3 = numbers.slice.apply(numbers,[1,4]); // Apply format

console.log(slice1);
console.log(slice2);
console.log(slice2);