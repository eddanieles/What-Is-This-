Window.prototype.toString = function() {
 return "I'm the window";
}
// predefined variable
var whatIsThis = function(a, b) {
   return [this, a, b].join(',')
}

var inAnObject = {
   name: 'inAnObject',
   test1: whatIsThis,
   toString: function() {
     return "I'm inAnObject"
   },
   anotherObject: {
       name: 'anotherObject',
       test2: whatIsThis,
       toString: function(){
         return "I'm anotherObject"
       }
   }
}

var inAFunction = function(a, b) {
   this.name = 'Sally'
   whatIsThis(a, b)
}

inAFunction.prototype.test3 = whatIsThis

var trickyTricky = {
   name: 'trickyTricky',
   why: 'does this work?',
   what: 'is going on here?',
   toString: function(){return "I'm tricky"}
}

var confusing = {
   name: 'confusing',
   state: 'Alaska',
   city: 'Anchorage',
   toString: function(){ return "am I confusing?"}
}

/**
 * THE PROBLEMS
 */
 /**/

console.assert(whatIsThis('hello', 'world') === "I'm the window,hello,world")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*this is referring to the entire window because whatIsThis is not bound to an object*/

console.assert(window.whatIsThis('hello', 'world') === "I'm the window,hello,world")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
 /*this is window because of how it is defined or called*/

console.assert(inAnObject.test1('face', 'book') === "I'm inAnObject,face,book")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*this is the inAnObject object*/

console.assert(inAnObject.anotherObject.test1('twitter', 'book') === "Uncaught TypeError: inAnObject.anotherObject.test1 is not a function")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*anotherObject does not have a method of test1*/

console.assert(inAnObject.anotherObject.test2('twitter', 'book') ===  "I'm anotherObject,twitter,book")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
 /*this is referring to the anotherObject object, test2 is the function whatIsThis*/

console.assert(whatIsThis.call() === "I'm the window,,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*call is not given any parameters. it is only looking at the function whatIsThis.
this is the window and nothing is given for a and b*/

console.assert(whatIsThis.call(trickyTricky) === "I'm tricky,,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
 /*it is calling the trickyTricky object however no arguments are give. The this is
 referring to the trickyTricky object and nothing is given for a and b*/

console.assert(whatIsThis.call(trickyTricky, 'nice', 'job') === "I'm tricky,nice,job")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*the whatIsThis function is calling the trickyTricky object with the arguments 'nice' and 'job'.
the this is the trickyTricky object*/

console.assert(whatIsThis.call(confusing) === "am I confusing?,,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*it is calling the confusing object however no arguments are give. The this is
referring to the confusing object and nothing is given for a and b*/

console.assert(whatIsThis.call(confusing, 'hello') === "am I confusing?,hello,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*the whatIsThis function is calling the confusing object with the argument 'hello'.
the this is the confusing object. 'hello' is a and no value is given for b*/

console.assert(whatIsThis.apply(trickyTricky) === "I'm tricky,,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*it is calling the trickyTricky object however no arguments are given in an array. The this is
referring to the trickyTricky object and nothing is given for a and b*/

console.assert(whatIsThis.apply(confusing, ['nice', 'job']) === "am I confusing?,nice,job")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*the whatIsThis function is calling the confusing object with the arguments in an array.
'nice' is a and 'job' is b. the this is the confusing object*/

console.assert(whatIsThis.apply(confusing, 'nice', 'job') === "1 Uncaught TypeError: CreateListFromArrayLike called on non-object(…)(anonymous function)")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*an error occurred because, the arguments are not given in an array form. because 'nice' and
'job' are given as arguments, the syntax broke because the apply method was looking
for the arguments in an array*/

console.assert(inAFunction('what will', 'happen?') === undefined)
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*I'm not really sure why it's returing undefined. I would assume it will
return "[object Object],what will,happen?"*/

try{
    console.assert(inAFunction.test3('A', 'B') === "inAFunction.test3 is not a function")
} catch(e){
    log(e)
}
// Once you've figured out what the output/result is, answer here in a comment: Why is this so?
/*it is throwing back an error because test.3 was added to the prototype. A constructor is not the same
thing as the object it constructs*/

var newObject = new inAFunction('what will', 'happen?')
console.assert(newObject.name === 'Sally')
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*new object is an object constructed from the inAFunction object constructor.
the this is newObject and the name value is still Sally*/

var newObject2 = new inAFunction('what will', 'happen?')
console.assert(newObject2.test3('C', 'D') === "[object Object],C,D")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*a new object is constructed from inAFunction. test3 is a method in newObject2 that looks to
the whatIsThis function. the object is newObject2 and arguments are 'C' and 'D'*/

console.assert(inAnObject.test1.call(trickyTricky, 'face', 'book') === "I'm tricky,face,book")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*inAnObject.test1 is the function whatIsThis. it is then calling to the trickyTricky object
with the arguments 'face' and 'book'.*/

console.assert(inAnObject.anotherObject.test2.apply(confusing, ['foo', 'bar']) === "am I confusing?,foo,bar")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
/*inAnObject.anotherObject.test2 is the function whatIsThis. It is then looking to the
confusing object with the arguments 'foo' and 'bar'. The this is the confusing object*/
