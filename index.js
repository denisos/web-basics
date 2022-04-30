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

// classes are not hosited and must be declared before used (unlike functions)
//
class Person {
  constructor(name) {
    this.name = name;
  }
}

let Rectangle = class {
  #area;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.#area = width * height;
  }
  area() {
    return this.#area;
  }
  static name = "Rectangle"
  speak() {
    return this;
  }
}

let jane = new Person("jane")
let square = new Rectangle(10,10)
console.log("square area is: ", square.area());
console.log("square height is: ", square.height);
console.log("class static: ", Rectangle.name);
square.speak();

console.log(fizzPrinter(15));


class Cat {
  constructor(name) {
    this.name = name
  }
  speak() {
    console.log(`${this.name} speaks`)
  }
}


class Lion extends Cat {
  constructor(name) {
    super(name)
  }
  speaks() {
    super.speak();
    console.log('I\' am a lion');
  }
}

const tabby = new Cat("Tabby")
tabby.speak()

const tigger = new Lion("Tigger")
tigger.speak()

// log hashes as increasing right angled triangle
function logHashes(n) {
  let hashes = '#';
  for (let i = 1; i <= n; i++) {
    console.log(hashes)
    hashes = hashes + '#'
  }
}

logHashes(6);

function Publication(title,author,pubDate) {
  var publicAPI = {
      print() {
          console.log(`
              Title: ${ title }
              By: ${ author }
              ${ pubDate }
          `);
      }
  };

  return publicAPI;
}
const PublishAPI = Publication("Turmoil", "Woodward", "01/01/1999")
PublishAPI.print()


function range(start, end) {
  
  function buildRange(end) {
    const rangeList = [];
    for (let i = start; i <= end; i++) {
      rangeList.push(i)
    }
    return rangeList;
  }

  if (end !== undefined) return buildRange(end);

  return (end) => buildRange(end);

}
console.log(range(3,3))
console.log(range(3,8))
console.log(range(3,0))

const start3 = range(3);
console.log("start3 ", start3(9))
console.log("start3 ", start3(12))
console.log("start3 ", start3(2))


// grid
function createChessGrid(size) {
  let gridStr = '';
  for (let i = 0; i < size; i++) {
    // console.log("looping i ", gridStr)

    for (let j = 0; j < size; j++) {
      // console.log("looping j ", gridStr)
      if (i % 2 !== 0) {
        gridStr += (j % 2 !== 0) ? ' ' : '#'
      } else {
        gridStr += (j % 2 === 0) ? ' ' : '#'
      }
    

      // gridStr += (i % 2 === 0 && j % 2 !== 0) ? ' ' : '#';
    }

    gridStr +=  '\n';
  }
  return gridStr;
}

console.log(createChessGrid(8))

console.log("loaded");