# Arraymore.js

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
var foo = new ArrayMore(1,2,3,4); // ArrayMore [ 1, 2, 3, 4 ]
var bar = foo.plus(1);            // ArrayMore [ 2, 3, 4, 5 ]
console.log( foo );               // ArrayMore [ 1, 2, 3, 4 ]
```
### Array Rotation
```javascript
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
var arr1to5 = [1,2,3,4,5];
var list1to5FromCast = ArrayMore.cast(arr1to5);
```
### From Arguments
```javascript
var list1to5FromArgs = new ArrayMore(1,2,3,4,5);
```
### From Range
```javascript
var list1to5FromRange = ArrayMore.range(1,6); // [min,max)
```
### From Transformations
```javascript
var list1to5FromRange2 = ArrayMore.range(5).plus(1); // [0,1,2,3,4] + 1 = [1,2,3,4,5]
```
### From Empty List more Append Methods
```javascript
var list1to5FromAppend = new ArrayMore().
  append(1).
  append(2).
  append(3).
  append(4).
  append(5);
```
### From Empty List more Prepend Methods
```javascript
var list1to5FromPrepend = new ArrayMore().
  prepend(5).
  prepend(4).
  prepend(3).
  prepend(2).
  prepend(1);
```
### They all should generate the same result
```javascript
console.log( list1to5FromCast.equals( arr1to5 ) );             // true
console.log( list1to5FromCast.equals( list1to5FromCast ) );    // true
console.log( list1to5FromCast.equals( list1to5FromArgs ) );    // true
console.log( list1to5FromCast.equals( list1to5FromRange ) );   // true
console.log( list1to5FromCast.equals( list1to5FromRange2 ) );  // true
console.log( list1to5FromCast.equals( list1to5From ) );  // true
console.log( list1to5FromCast.equals( list1to5FromPrepend ) ); // true
```
## Special Attention with one parameter inputs
```javascript
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
// Empty List
var arrEmpty3 = new Array(3);
var listEmpty3 = new ArrayMore(3);
var listEmpty3FromCast = ArrayMore.cast([undefined,undefined,undefined]);
console.log( listEmpty3.equals(arrEmpty3) ); // true
console.log( listEmpty3.equals(listEmpty3FromCast) ); // true
```
## Common Mistakes
```javascript
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
console.log(ArrayMore.cast([[[1]]])[0][0]);  // ArrayMore [1]
ArrayMore.range(1).map( x => 1 )             // ArrayMore [1]
```  

## Empty Value and Invalid Value

Almost all the transformations can receive the emptyValue attribute and the invalidValue attribute. 

### Using the Empty Value

The optional empty value attribute defines what should be the result if the List is empty. The default emptyValue can change for some methods, but in general is a empty list. 

```javascript
console.log(new ArrayMore().abs());        // ArrayMore [] // default empty value
console.log(new ArrayMore().abs(":("));    // ":(" defined empty value
```  
### Using the Invalid Value

The optional invalidValue attribute defines what should be the value that replace invalid values. The default emptyValue is, in general, the NaN value.

```javascript
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
new ArrayMore( -1, -2, -3, 4, 5 ).abs()) // ArrayMore [ 1, 2, 3, 4, 5 ]
```

### ArrayMore.accumulate

```javascript
ArrayMore.accumulate( c = 0, emptyValue = [0], invalidValue = NaN )
```

Starting from the constante c (zero), add each value of the array and create a new array with size n + 1

```javascript
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

Create a new ArrayMore with elements of both arrays. Input data is cast to Arraymore using ArrayMore.cast.

#### Examples
```javascript
console.log(new ArrayMore(1,2,3).concat(new ArrayMore(4,5))); // ArrayMore [ 1, 2, 3, 4, 5 ]
console.log(ArrayMore.cast([1,2,3]).concat([4,5])); // ArrayMore [ 1, 2, 3, 4, 5 ]
console.log(ArrayMore.cast([1,2,3]).concat(4).concat(5)); // ArrayMore [ 1, 2, 3, 4, 5 ]
console.log(ArrayMore.cast([1,2,3]).concat([1,2,3])); // ArrayMore [ 1, 2, 3, 1, 2, 3 ]
```

### ArrayMore.isEmptyValues

```javascript
ArrayMore.isEmptyValues()
```
Check if all the items of the array are null, NaN, undefined or empty values.

### ArrayMore.isNullValues

```javascript
ArrayMore.isNullValues()
```

Check if all the items of the array are null values.

### ArrayMore.isUndefinedValues

```javascript
ArrayMore.isUndefinedValues()
```

