# arraymore.js

A extension of the Javascript Array with super powers.

```javascript
class ArrayMore extends Array {
...
}
```
## Is the old Javascript Array - and more.

This class extends the Javascript Array. So, all the previous features are still over there. The goal is keep all the javascript methods working as usual and not change the Array class.

## General Guidelines

This project uses method chaining, call by copy and array rotation. So, if the result of the method call is an array, it should be a new array. The old array should be preserved.

### Method Chaining
```javascript
const ArrayMore = require("arraymore.js");
console.log( 
  new ArrayMore(1,2,3,4).
      plus(1).
      normalize().
      times(100).
      round()
); // ArrayMore [ 14, 21, 29, 36 ]
```
### Call by Copy
```javascript
const ArrayMore = require("arraymore.js");
var foo = new ArrayMore(1,2,3,4); // ArrayMore [ 1, 2, 3, 4 ]
var bar = foo.plus(1);            // ArrayMore [ 2, 3, 4, 5 ]
console.log( foo );               // ArrayMore [ 1, 2, 3, 4 ]
```
### Array Rotation
```javascript
const ArrayMore = require("arraymore.js");
console.log( new ArrayMore(1,2,3,4,5,6,7).plus([10,100]) ); // ArrayMore [ 11, 102, 13, 104, 15, 106, 17 ]
```
## Basic methods

This new class provides some new expected methods like head(), tail(), equals(), append(), prepend() and copy().

## Mathematic

Also, it provides some mathematical methods like sum(), max(), min(), range(), normalize(), derivate(), integrate(c), sqrt(), pow(x), times(x), plus(x) that can make more easy to write and read some mathematical transformations.

## List combinations

There are others methods like overlaps(list), diff(list), errorRate(list), aggregate(list) that intent to help the combination of two lists.

## Constructors

### From Cast
```javascript
const ArrayMore = require("arraymore.js")
var arr1to5 = [1,2,3,4,5];
var list1to5FromCast = ArrayMore.cast(arr1to5);
```
### From Arguments
```javascript
const ArrayMore = require("arraymore.js")
var list1to5FromArgs = new ArrayMore(1,2,3,4,5);
```
### From Range
```javascript
var list1to5FromRange = ArrayMore.range(1,6); // [min,max)
```
### From Transformations
```javascript
const ArrayMore = require("arraymore.js");
var list1to5FromRange2 = ArrayMore.range(5).plus(1); // [0,1,2,3,4] + 1 = [1,2,3,4,5]
```
### From Empty List more Append Methods
```javascript
const ArrayMore = require("arraymore.js");
var list1to5FromAppend = new ArrayMore().
  append(1).
  append(2).
  append(3).
  append(4).
  append(5);
```
### From Empty List more Prepend Methods
```javascript
const ArrayMore = require("arraymore.js");
var list1to5FromPrepend = new ArrayMore().
  prepend(5).
  prepend(4).
  prepend(3).
  prepend(2).
  prepend(1);
```
### They all should generate the same result
```javascript
const ArrayMore = require("arraymore.js");
console.log( list1to5FromCast.equals( arr1to5 ) );             // true
console.log( list1to5FromCast.equals( list1to5FromCast ) );    // true
console.log( list1to5FromCast.equals( list1to5FromArgs ) );    // true
console.log( list1to5FromCast.equals( list1to5FromRange ) );   // true
console.log( list1to5FromCast.equals( list1to5FromRange2 ) );  // true
console.log( list1to5FromCast.equals( list1to5FromAppend ) );  // true
console.log( list1to5FromCast.equals( list1to5FromPrepend ) ); // true
```
## Special Attention with one parameter inputs
```javascript
const ArrayMore = require("arraymore.js");

// ArrayMore [ 1 ]
var arr1 = [1];
var list1FromCastArray = ArrayMore.cast(arr1);
var list1FromCastValue = ArrayMore.cast(1);
var list1FromAppend    = new ArrayMore().append(1);
var list1FromAppend    = new ArrayMore().prepend(1);
console.log( list1FromCastArray.equals( arr1 ) );               // true
console.log( list1FromCastArray.equals( list1FromCastArray ) ); // true
console.log( list1FromCastArray.equals( list1FromAppend ) );    // true
console.log( list1FromCastArray.equals( list1FromAppend ) );    // true
```
## Special Attention with empty list inputs
```javascript
const ArrayMore = require("arraymore.js");

// Empty List
var arrEmpty3 = new Array(3);
var listEmpty3 = new ArrayMore(3);
var listEmpty3FromCast = ArrayMore.cast([undefined,undefined,undefined]);
console.log( listEmpty3.equals(arrEmpty3) ); // true
console.log( listEmpty3.equals(listEmpty3FromCast) ); // true
```
## Common Mistakes
```javascript
const ArrayMore = require("arraymore.js");

var arrValue1 = [1];           // Array [ 1 ]
var arrEmpty1 = new Array(1);  // Array [ undefined ]
console.log( arrValue1.toString() == arrEmpty1.toString() ); // false

var arrValue12 = new Array(1,2);                    // Array [ 1, 2 ]
var arrEmpty3  = new Array(1).concat(new Array(2)); // Array [ <3 empty items> ]
console.log( arrValue12.toString() == arrEmpty3.toString() ); // false

var listEmpty1 = new ArrayMore(1);                 // ArrayMore [ undefined ]
var listValue1FromCast = ArrayMore.cast(1);        // ArrayMore [ 1 ]
var listValue1FromCastArr1 = ArrayMore.cast([1]);  // ArrayMore [ 1 ]
var listValueArr1 = new ArrayMore([1]);            // ArrayMore [ [ 1 ] ]

console.log( listEmpty1.equals( listValueArr1 ) );          // false
console.log( listEmpty1.equals( listValue1FromCast ) );     // false
console.log( listEmpty1.equals( listValue1FromCastArr1 ) ); // false

console.log( listValueArr1.equals( listValue1FromCast ) );               // false
console.log( listValueArr1.equals( listValue1listValue1FromCastArr1 ) ); // false
console.log( listValueArr1.equals( listEmpty1 ) );                       // false

```
## ArrayMore where fits

