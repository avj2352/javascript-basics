# Javascript 101

# Important Links
- [Javascript's `this` in Global Context](https://egghead.io/lessons/javascript-this-in-the-global-context)


# Javascript's `this` - all you need to know

- in a plain javascript browser - `this` is always equal to `window`.
- the same is true, even if you use `strict` mode.
```js
"use strict";
this === window
true
```
- In `node`, `this` is equal to the `global` object.
    -  HOWEVER, that is only true within the `NODE REPL`
```js
>node 
this === global
true
```
- In the `node_module` context `this` is NOT equal to `global`
    - In `node_module`, `this` is equal to `module.exports`

```js
console.log(this === module.exports);
```
- While declaring a normal function and then checking the `this` inside a `function`
    - this === global
```js
function func(){
    console.log(this === global);
}

func();
```
- If we are in `strict mode` a plain function call will set the `this` within the function as `undefined`

```js
'use strict';

function func(){
    console.log(this === undefined);
}
func();
```

> REMEMBER: It doesnt depend if the `call-stack` was in `strict` mode. It depends if the function call was in `strict` mode.

It matters because, if you are writing your code in strict mode and a third party library is not, or vice versa.

- The problem of not defining using strict mode, is when you use function as variable declarartions.

```js
function Person (firstName, lastName){
    this.firstName = firstName; //it will not assign to this, it will assign to the global object
    this.lastName = lastName; // Same case here, this is a problem if we are using strict mode.
}//end:Person 

const pramod = Person('Pramod','Jingade');
console.log(pramod.firstName); //returns undefined
console.log(pramod.lastName); //returns undefined

console.log(global.firstName); //returns Pramod
console.log(global.lastName); //returns Jingade
```
- `global.firstName` and `global.lastName` are what we refer to as GLOBAL variables

We can prevent this by using `strict mode`

```js
'use strict';

function Person (firstName, lastName){
    this.firstName = firstName; //it will not assign to this, it will assign to the global object
    this.lastName = lastName; // Same case here, this is a problem if we are using strict mode.
}//end:Person 

const pramod = Person('Pramod','Jingade'); // If we call this way, then it will return undefined
console.log(pramod.firstName); //returns undefined
console.log(pramod.lastName); //returns undefined

const pramod = new Person('Pramod','Jingade'); // If we use the new keyword, then it will work
console.log(pramod.firstName); //returns undefined
console.log(pramod.lastName); //returns undefined

```

## step by step how the `this` keyword works

```js
function Person (firstName, lastName) {
    console.log(this);
    this.firstName = firstName;
    console.log(this);
    this.lastName = lastName;
    console.log(this);
}//end:Person

const person = new Person('Pramod','Jingade');
```

What is the difference between using `new` and just calling the function
|Without using `new` keyword | Using `new` keyword|
|:---------------------------|--------------------:|
|there will an invisible `return null` inside the function, if invoked `without` the new keyword | there will be an invisible `return this` inside the function, if invoked using the `new` keyword|

> without the `new` keyword

```js
function Person (firstName, lastName) {
    console.log(this);
    this.firstName = firstName;
    console.log(this);
    this.lastName = lastName;
    console.log(this);
    //return null;
}//end:Person

const person = Person('Pramod','Jingade');
```
> using the `new` keyword
```js
function Person (firstName, lastName) {
    console.log(this);
    this.firstName = firstName;
    console.log(this);
    this.lastName = lastName;
    console.log(this);
    //return this;
}//end:Person

const person = new Person('Pramod','Jingade');
```

>IMPORTANT: If we use, the `new` keyword and force the function to return `null`. Then javascript will ignore the return null and returns the default object. that's the power of the `new` keyword

```js
function Person (firstName, lastName) {
    console.log(this);
    this.firstName = firstName;
    console.log(this);
    this.lastName = lastName;
    console.log(this);
    return null; // if we are using new keyword, then this return is ignored.
}//end:Person

const person = new Person('Pramod','Jingade');
console.log(person); //This will still show as {Pramod, Jingade}, return null is ignored.
```

# Use of `this` in method calls

The below code will work. the context will be the immediate receiver of the object
> NOTE: For `this` to work, you need to  attach it to a `property`
> NOTE: As long as you call the same object reference, your function will work
> NOTE: The problem is when you assign the method of your obj to another variable.

```js
const person = {
    firstName: 'Pramod',
    sayHi : function(){
        console.log(`Hi, my name is: ${this.firstName}`); //This will work since you have bound it to the obj's ppty
    }
}

const greet = person.sayHi();
greet(); // This will work
```

> However, if the function is not bound inside the object, then the default context `global` is selected

```js
const person = {
    firstName: 'Pramod',
    sayHi(){
        console.log(`Hi, my name is: ${this.firstName}`); //This will work since you have bound it to the obj's ppty
    }
}

const greet = person.sayHi();
greet(); // This will throw an error as you are assigning the method to another variable.
```

# Using call() and apply() method

> `call()` and `apply()` is a function prototype i.e., available only to functions.
> `call()` will work with `variable declared function` and `function declaration` also

```js
funciton sayHi(){
    console.log(`hi, my name is ${this.firstName}`);
}//end:sayHi

const person = {
    firstName:'Pramod',
    lastName:'Jingade'
};

sayHi.call(person);
```

> Usage

```js
const numbers = [10,20,30,40,50];

const slice1 = numbers.slice(1,4);
const slice2 = numbers.slice.call(numbers,1,4); // Call format
const slice3 = numbers.slice.apply(numbers,[1,4]); // Apply format

console.log(slice1);
console.log(slice2);
console.log(slice2);
```

# Deconstructing the .bind() function

```js
Function.prototype.bind = function(thisArg,...fixedArgs){
    const func = this;
    return func(..args){
        return func.apply(thisArg,[...fixedArgs, ...args]);
    }
}//end: bind prototype function
```

