

function repeat(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(n)
  }
}

repeat(5, console.log)

function wrap(fn) {
  return (...args) => {
    return fn(args)
  }
}

const scripts = [
  {
    name: "coptic",
    living: false,
    size: 3
  },
  {
    name: "english",
    living: true,
    size: 5
  },
  {
    name: "tamil",
    living: true,
    size: 2
  },
  {
    name: "latin",
    living: false,
    size: 4
  }
]

scripts.filter(item => item.living)
.map(console.log)

const myFilter = (list, fn) => {
  const filtered = [];
  for (let element of list) {
    if (fn(element)) {
      filtered.push(element);
    }
  }
  return filtered
}
console.log("myfilter : ", myFilter(scripts, item => item.living))

const myReduce = (list, fn, initial) => {
  let accum = initial ?? 0;

  for (let element of list) {
    accum = fn(accum, element);
  }
  return accum;
}

const reduced = myReduce(scripts, (accum, item) => {
  accum = accum + item.size;
  return accum;
}, 10);

console.log(reduced)

// return true if fn returns true for every item in list else false
function every(list, fn) {
  if (list.length === 0) return false;

  for (let item of list) {
    if (!fn(item)) return false;
  }
  return true;

}
const isEvery = every(scripts, (script) => script.size > 0)
console.log("isEvery ", isEvery)


/*** Memoize example ******/
function add(a,b) {
  console.log("add called ", a,b)
  return a + b;
}

function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    if (args.length === 1) return args[0];

    const key = args.join('');

    if (cache.has(key)) {
      console.log("cache hit ", key)
      return cache.get(key)
    }
    const res = args.reduce((accum, curr) => fn(accum, curr), 0);
    cache.set(key, res);
    return res;
  }
}
const memoizeAdd = memoize(add);
console.log("memoize add result 300: ", memoizeAdd(100, 200))
console.log("memoize add result 4100: ", memoizeAdd(4100))
console.log("memoize add result 600: ", memoizeAdd(200, 300, 100))
console.log("memoize add result 300: ", memoizeAdd(100, 200))

/*** prototypes and more ***/

const myPerson = {
  name: "denis",
  sayHi() {
    console.log("Hi there ", this.name);
  }
}
console.log("getPrototypeOf myPerson", Object.getPrototypeOf(myPerson))
const newP = Object.create(myPerson)

newP.sayHi()

// setting prototype

const personPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  }
}

function Person(name) {
  this.name = name;
}

Person.prototype = personPrototype;
Person.prototype.constructor = Person;


console.log("********** This ***********")
function Pet(name) {
  this.name = name;
  this.getName = () => this.name;
}
const cat = new Pet('Fluffy');
console.log("cat getName: ", cat.getName()); // What is logged?  undefined
const { getName } = cat;
console.log(getName()); 


var obj = {
  count : 10,
  doSomethingLater : function (){
      setTimeout(() => { // the function executes on the window scope
          this.count++;
          console.log(this.count);
      }, 300);
  }
}

obj.doSomethingLater();


// delayed greeting
const object = {
message: 'Hello, World!',
logMessage() {
  console.log(this.message); // What is logged?
}
};
setTimeout(() => object.logMessage(), 1000);


window.ddname = "denis"
const arr1 = () => {
console.log("arr 1: ", this.ddname)
}
arr1();

function arrWrapper() {
let ddname = "wrapper deni";
const arr1 = () => {
  console.log("arr wrapper: ", this.ddname)
}
return arr1();
}
arrWrapper();

class Truck {
constructor(truck) {
  this.truck = truck
}
drive() {
  const sayDriveArr = () => {
    console.log("sayDriveArr: ", this.truck)
  }
  function sayDriveFn() {
    console.log("sayDriveFn: ", this.truck)
  }
  // sayDriveFn.call(this);
  sayDriveArr();
}
}
const myT = new Truck("peterbilt")
myT.drive();


const objectO = {
message: 'Hello, World! from ObjectO'
};
function logMessage() {
console.log(this.message); // "Hello, World!"
}
logMessage.call(objectO)
const lmBound = logMessage.bind(objectO)
lmBound();


const robject = {
who: 'World',
greet() {
  return `Hello robject, ${this.who}!`;
},
farewell() {
  const goodbyeR = () => {
    return `Goodbye robject, ${this.who}!`;
  }
  return goodbyeR();
}
};
console.log(robject.greet());    // Hello world
console.log(robject.farewell()); // goodby world

var length = 4;
function callback() {
console.log("zobject: ", this.length); // What is logged?
}
const zobject = {
length: 5,
method(callback) {
  callback()          // change to callback.call(this); to use zobject
}
};
zobject.method(callback, 1, 2);


// call/appply/bind on arrows
function addItFn() {
  return this.a + this.b;
}
const addItArr = () => this.a + this.b;
console.log("add arrow: ", addItArr());
const myObj = { a: 5, b: 9}
addItArr.call(myObj)
console.log("addItFn :", addItFn.call(myObj))