Check if all the items of the array are undefined values.

### ArrayMore.equals

```javascript
ArrayMore.equals( other, anyOrder = true ) 
```
Compare if two ArrayMore arrays are equals. Do that, using deep compare. 

#### Examples
```javascript
console.log(new ArrayMore().equals([])); // true
console.log(new ArrayMore(1, [2], [[3],[[4]]]).equals([1, [2], [[3],[[4]]]])); // true
console.log(ArrayMore.cast([1,2,3,4]).equals([4,3,2,1])); // true

console.log(ArrayMore.cast([1]).equals([2])); // false
console.log(ArrayMore.cast([1,2,3,3]).equals([1,2,3,4])); // false
console.log(ArrayMore.cast([1,2,3,'4']).equals([1,2,3,4])); // false
```
When comparing objects, try to use the equals method.

```javascript

    class Example {
      constructor( x ) {
        this.x = x;
      }

      equals( otherExample ) {
        if( otherExample.constructor == Example ) {
          return ( this.x > 10 ) === ( otherExample.x > 10 );
        }
        return ( this.x > 10 ) === ( otherExample > 10 );
      }
    }

    console.log( ArrayMore.cast( [ new Example(2) ] ).equals( ArrayMore.cast( [ new Example(1) ] ) ) ); // true
    console.log( ArrayMore.cast( [ new Example(2) ] ).equals( ArrayMore.cast( [ new Example(100) ] ) ) ); // false
    console.log( ArrayMore.cast( [ new Example(200) ] ).equals( ArrayMore.cast( [ new Example(100) ] ) ) ); // true

```

### ArrayMore.similar

```javascript
ArrayMore.similar( other, anyOrder = true ) 
```

Similar to the ArrayMore.equals method but cast elements. So, '2' is similar to 2, for example.

#### Example
```javascript
console.log(ArrayMore.cast([1,2,3,'4']).equals([1,2,3,4])); // true
```

### ArrayMore.isEmpty

```javascript
ArrayMore.isEmpty()
```
True if the array has no elements.


### ArrayMore.take
```javascript
ArrayMore.take(n)
```
Create a new array with the first n elements. If n is negative returns a new array without the first n elements.

#### Example
```javascript
console.log( new ArrayMore(1,2,3,4,5).take(2) ); // ArrayMore [ 1, 2 ]
console.log( new ArrayMore(1,2,3,4,5).take(-2) ); // ArrayMore [ 3, 4, 5 ]
```

### ArrayMore.head
```javascript
ArrayMore.head(n = 10)
```
Alias to the take method with default 10.

### ArrayMore.tail

```javascript
ArrayMore.tail(n)
```
Create a new array with the last n elements. If n is negative returns a new array without the last n elements.

### ArrayMore.append

```javascript
ArrayMore.append(value)
```

Create a new array with all the previous elements more the new one received at the last position.

#### Example

```javascript
console.log( new ArrayMore(1,2,3).append(4).append(5) ); // ArrayMore [ 1, 2, 3, 4, 5 ]
```

### ArrayMore.prepend

```javascript
ArrayMore.prepend(value)
```

Create a new array with all the previous elements more the new one received at the fist position.

#### Example

```javascript
console.log( new ArrayMore(1,2,3).prepend(4).prepend(5) ); // ArrayMore [ 5, 4, 1, 2, 3 ]
```

### ArrayMore.has

```javascript
ArrayMore.has(value)
```
Returns true if find the value into the array. If the value is a function, returns true if the function is true to some element of the array.

#### Example
```javascript
console.log( new ArrayMore(1,2,3,4,5).has(3) ); // true
console.log( new ArrayMore(1,2,3,4,5).has(6) ); // false
console.log( new ArrayMore(1,2,3,4,5).has( (x) => x*x > 20) ); // true
console.log( new ArrayMore(1,2,3,4,5).has( (x) => x*x > 40) ); // false
console.log( new ArrayMore({name:"anna"},{name:"bob"}).has( n => n.name[0] === 'a' ) ); // true
```
### ArrayMore.hasIndex
```javascript
ArrayMore.hasIndex(value)
```
Similar to the ArrayMore.has, but returns the key position if found or -1 if not found.
```javascript
console.log( new ArrayMore(1,2,3,4,5).hasIndex(3) ); // 2
console.log( new ArrayMore(1,2,3,4,5).hasIndex(6) ); // -1
console.log( new ArrayMore(1,2,3,4,5).hasIndex( (x) => x*x > 20) ); // 4
console.log( new ArrayMore(1,2,3,4,5).hasIndex( (x) => x*x > 40) ); // -1
console.log( new ArrayMore({name:"anna"},{name:"bob"}).hasIndex( n => n.name[0] === 'a' ) ); // 0
```