This project intents to make all arrays generated from this class as also ArrayMore. So, if the expected result of any method would be an Array object, you should expected receive an ArrayMore object.

```javascript
const ArrayMore = require("arraymore.js")

console.log(ArrayMore.cast([[[1]]])[0][0]);  // ArrayMore [1]
ArrayMore.range(1).map( x => 1 )             // ArrayMore [1]
```  

## Empty Value and Invalid Value

Almost all the transformations can receive the emptyValue attribute and the invalidValue attribute. 

### Using the Empty Value

The optional empty value attribute defines what should be the result if the List is empty. The default emptyValue can change for some methods, but in general is a empty list. 

```javascript
const ArrayMore = require("arraymore.js")

console.log(new ArrayMore().abs());        // ArrayMore [] // default empty value
console.log(new ArrayMore().abs(":("));    // ":(" defined empty value
```  
### Using the Invalid Value

The optional invalidValue attribute defines what should be the value that replace invalid values. The default emptyValue is, in general, the NaN value.

```javascript
const ArrayMore = require("arraymore.js");

console.log(new ArrayMore([1,2,3,"a",5]).abs();       // ArrayMore [1,2,3,NaN,5] // default invalidValue
console.log(new ArrayMore([1,2,3,"a",5]).abs([],-1)); // ArrayMore [1,2,3,-1,5] // defined invalidValue
```

## Transformations

### ArrayMore.abs

```javascript
ArrayMore.abs( emptyValue = [], invalidValue = NaN )
```
Create a new list with all the values changed to the abs

```javascript
const ArrayMore = require("arraymore.js")

new ArrayMore( -1, -2, -3, 4, 5 ).abs()) // ArrayMore [ 1, 2, 3, 4, 5 ]
```

### ArrayMore.accumulate

```javascript
ArrayMore.accumulate( c = 0, emptyValue = [0], invalidValue = NaN )
```

Starting from the constante c (zero), add each value of the array and create a new array with size n + 1

```javascript
const ArrayMore = require("arraymore.js")

new ArrayMore( 1, 1, 1, 1, 1 ).accumulate() // ArrayMore [ 0, 1, 2, 3, 4, 5 ]
new ArrayMore( 1, 2, 3, 4, 5 ).accumulate() // ArrayMore [ 0, 1, 3, 6, 10, 15 ]
```

## Missing Documentation

This functions exists and work. But there is not properly documentation yet. The unitary test may be the best place to see examples of how to use them.

### ArrayMore.parent

```javascript
ArrayMore.parent()
```

@todo

### ArrayMore.copy

```javascript
ArrayMore.copy()
```
@todo

### ArrayMore.concat

```javascript
ArrayMore.concat( data = undefined, castNoValueToNull = false, keepHoles = false)
```
@todo

### ArrayMore.isEmptyValues

```javascript
ArrayMore.isEmptyValues()
```
@todo

### ArrayMore.isNullValues

```javascript
ArrayMore.isNullValues()
```

@todo

### ArrayMore.isUndefinedValues

```javascript
ArrayMore.isUndefinedValues()
```

@todo

### ArrayMore.equals

```javascript
ArrayMore.equals( other, anyOrder = true ) 
```

@todo

### ArrayMore.similar

```javascript
ArrayMore.similar( other, anyOrder = true ) 
```

@todo

### ArrayMore.isEmpty

```javascript
ArrayMore.isEmpty()
```
@todo

### ArrayMore.take

@todo

### ArrayMore.head

@todo

### ArrayMore.tail

@todo

### ArrayMore.append

@todo

### ArrayMore.prepend

@todo

### ArrayMore.has

@todo

### ArrayMore.hasIndex

@todo

### ArrayMore.unique

@todo

### ArrayMore.max

@todo

### ArrayMore.min

@todo

### ArrayMore.sum

@todo

### ArrayMore.avg

@todo

### ArrayMore.normalize

@todo

### ArrayMore.integrate

@todo

### ArrayMore.last

@todo

### ArrayMore.first

@todo

### ArrayMore.get

@todo

### ArrayMore.getRotate

@todo

### ArrayMore.derivate

@todo

### ArrayMore.aggregate

@todo

### ArrayMore.overlaps

@todo

### ArrayMore.sqrt

@todo

### ArrayMore.round

@todo

### ArrayMore.map

@todo

### ArrayMore.reduce

@todo

### ArrayMore.replaceNaN

@todo

### ArrayMore.rotate

@todo

### ArrayMore.applyOperation

@todo

### ArrayMore.plus

@todo

### ArrayMore.more

@todo

### ArrayMore.less

@todo

### ArrayMore.times

@todo

### ArrayMore.times

@todo

### ArrayMore.div

@todo

### ArrayMore.squared

@todo

### ArrayMore.pow

@todo

### ArrayMore.sin

@todo

### ArrayMore.cos

@todo

### ArrayMore.diff

@todo

### ArrayMore.errorRate

@todo

### ArrayMore.flat

@todo

