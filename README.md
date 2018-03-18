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

console.log(new ArrayMore().


());        // ArrayMore [] // default empty value
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
new ArrayMore( 1, 2, 3, 4, 5 ).accumulate(100) // ArrayMore [ 100, 101, 103, 106, 110, 115 ]
```

## Missing Documentation

This functions exists and work. But there is not properly documentation yet. The unitary test may be the best place to see examples of how to use them.

### ArrayMore.parent

```javascript
ArrayMore.parent()
```
Some array methods native were overrides in ArrayMore. They intent to have the closest similar behavior of the native as possible. But, if you still need to access the real native code, for any reason, the parent object returns one object with all this array native methods:

```javascript
{
  concat: [Function native concat]
  copyWithin: [Function native copyWithin]
  entries: [Function native entries]
  every: [Function native every]
  fill: [Function native fill]
  filter: [Function native filter]
  find: [Function native find]
  findIndex: [Function native findIndex]
  forEach: [Function native forEach]
  includes: [Function native includes]
  indexOf: [Function native indexOf]
  join: [Function native join]
  keys: [Function native keys]
  lastIndexOf: [Function native lastIndexOf]
  map: [Function native map]
  pop: [Function native pop]
  push: [Function native push]
  reduce: [Function native reduce]
  reduceRight: [Function native reduceRight]
  reverse: [Function native reverse]
  shift: [Function native shift]
  slice: [Function native slice]
  some: [Function native some]
  sort: [Function native sort]
  splice: [Function native splice]
  unshift: [Function native unshift]
}
```
#### Example
```javascript
/* ArrayMore concat method convert Arrays to ArrayMore */
console.log( new ArrayMore([1],[2]).concat([[3]])[2] ); // ArrayMore [ 3 ]
/* Native concat method, called by using parent() did not */
console.log( new ArrayMore([1],[2]).parent().concat([[3]])[2] ); // [ 3 ]
```

### ArrayMore.copy

```javascript
ArrayMore.copy()
```
Create a copy of the array. 

#### Example

```javascript
var foo = new ArrayMore(1,2,3);
var bar = foo.copy();
var bar[1] = 200;
console.log( foo ); // ArrayMore [ 1, 2, 3]
console.log( bar ); // ArrayMore [ 1, 200, 3]
```
This is not a deep copy. So, if some attributes is an object, any change will affect both arrays.

```javascript
var oldBob = new ArrayMore({name:"bob"});
var newBob = oldBob.copy();
oldBob[0].name = "Mr. Bob";
console.log( oldBob ); // ArrayMore [ {name:"Mr. Bob"} ]
console.log( newBob ); // ArrayMore [ {name:"Mr. Bob"} ]
```

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
```javascript
ArrayMore.take(n)
```
@todo

### ArrayMore.head
```javascript
ArrayMore.head(n)
```
@todo

### ArrayMore.tail

```javascript
ArrayMore.tail(n)
```
@todo

### ArrayMore.append

```javascript
ArrayMore.append(value)
```

@todo

### ArrayMore.prepend

```javascript
ArrayMore.prepend(value)
```

@todo

### ArrayMore.has

```javascript
ArrayMore.has(value)
```
@todo

### ArrayMore.hasIndex
```javascript
ArrayMore.hasIndex(value)
```

@todo

### ArrayMore.unique
```javascript
ArrayMore.unique()
```

@todo

### ArrayMore.max
```javascript
ArrayMore.max( emptyValue = null, invalidValue = NaN )
```

@todo

### ArrayMore.min

```javascript
ArrayMore.min( emptyValue = null, invalidValue = NaN )
```

@todo

### ArrayMore.sum
```javascript
ArrayMore.sum( emptyValue = null, invalidValue = NaN )
```

@todo

### ArrayMore.avg
```javascript
ArrayMore.avg( emptyValue = null, invalidValue = NaN )
```

@todo

### ArrayMore.normalize
```javascript
ArrayMore.normalize( emptyValue = [], invalidValue = NaN )
```

@todo

### ArrayMore.integrate
```javascript
ArrayMore.integrate( c = 0, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.last
```javascript
ArrayMore.last( emptyValue = null )
```
@todo

### ArrayMore.first
```javascript
ArrayMore.first( emptyValue = null )
```

@todo

### ArrayMore.get
```javascript
ArrayMore.get( key, emptyValue = null )
```

@todo

### ArrayMore.getRotate
```javascript
ArrayMore.getRotate( key, emptyValue = null )
```

@todo

### ArrayMore.derivate
```javascript
ArrayMore.derivate( invalidValue = NaN )
```
@todo

### ArrayMore.aggregate
```javascript
ArrayMore.aggregate(
    otherArray,
    aggregateFunction    = (x, y) => x + y,
    onlyOneFoundFunction = x => x
  )
```
@todo

### ArrayMore.overlaps
```javascript
ArrayMore.overlaps(
    otherArray,
    fSearch    = (a,b) => a == b,
    fGet       = (a) => a,
    valueEmpty = null
  )
```
@todo

### ArrayMore.sqrt
```javascript
ArrayMore.sqrt( emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.round
```javascript
ArrayMore.round( precision = 0, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.map
```javascript
ArrayMore.map( callback, thisArg = undefined )
```

@todo

### ArrayMore.reduce
```javascript
ArrayMore.reduce( callback, initialValue = null )
```
@todo

### ArrayMore.replaceNaN
```javascript
ArrayMore.replaceNaN( invalidValue = NaN )
```
@todo

### ArrayMore.rotate
```javascript
ArrayMore.rotate( rotation, emptyValue, operation, invalidValue = NaN)
```
@todo

### ArrayMore.applyOperation
```javascript
ArrayMore.applyOperation( emptyValue, invalidValue, operation )
```
@todo

### ArrayMore.plus
```javascript
plus( value = 1, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.more
```javascript
more( value = 1, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.less
```javascript
ArrayMore.less( value = 1, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.times
```javascript
ArrayMore.times( value = 1, emptyValue = [], invalidValue = NaN )
```

@todo

### ArrayMore.div
```javascript
ArrayMore.div( value = 1, emptyValue = [], invalidValue = NaN )
```

@todo

### ArrayMore.squared
```javascript
ArrayMore.squared( value = 1, emptyValue = [], invalidValue = NaN )
```

@todo

### ArrayMore.pow
```javascript
ArrayMore.pow( value = 2, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.sin
```javascript
ArrayMore.sin( value = 1, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.cos
```javascript
ArrayMore.cos( value = 1, emptyValue = [], invalidValue = NaN )
```
@todo

### ArrayMore.diff
```javascript
ArrayMore.diff( otherArray )
```
@todo

### ArrayMore.errorRate
```javascript
ArrayMore.diff( errorRate )
```

@todo

### ArrayMore.flat
```javascript
ArrayMore.flat()
```
@todo