### ArrayMore.unique
```javascript
ArrayMore.unique()
```
Create a new array with just one occurrence of every value.

#### Example
```javascript
console.log( new ArrayMore(1,2,3,1,2,4).unique() ); // ArrayMore [ 1, 2, 3, 4 ]
```

### ArrayMore.max
```javascript
ArrayMore.max( emptyValue = null, invalidValue = NaN )
```
Return the max value of the Array.
@todo

### ArrayMore.min

```javascript
ArrayMore.min( emptyValue = null, invalidValue = NaN )
```
Return the min value of the Array.


### ArrayMore.sum
```javascript
ArrayMore.sum( emptyValue = null, invalidValue = NaN )
```

Return the sum of the values of the Array.

### ArrayMore.avg
```javascript
ArrayMore.avg( emptyValue = null, invalidValue = NaN )
```

Return the average of the values of the Array.

### ArrayMore.normalize
```javascript
ArrayMore.normalize( emptyValue = [], invalidValue = NaN )
```

Return the normalized version of the values of the Array. The normalized values should keep the same proportion of the original values but the sum of the normalized values should be equals 1.

### Examples 
```javascript
console.log(new ArrayMore(1,1,2,4,8).normalize()); // ArrayMore [ 0.0625, 0.0625, 0.125, 0.25, 0.5 ]
```
### ArrayMore.integrate
```javascript
ArrayMore.integrate( c = 0, emptyValue = [], invalidValue = NaN )
```
Create a new array, with the same size of the original where every element is added by the sum of the previous one. Very similar to the ArrayMore.accumulate.

### ArrayMore.last
```javascript
ArrayMore.last( emptyValue = null )
```
Get the last element of the array or the emptyValue if not exists or undefined.

### ArrayMore.first
```javascript
ArrayMore.first( emptyValue = null )
```
Get the first element of the array or the emptyValue if not exists or undefined.

#### Examples
```javascript
console.log(new ArrayMore(1,2,3).first()); // 1
console.log(new ArrayMore(undefined,2,3).first()); // null
console.log(new ArrayMore(undefined,2,3).first(-1)); // -1
console.log(new ArrayMore().first(-1)); // -1
```
### ArrayMore.get
```javascript
ArrayMore.get( key, emptyValue = null )
```
Get any element of the array or the emptyValue if not exists or undefined.
#### Examples
```javascript
console.log(new ArrayMore(1,2,3).last()); // 3
console.log(new ArrayMore(1,2,undefined).last()); // null
console.log(new ArrayMore(1,2,undefined).last(-1)); // -1
console.log(new ArrayMore().last(-1)); // -1
```

### ArrayMore.getRotate
```javascript
ArrayMore.getRotate( key, emptyValue = null )
```
Looking to the array as a rotation values, get the value of the position.

#### Examples

```javascript
//   0, 1, 2, 3, 4, 5, 6, 7, ...   position
// [ 0, 1, 2, 3, 0, 1, 2, 3, ... ] value
console.log(new ArrayMore(0,1,2,3).getRotate(5)); // 1
```
The empty value still works to undefined values.
```javascript
//   0, 1, 2, 3, 4, 5, 6, 7, ...   position
// [ 0, 1, undefined, 3, 0, 1, undefined, 3, ... ] value
console.log(new ArrayMore(0,1,undefined,3).getRotate(6,-1)); // -1
```

### ArrayMore.derivate
```javascript
ArrayMore.derivate( invalidValue = NaN )
```
Returns one array with the discrete derivate from the original array.

derivate[0] = original[0]
derivate[n] = original[n] - original[n-1]

#### Examples
```javascript
console.log( new ArrayMore(1,2,4,8,16).derivate() ); // ArrayMore [ 1, 1, 2, 4, 8 ]
console.log( new ArrayMore(1,2,3,4,5).derivate() ); // ArrayMore [ 1, 2, 3, 4, 5 ]
```

### ArrayMore.aggregate
```javascript
ArrayMore.aggregate(
    otherArray,
    aggregateFunction    = (x, y) => x + y,
    onlyOneFoundFunction = x => x
  )
```
Used to combine informations from two arrays. This method did not rotate the values.

```javascript
console.log( new ArrayMore(1,2,3,4,5).aggregate([100,200]) ); // ArrayMore [ 101, 202, 3, 4, 5 ]
console.log( new ArrayMore(1,2,3,4,5).aggregate([100,200],(x,y)=>x*y,x => -x); // ArrayMore [ 100, 400, -3, -4, -5 ]
```

