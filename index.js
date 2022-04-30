// duplicate list passed
// [[1,2,3,4,5] => [1,2,3,4,5,1,2,3,4,5]
function duplicate(list) {
  console.log(list.concat(list))
  console.log([...list, ...list]);
}
duplicate([1,2,3,4,5]);

const whatToSay = {
  whatsUp() {
    console.log("whaz up")
  },
  hollaBack() {
    console.log("holla")
  }
}

whatToSay.whatsUp();
whatToSay.hollaBack();

function twoArraysEqual(list1, list2) {
  if (list1.length !== list2.length) return false;

  for (let i =0; i <list1.length; i++) {
    if (list1[i] !== list2[i]) return false;
  }

  return true;
}

function executor(callback, ...args) {
  return(console.log(callback(...args)))
}

function myMax(...args) {
  if (args.length <= 0) return undefined;

  return args.reduce((max, arg) => {
    if (max < arg) max = arg;
    return max
  }, 0);
}

console.log("myMax ", myMax(2,7,12,11)) // 12
console.log("myMax ", myMax())          // undefined

executor(twoArraysEqual, [3,5,6], [3,7,6]);

console.log("twoArraysEqual? ", twoArraysEqual([3,5,6], [3,5,6]));
console.log("twoArraysEqual? ", twoArraysEqual([3,5,6], [3,7,6]));



const fizzPrinter = (n) => {
  let res = [];
  for (i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      res.push("FizzBuzz");
    } else if (i % 3 === 0) {
      res.push("Fizz");
    } else if (i % 5 === 0) {
      res.push("Buzz");
    } else {
      res.push("" + i);
    }
  }

  return res;
}

console.log(fizzPrinter(15));

console.log("loaded");