### ArrayMore.overlaps
```javascript
ArrayMore.overlaps(
    otherArray,
    fSearch    = (a,b) => a == b,
    fGet       = (a) => a,
    valueEmpty = null
  )
```
Similar to aggregate, but where you can define what should be the search function and the get value function.

#### Examples 
```javascript
var years = [1,2,3,4,5,6,7];
var data = [{x:10,y:100},{x:3,y:30},{x:5,y:50},{x:11,y:110}]
ArrayMore.cast(data).overlaps(
  years,
  (node,year) => node.x == year,
  (node) => node.y * 10,
  0
); // ArrayMore [ 0, 0, 300, 0, 500, 0, 0 ]
```

### ArrayMore.sqrt
```javascript
ArrayMore.sqrt( emptyValue = [], invalidValue = NaN )
```
### Example
```javascript
new ArrayMore(1,4,9).sqrt(); // ArrayMore [ 1, 2, 3 ]
```
### ArrayMore.round
```javascript
ArrayMore.round( precision = 0, emptyValue = [], invalidValue = NaN )
```
```javascript
new ArrayMore(1.11,2.22,3.333, 3.77, 4.89).round(1); // ArrayMore [ 1.1, 2.2, 3.3, 3.8, 4.9 ]
```
### ArrayMore.map
```javascript
ArrayMore.map( callback, thisArg = undefined )
```

The same as the native map Array function, but returns a ArrayMore instead Array.

### ArrayMore.reduce
```javascript
ArrayMore.reduce( callback, initialValue = null )
```
The same as the native map Array function, but replace by ArrayMore if the result is an Array.

### ArrayMore.replaceNaN
```javascript
ArrayMore.replaceNaN( invalidValue = NaN )
```
```javascript
new ArrayMore(1,NaN,3).replaceNaN(2); // ArrayMore [ 1, 2, 3 ]
```

### ArrayMore.rotate
```javascript
ArrayMore.rotate( rotation, emptyValue, operation, invalidValue = NaN)
```
Apply one operation in one array in rotation. Created for internal use.

### ArrayMore.applyOperation
```javascript
ArrayMore.applyOperation( emptyValue, invalidValue, operation )
```
Apply one operation in one array. Created for internal use.

### ArrayMore.plus
```javascript
plus( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
new ArrayMore(1,2,3).plus([10,100]); // ArrayMore [ 11,  102, 13 ]
```

### ArrayMore.more
```javascript
more( value = 1, emptyValue = [], invalidValue = NaN )
```
Same as ArrayMore.plus

### ArrayMore.less
```javascript
ArrayMore.less( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
new ArrayMore(10,20,30).less([1,10]); // ArrayMore [ 9, 10, 29 ]
```

### ArrayMore.times
```javascript
ArrayMore.times( value = 1, emptyValue = [], invalidValue = NaN )
```

```javascript
new ArrayMore(1,2,3,4,5,6,7,8,9,10).times([2,10]); // ArrayMore  [ 2, 20, 6, 40, 10, 60, 14, 80, 18, 100 ]
```

### ArrayMore.div
```javascript
ArrayMore.div( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
new ArrayMore(1,2,3,4,5,6,7,8,9,10).div([2,10]); // ArrayMore [ 0.5, 0.2, 1.5, 0.4, 2.5, 0.6, 3.5, 0.8, 4.5, 1 ]
```

### ArrayMore.squared
```javascript
ArrayMore.squared( value = 1, emptyValue = [], invalidValue = NaN )
```

```javascript
new ArrayMore(1,2,3,4,5,6,7,8,9,10).squared(); // ArrayMore [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
```
### ArrayMore.pow
```javascript
ArrayMore.pow( value = 2, emptyValue = [], invalidValue = NaN )
```
```javascript
new ArrayMore(1,2,3,4,5,6,7,8,9,10).pow(3); // ArrayMore [ 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000 ]
```

### ArrayMore.sin
```javascript
ArrayMore.sin( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
ArrayRange.range(10).times(Math.PI/2).sin().round(10); // ArrayMore [ 0, 1, 0, -1, -0, 1, 0, -1, -0, 1 ]
```
### ArrayMore.cos
```javascript
ArrayMore.cos( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
ArrayMore.range(10).times(Math.PI/2).cos().round(10); // ArrayMore [ 1, 0, -1, -0, 1, 0, -1, -0, 1, 0 ]
```

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

