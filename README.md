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
This project uses method chaining, call by copy and array rotation. Also, the input data intent to be very flexible jokers accepting numbers, arrays and functions.
### Method Chaining
```javascript
> new ArrayMore(1,2,3,4).
      plus(1).
      normalize().
      times(100).
      round();
ArrayMore [ 14, 21, 29, 36 ]
```

### Call by Copy
```javascript
> var foo = new ArrayMore(1,2,3,4);
ArrayMore [ 1, 2, 3, 4 ]
> var bar = foo.plus(1);            
ArrayMore [ 2, 3, 4, 5 ]
> foo;
ArrayMore [ 1, 2, 3, 4 ]
```
### Jokers Inputs
If the input data is a number it will be cast to an array with the number
```javascript
> new ArrayMore(1,2,3,4,5,6,7).plus(100);
ArrayMore [ 101, 102, 103, 104, 105, 106, 107 ]
```
If the input data is a function. The result of that function will be cast to array.
This function can receive the parent list as parameter.
```javascript
> new ArrayMore(1,2,3,4,5).plus( list => list.times(100) );
ArrayMore [ 101, 202, 303, 404, 505, 606, 707 ]
```
### Array Rotation
If the input data is one array small than expected the cursor should go from the last element,
back to the first one and keep reading.
```javascript
> new ArrayMore(1,2,3,4,5,6,7).plus([10,100]);
ArrayMore [ 11, 102, 13, 104, 15, 106, 17 ]
> new ArrayMore(1,2,3,4,5,6,7).plus([10,100,1000]);
ArrayMore [ 11, 102, 1003, 14, 105, 1006, 17 ]
```
### Key Value Features

Creating Key Values Chaining
```javascript
> ArrayMore.range(1,10).
  asKeyOfKV( list => list.mod(3) ).
  groupKeysByValue().
  transformValues( values => {
    return {
      max:   values.max(),
      avg:   values.avg(),
      min:   values.min(),
      count: values.length
    }
  }).sortByKey("DESC");
ArrayMoreKV [
  { key: 2, value: { max: 8, avg: 5, min: 2, count: 3 } },
  { key: 1, value: { max: 7, avg: 4, min: 1, count: 3 } },
  { key: 0, value: { max: 9, avg: 6, min: 3, count: 3 } } ]

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
> var arr1to5 = [1,2,3,4,5];
Array [ 1, 2, 3, 4, 5 ]
> var list1to5FromCast = ArrayMore.cast(arr1to5);
ArrayMore [ 1, 2, 3, 4, 5 ]
```
### From Arguments
```javascript
> var list1to5FromArgs = new ArrayMore(1,2,3,4,5);
ArrayMore [ 1, 2, 3, 4, 5 ]
```
### From Range
```javascript
> var list1to5FromRange = ArrayMore.range(1,6); // [min,max)
```
### From Transformations
```javascript
// [0,1,2,3,4] + 1 = [1,2,3,4,5]
> var list1to5FromRange2 = ArrayMore.range(5).plus(1);
ArrayMore [ 1, 2, 3, 4, 5 ]

```
### From Empty List more Append Methods
```javascript
> var list1to5FromAppend = new ArrayMore().
  append(1).
  append(2).
  append(3).
  append(4).
  append(5);
ArrayMore [ 1, 2, 3, 4, 5 ]  
```
### From Empty List more Prepend Methods
```javascript
> var list1to5FromPrepend = new ArrayMore().
  prepend(5).
  prepend(4).
  prepend(3).
  prepend(2).
  prepend(1);
ArrayMore [ 1, 2, 3, 4, 5 ]  
```
### They all should generate the same result
```javascript
> list1to5FromCast.equals( arr1to5 );             
true
> list1to5FromCast.equals( list1to5FromCast );    
true
> list1to5FromCast.equals( list1to5FromArgs );    
true
> list1to5FromCast.equals( list1to5FromRange );   
true
> list1to5FromCast.equals( list1to5FromRange2 );  
true
> list1to5FromCast.equals( list1to5From );        
true
> list1to5FromCast.equals( list1to5FromPrepend );
true
```
## Special Attention with one parameter inputs
```javascript
// ArrayMore [ 1 ]
> var arr1 = [1];
> var list1FromCastArray = ArrayMore.cast(arr1);
> var list1FromCastValue = ArrayMore.cast(1);
> var list1FromAppend    = new ArrayMore().append(1);
> var list1FromAppend    = new ArrayMore().prepend(1);
> list1FromCastArray.equals( arr1 );               
true
> list1FromCastArray.equals( list1FromCastArray );
true
> list1FromCastArray.equals( list1FromAppend );    
true
> list1FromCastArray.equals( list1FromAppend );    
true
```
## Special Attention with empty list inputs
```javascript
// Empty List
> var arrEmpty3 = new Array(3);
> var listEmpty3 = new ArrayMore(3);
> var listEmpty3FromCast = ArrayMore.cast([undefined,undefined,undefined]);
> listEmpty3.equals(arrEmpty3);
true
> listEmpty3.equals(listEmpty3FromCast);
true
```
## Common Mistakes
```javascript
> var arrValue1 = [1];           
Array [ 1 ]
> var arrEmpty1 = new Array(1);  
Array [ undefined ]
> arrValue1.toString() == arrEmpty1.toString();
false
> var arrValue12 = new Array(1,2);                    
Array [ 1, 2 ]
> var arrEmpty3  = new Array(1).concat(new Array(2));
Array [ <3 empty items> ]
> console.log( arrValue12.toString() == arrEmpty3.toString() );
false
> var listEmpty1 = new ArrayMore(1);                 
ArrayMore [ undefined ]
> var listValue1FromCast = ArrayMore.cast(1);        
ArrayMore [ 1 ]
> var listValue1FromCastArr1 = ArrayMore.cast([1]);  
ArrayMore [ 1 ]
> var listValueArr1 = new ArrayMore([1]);            
ArrayMore [ [ 1 ] ]
> listEmpty1.equals( listValueArr1 );          
false
> listEmpty1.equals( listValue1FromCast );     
false
> listEmpty1.equals( listValue1FromCastArr1 );
false
> listValueArr1.equals( listValue1FromCast );               
false
> listValueArr1.equals( listValue1listValue1FromCastArr1 );
false
> listValueArr1.equals( listEmpty1 );                       
false
```
## ArrayMore where fits
This project intents to make all arrays generated from this class as also ArrayMore. So, if the expected result of any method would be an Array object, you should expected receive an ArrayMore object.
```javascript
> ArrayMore.cast([[[1]]])[0][0];  
ArrayMore [1]
> ArrayMore.range(1).map( x => 1 )
ArrayMore [1]
```  
## Empty Value and Invalid Value
Almost all the transformations can receive the emptyValue attribute and the invalidValue attribute.
### Using the Empty Value
The optional empty value attribute defines what should be the result if the List is empty. The default emptyValue can change for some methods, but in general is a empty list.
```javascript
> new ArrayMore().abs(); // default empty value
ArrayMore []
> new ArrayMore().abs(":(");    // defined empty value
":("
```  
### Using the Invalid Value
The optional invalidValue attribute defines what should be the value that replace invalid values. The default emptyValue is, in general, the NaN value.
```javascript
> new ArrayMore([1,2,3,"a",5]).abs();      // default invalidValue
ArrayMore [1,2,3,NaN,5]
> new ArrayMore([1,2,3,"a",5]).abs([],-1); // defined invalidValue
ArrayMore [1,2,3,-1,5]
```
# Methods
## ArrayMore
### ArrayMore.abs
```javascript
ArrayMore.abs( emptyValue = [], invalidValue = NaN )
```
Create a new list with all the values changed to the abs
```javascript
> new ArrayMore( -1, -2, -3, 4, 5 ).abs())
ArrayMore [ 1, 2, 3, 4, 5 ]
```
### ArrayMore.accumulate
```javascript
ArrayMore.accumulate( c = 0, emptyValue = [0], invalidValue = NaN )
```
Starting from the constante c (zero), add each value of the array and create a new array with size n + 1
```javascript
> new ArrayMore( 1, 1, 1, 1, 1 ).accumulate()
ArrayMore [ 0, 1, 2, 3, 4, 5 ]
> new ArrayMore( 1, 2, 3, 4, 5 ).accumulate(100)
ArrayMore [ 100, 101, 103, 106, 110, 115 ]
```
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
```javascript
/* ArrayMore concat method convert Arrays to ArrayMore */
> new ArrayMore([1],[2]).concat([[3]])[2];
ArrayMore [ 3 ]
/* Native concat method, called by using parent() did not */
> new ArrayMore([1],[2]).parent().concat([[3]])[2];
[ 3 ]
```
### ArrayMore.copy
```javascript
ArrayMore.copy()
```
Create a copy of the array.

```javascript
> var foo = new ArrayMore(1,2,3);
> var bar = foo.copy();
> var bar[1] = 200;
> foo;
ArrayMore [ 1, 2, 3]
> bar;
ArrayMore [ 1, 200, 3]
```
This is not a deep copy. So, if some attributes is an object, any change will affect both arrays.
```javascript
> var oldBob = new ArrayMore({name:"bob"});
> var newBob = oldBob.copy();
> oldBob[0].name = "Mr. Bob";
> oldBob;
ArrayMore [ {name:"Mr. Bob"} ]
> newBob;
ArrayMore [ {name:"Mr. Bob"} ]
```
### ArrayMore.concat
```javascript
ArrayMore.concat( data = undefined, castNoValueToNull = false, keepHoles = false)
```
Create a new ArrayMore with elements of both arrays. Input data is cast to Arraymore using ArrayMore.cast.
```javascript
> new ArrayMore(1,2,3).concat(new ArrayMore(4,5));
ArrayMore [ 1, 2, 3, 4, 5 ]
> ArrayMore.cast([1,2,3]).concat([4,5]);           
ArrayMore [ 1, 2, 3, 4, 5 ]
> ArrayMore.cast([1,2,3]).concat(4).concat(5);     
ArrayMore [ 1, 2, 3, 4, 5 ]
> ArrayMore.cast([1,2,3]).concat([1,2,3]);         
ArrayMore [ 1, 2, 3, 1, 2, 3 ]
> ArrayMore.cast([1,2,3]).concat( l => l);         
ArrayMore [ 1, 2, 3, 1, 2, 3 ]
> ArrayMore.cast([1,2,3]).concat( l => l.reverse() );         
ArrayMore [ 1, 2, 3, 3, 2, 1 ]
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
```javascript
> new ArrayMore().equals([]);
true
> new ArrayMore(1, [2], [[3],[[4]]]).equals([1, [2], [[3],[[4]]]]);
true
> ArrayMore.cast([1,2,3,4]).equals([4,3,2,1]);
true
> ArrayMore.cast([1]).equals([2]);
false
> ArrayMore.cast([1,2,3,3]).equals([1,2,3,4]);
false
> ArrayMore.cast([1,2,3,'4']).equals([1,2,3,4]);
false
```
When comparing objects, try to use the equals method.
```javascript
> class Example {
>   constructor( x ) {
>     this.x = x;
>   }
>         equals( otherExample ) {
>     if( otherExample.constructor == Example ) {
>       return ( this.x > 10 ) === ( otherExample.x > 10 );
>     }
>     return ( this.x > 10 ) === ( otherExample > 10 );
>   }
> }
> ArrayMore.cast( [ new Example(2) ] ).equals( ArrayMore.cast( [ new Example(1) ] ) );
true
> ArrayMore.cast( [ new Example(2) ] ).equals( ArrayMore.cast( [ 1 ] ) );
true
> ArrayMore.cast( [ new Example(2) ] ).equals( ArrayMore.cast( [ new Example(100) ] ) );
false
> ArrayMore.cast( [ new Example(200) ] ).equals( ArrayMore.cast( [ new Example(100) ] ) );
true
> ArrayMore.cast( [ 200 ] ).equals( ArrayMore.cast( [ new Example(100) ] ) );
true
```
### ArrayMore.similar
```javascript
ArrayMore.similar( other, anyOrder = true )
```
Similar to the ArrayMore.equals method but cast elements. So, '2' is similar to 2, for example.

```javascript
> ArrayMore.cast([1,2,3,'4']).similar([1,2,3,4]);
true
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

```javascript
> new ArrayMore(1,2,3,4,5).take(2);  
ArrayMore [ 1, 2 ]
> new ArrayMore(1,2,3,4,5).take(-2);
ArrayMore [ 3, 4, 5 ]
```
### ArrayMore.head
```javascript
ArrayMore.head(n = 10)
```
Alias to the ArrayMore.take method with default 10.
```javascript
> ArrayMore.range(100).head();       
ArrayMore [ 0, 1, 2, ..., 9 ]
> new ArrayMore(1,2,3,4,5).head(2);  
ArrayMore [ 1, 2 ]
> ArrayMore(1,2,3,4,5).head(-2);     
ArrayMore [ 3, 4, 5 ]
```
### ArrayMore.tail
```javascript
ArrayMore.tail(n)
```
```javascript
> new ArrayMore(1,2,3,4,5).tail(2);  
ArrayMore [ 4, 5 ]
> new ArrayMore(1,2,3,4,5).tail(-2);
ArrayMore [ 1, 2, 3 ]
```
Create a new array with the last n elements. If n is negative returns a new array without the last n elements.
### ArrayMore.append
```javascript
ArrayMore.append(value)
```
Create a new array with all the previous elements more the new one received at the last position.

```javascript
> new ArrayMore(1,2,3).append(4).append(5);
ArrayMore [ 1, 2, 3, 4, 5 ]
```
### ArrayMore.prepend
```javascript
ArrayMore.prepend(value)
```
Create a new array with all the previous elements more the new one received at the fist position.

```javascript
> new ArrayMore(1,2,3).prepend(4).prepend(5);
ArrayMore [ 5, 4, 1, 2, 3 ]
```
### ArrayMore.has
```javascript
ArrayMore.has(value)
```
Returns true if find the value into the array. If the value is a function, returns true if the function is true to some element of the array.

```javascript
> new ArrayMore(1,2,3,4,5).has(3);
true
> new ArrayMore(1,2,3,4,5).has(6);
false
> new ArrayMore(1,2,3,4,5).has( (x) => x*x > 20);
true
> new ArrayMore(1,2,3,4,5).has( (x) => x*x > 40);
false
> new ArrayMore({name:"anna"},{name:"bob"}).has( n => n.name[0] === 'a' );
true
```
### ArrayMore.hasIndex
```javascript
ArrayMore.hasIndex(value)
```
Similar to the ArrayMore.has, but returns the key position if found or -1 if not found.
```javascript
> new ArrayMore(1,2,3,4,5).hasIndex(3);
2
> new ArrayMore(1,2,3,4,5).hasIndex(6);
-1
> new ArrayMore(1,2,3,4,5).hasIndex( (x) => x*x > 20);
4
> new ArrayMore(1,2,3,4,5).hasIndex( (x) => x*x > 40);
-1
> new ArrayMore({name:"anna"},{name:"bob"}).hasIndex( n => n.name[0] === 'a' );
0
```
### ArrayMore.unique
```javascript
ArrayMore.unique()
```
Create a new array with just one occurrence of every value.

```javascript
> new ArrayMore(1,2,3,1,2,4).unique();
ArrayMore [ 1, 2, 3, 4 ]
```
### ArrayMore.max
```javascript
ArrayMore.max( emptyValue = null, invalidValue = NaN )
```
Return the max value of the Array.
```javascript
> ArrayMore.cast([1,2,3,10,4]).max();
10
```
### ArrayMore.min
```javascript
ArrayMore.min( emptyValue = null, invalidValue = NaN )
```
Return the min value of the Array.
```javascript
> ArrayMore.cast([1,2,3,-10,4]).min();
-10
```
### ArrayMore.sum
```javascript
ArrayMore.sum( emptyValue = null, invalidValue = NaN )
```
Return the sum of the values of the Array.
```javascript
> ArrayMore.cast([1,2,3,4]).sum();
10
```
### ArrayMore.avg
```javascript
ArrayMore.avg( emptyValue = null, invalidValue = NaN )
```
Return the average of the values of the Array.
```javascript
> ArrayMore.cast([1,2,3,4,5]).avg();
3
```
### ArrayMore.normalize
```javascript
ArrayMore.normalize( area, emptyValue = [], invalidValue = NaN )
```
Return the normalized version of the values of the Array. The normalized values should keep the same proportion of the original values but the sum of the normalized values should be equals the area( default 1).
```javascript
/* simple normalization */
> new ArrayMore(1,1,2,4,8).normalize();
ArrayMore [ 0.0625, 0.0625, 0.125, 0.25, 0.5 ]
/* normalization by value */
> new ArrayMore(1,1,2,4,8).normalize(100);
ArrayMore [ 6.25, 6.25, 12.5, 25, 50 ]
```
Normalize method uses joker values. So, the input value can be a number, or an array or a function.
Although, the result of normalization from one array loses a lot of its meaning.
```javascript
/* normalization using an array as input - strange? sure. But it your life */
> new ArrayMore(1,1,2,4,8).normalize([1,100]);
ArrayMore [ 0.0625, 6.25, 0.125, 25, 0.5 ]
```

When the value is a function, it should receive the parent list as parameter.
The return of this function can also be a value or an array.
This is special useful to make normalization based in some relative list value.
```javascript
/* normalization by relative values of the list */

// identity operation - returns the original list //
> new ArrayMore(1, 1, 2, 4, 8).normalize(l => l.sum());
ArrayMore [ 1, 1, 2, 4, 8 ]

// normalize by the max value - max becomes 1 //
> new ArrayMore(1, 1, 2, 4, 8).normalize(l => l.sum() / l.max() );
ArrayMore [ 0.125, 0.125, 0.25, 0.5, 1 ]

// normalize by the average value - average becomes 1 //
> new ArrayMore(1, 1, 2, 4, 8).normalize(l => l.sum() / l.avg() );
ArrayMore [ 0.3125, 0.3125, 0.625, 1.25, 2.5 ]

// normalize by the min value - min becomes 1 //
> new ArrayMore(100, 100, 200, 400, 800).normalize(l => l.sum() / l.min() );
ArrayMore [ 1, 1, 2, 4, 8 ]
> new ArrayMore(0.3125, 0.3125, 0.625, 1.25, 2.5).normalize(l => l.sum() / l.min() );
ArrayMore [ 1, 1, 2, 4, 8 ]

// some other uncommon case that you may like
> new ArrayMore(1, 1, 2, 4, 8).normalize(l => l.reverse());;
ArrayMore [ 0.5, 0.25, 0.25, 0.25, 0.5 ]
> new ArrayMore(1, 1, 2, 4, 8).normalize(l => l);
ArrayMore [ 0.0625, 0.0625, 0.25, 1, 4 ]
```
ArrayMore.range(1,5).normalize( l => l.sum() / l.max()  )
### ArrayMore.integrate
```javascript
ArrayMore.integrate( c = 0, dx=1, emptyValue = [], invalidValue = NaN )
```
Create a new array, with the same size of the original where every element is added by the sum of the previous one. Very similar to the ArrayMore.accumulate.
The dx attribute is an joker value. So, it can be an number, array or function.

```javascript
> ArrayMore.cast([1,1,1,1,1]).integrate();
ArrayMore [ 1, 2, 3, 4, 5 ]
> ArrayMore.cast([1,1,1,1,1]).integrate(100);
ArrayMore [ 101, 102, 103, 104, 105 ]
> ArrayMore.cast([1,1,1,1,1]).integrate(0,[1,2]);
ArrayMore [ 1, 2, 3, 4, 5 ]
> ArrayMore.cast([1,1,1,1,1]).integrate(0,[1,100]);
ArrayMore [ 1, 101, 102, 202, 203 ]

// something funny..
> ArrayMore.cast([1,1,1,1,1]).integrate(0, l => l.integrate() );
ArrayMore [ 1, 3, 6, 10, 15 ]
> ArrayMore.cast([1,2,5,10,15]).integrate(0, l => l.derivate() );
ArrayMore [ 1, 3, 18, 68, 143 ]
```

If the c is not an number, but a function or array, then the integrated values are going to be append after the c

```javascript
> ArrayMore.cast([1,1,1,1,1]).integrate([0,0,0]);
ArrayMore [ 0, 0, 1, 2, 3, 4, 5 ]
```

### ArrayMore.last
```javascript
ArrayMore.last( emptyValue = null )
```
Get the last element of the array or the emptyValue if not exists or undefined.

```javascript
> new ArrayMore(1,2,3).last();
3
> new ArrayMore(1,2,undefined).last();
null
> new ArrayMore(1,2,undefined).last(-1);
-1
> new ArrayMore().last(-1);
-1
```

### ArrayMore.first
```javascript
ArrayMore.first( emptyValue = null )
```
Get the first element of the array or the emptyValue if not exists or undefined.
```javascript
> new ArrayMore(1,2,3).first();
1
> new ArrayMore(undefined,2,3).first();
null
> new ArrayMore(undefined,2,3).first(-1);
-1
> new ArrayMore().first(-1);
-1
```
### ArrayMore.get
```javascript
ArrayMore.get( key, emptyValue = null )
```
Get any element of the array or the emptyValue if not exists or undefined.
```javascript
> new ArrayMore(1,2,3).get(2);
3
> new ArrayMore(1,2,undefined).get(2);
null
> new ArrayMore(1,undefined,3).get(1,-1);
-1
> new ArrayMore().get(10,-1);
-1
```
### ArrayMore.getRotate
```javascript
ArrayMore.getRotate( key, emptyValue = null )
```
Looking to the array as a rotation values, get the value of the position.

```javascript
//   0, 1, 2, 3, 4, 5, 6, 7, ...   position
// [ 0, 1, 2, 3, 0, 1, 2, 3, ... ] value
> new ArrayMore(0,1,2,3).getRotate(5);
1
```
The empty value still works to undefined values.
```javascript
//   0, 1, 2, 3, 4, 5, 6, 7, ...   position
// [ 0, 1, undefined, 3, 0, 1, undefined, 3, ... ] value
> new ArrayMore(0,1,undefined,3).getRotate(6,-1);
-1
```
### ArrayMore.derivate
```javascript
ArrayMore.derivate( invalidValue = NaN )
```
Returns one array with the discrete derivate from the original array.
derivate[0] = original[0]
derivate[n] = original[n] - original[n-1]
```javascript
> new ArrayMore(1,2,4,8,16).derivate();
ArrayMore [ 1, 1, 2, 4, 8 ]
> new ArrayMore(1,2,3,4,5).derivate();  
ArrayMore [ 1, 2, 3, 4, 5 ]
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
> new ArrayMore(1,2,3,4,5).aggregate([100,200]);
ArrayMore [ 101, 202, 3, 4, 5 ]
> new ArrayMore(1,2,3,4,5).aggregate([100,200],(x,y)=>x*y,x => -x);
ArrayMore [ 100, 400, -3, -4, -5 ]
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

```javascript
> var years = [1,2,3,4,5,6,7];
> var data = [{x:10,y:100},{x:3,y:30},{x:5,y:50},{x:11,y:110}]
> ArrayMore.cast(data).overlaps(
>   years,
>   (node,year) => node.x == year,
>   (node) => node.y * 10,
>   0
> );
ArrayMore [ 0, 0, 300, 0, 500, 0, 0 ]
```
### ArrayMore.sqrt
```javascript
ArrayMore.sqrt( emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1,4,9).sqrt();
ArrayMore [ 1, 2, 3 ]
```
### ArrayMore.round
```javascript
ArrayMore.round( precision = 0, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1.11,2.22,3.333, 3.77, 4.89).round(1);
ArrayMore [ 1.1, 2.2, 3.3, 3.8, 4.9 ]
```
### ArrayMore.map
```javascript
ArrayMore.map( callback, thisArg = undefined )
```
The same as the native map Array function, but returns a ArrayMore instead Array.
```javascript
> ArrayMore.range(10).map( (x,k,p) => p.copy().more(x) )
ArrayMore [
  ArrayMore [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  ArrayMore [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
  ArrayMore [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
  ArrayMore [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
  ArrayMore [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
  ArrayMore [ 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
  ArrayMore [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ],
  ArrayMore [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ],
  ArrayMore [ 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
  ArrayMore [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]
]
```
```javascript
> ArrayMore.range(10).map( x => ( x + 3 ) / 2 )
ArrayMore [ 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6 ]
```
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
> new ArrayMore(1,NaN,3).replaceNaN(2);
ArrayMore [ 1, 2, 3 ]
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
> new ArrayMore(1,2,3).plus([10,100]);
ArrayMore [ 11,  102, 13 ]
```
### ArrayMore.more
```javascript
more( value = 1, emptyValue = [], invalidValue = NaN )
```
Alias to ArrayMore.plus
### ArrayMore.less
```javascript
ArrayMore.less( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(10,20,30).less([1,10]);
ArrayMore [ 9, 10, 29 ]
```
### ArrayMore.times
```javascript
ArrayMore.times( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1,2,3,4,5,6,7,8,9,10).times([2,10]);
ArrayMore  [ 2, 20, 6, 40, 10, 60, 14, 80, 18, 100 ]
```
### ArrayMore.div
```javascript
ArrayMore.div( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1,2,3,4,5,6,7,8,9,10).div([2,10]);
ArrayMore [ 0.5, 0.2, 1.5, 0.4, 2.5, 0.6, 3.5, 0.8, 4.5, 1 ]
```
### ArrayMore.squared
```javascript
ArrayMore.squared( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1,2,3,4,5,6,7,8,9,10).squared();
ArrayMore [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
```
### ArrayMore.pow
```javascript
ArrayMore.pow( value = 2, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1,2,3,4,5,6,7,8,9,10).pow(3);
ArrayMore [ 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000 ]
```
### ArrayMore.mod
```javascript
ArrayMore.mod( value = 2, emptyValue = [], invalidValue = NaN )
```
```javascript
> new ArrayMore(1,2,3,4,5,6,7,8,9,10).mod(3);
ArrayMore [ 1, 2, 0, 1, 2, 0, 1, 2, 0, 1 ]
```
### ArrayMore.sin
```javascript
ArrayMore.sin( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
> ArrayRange.range(10).times(Math.PI/2).sin().round(10);
ArrayMore [ 0, 1, 0, -1, -0, 1, 0, -1, -0, 1 ]
```
### ArrayMore.cos
```javascript
ArrayMore.cos( value = 1, emptyValue = [], invalidValue = NaN )
```
```javascript
> ArrayMore.range(10).times(Math.PI/2).cos().round(10);
ArrayMore [ 1, 0, -1, -0, 1, 0, -1, -0, 1, 0 ]
```
### ArrayMore.diff
```javascript
ArrayMore.diff( otherArray )
```
Get the difference from two arrays without rotate. In case of missing pair, returns the value of the single element.
```javascript
> ArrayMore.cast([1,2,3,4,5]).diff([100,200]);
ArrayMore [ -99, -198, 3, 4, 5 ]
```
If you want the difference with rotation, just use the ArrayMore.less method.
```javascript
> ArrayMore.cast([1,2,3,4,5]).less([100,200]);
ArrayMore [ -99, -198, -97, -196, -95 ]
```
### ArrayMore.errorRate
```javascript
ArrayMore.diff( errorRate )
```
The errorRate is the squared difference of the array values. It does not rotate. The errorRate to missing values is the single value squared.
```javascript
> ArrayMore.range(10).errorRate(new ArrayMore(10).fill(1));
ArrayMore [ 1, 0, 1, 4, 9, 16, 25, 36, 49, 64 ]
> ArrayMore.range(10).errorRate(new ArrayMore(9).fill(4));
ArrayMore [ 16, 9, 4, 1, 0, 1, 4, 9, 16, 81 ]
```
If you want something similar to the errorRate but that rotates, you can do that using the regular methods:
```javascript
> ArrayMore.range(10).less(new ArrayMore(9).fill(4) ).squared();
ArrayMore [ 16, 9, 4, 1, 0, 1, 4, 9, 16, 25 ]
```
### ArrayMore.flat
```javascript
ArrayMore.flat(deep=false)
```
Convert every array to its elements.

```javascript
> var example = ArrayMore.cast([[1],[[2]],[[[3]]]]);
ArrayMore [
  ArrayMore [ 1 ],
  ArrayMore [
    ArrayMore [ 2 ]
  ],
  ArrayMore [
    ArrayMore [
      ArrayMore [ 3 ]
    ]
  ]
]
> example.flat();
ArrayMore [ 1, ArrayMore [ 2 ], ArrayMore [ ArrayMore [ 3 ] ] ]
> example.flat().flat();
ArrayMore [ 1, 2, ArrayMore [ 3 ] ]
> example.flat().flat().flat();
ArrayMore [ 1, 2, 3 ]
> example.flat().flat().flat().flat();
ArrayMore [ 1, 2, 3 ]
> example.flat(true);
ArrayMore [ 1, 2, 3 ]
```
## ArrayMoreKV

### Constructors

#### ArrayMore.asKeyOfKV
```javascript
> ArrayMore.range(0,5).asKeyOfKV( l => l.times(3) )
ArrayMoreKV [
  { key: 0, value: 0 },
  { key: 1, value: 3 },
  { key: 2, value: 6 },
  { key: 3, value: 9 },
  { key: 4, value: 12 } ]
```
#### ArrayMore.asValueOfKV
```javascript
ArrayMore.range(0,5).asValueOfKV( l => l.times(3) )
ArrayMoreKV [
  { key: 0, value: 0 },
  { key: 3, value: 1 },
  { key: 6, value: 2 },
  { key: 9, value: 3 },
  { key: 12, value: 4 } ]
```
#### ArrayMore.asContextOfKV

```javascript
> ArrayMore.range(0,5).asContextOfKV( l => l.more(10), l => l.times(3) )
ArrayMoreKV [
  { key: 10, value: 0 },
  { key: 11, value: 3 },
  { key: 12, value: 6 },
  { key: 13, value: 9 },
  { key: 14, value: 12 } ]
```

#### ArrayMore.asKV

```javascript
 > ArrayMore.range(0,5).asKV( v => v % 2 )
 ArrayMoreKV [
  { key: 0, value: 0 },
  { key: 1, value: 1 },
  { key: 0, value: 2 },
  { key: 1, value: 3 },
  { key: 0, value: 4 } ]
```

```javascript
 > ArrayMore.range(0,5).asKV( k => k + 100, v => v * 10 )
ArrayMoreKV [
  { key: 100, value: 0 },
  { key: 101, value: 10 },
  { key: 102, value: 20 },
  { key: 103, value: 30 },
  { key: 104, value: 40 } ]
```

### ArrayMoreKV.append                
Same behavior of ArrayMore.append

### ArrayMoreKV.copy                  
Same behavior of ArrayMore.copy

### ArrayMoreKV.equals                
Same behavior of ArrayMore.equals

### ArrayMoreKV.has                   
Same behavior of ArrayMore.has

### ArrayMoreKV.hasIndex              
Same behavior of ArrayMore.hasIndex

### ArrayMoreKV.head
Same behavior of ArrayMore.head

### ArrayMoreKV.isEmpty               
Same behavior of ArrayMore.isEmpty

### ArrayMoreKV.isEmptyValues         
Same behavior of ArrayMore.isEmptyValues

### ArrayMoreKV.isNullValues          
Same behavior of ArrayMore.isNullValues

### ArrayMoreKV.isUndefinedValues     
Same behavior of ArrayMore.isUndefinedValues

### ArrayMoreKV.parent                
Same behavior of ArrayMore.parent

### ArrayMoreKV.prepend               
Same behavior of ArrayMore.prepend

### ArrayMoreKV.similar
Same behavior of ArrayMore.similar

### ArrayMoreKV.tail                  
Same behavior of ArrayMore.tail

### ArrayMoreKV.take                  
Same behavior of ArrayMore.take

### ArrayMoreKV.unique                
Same behavior of ArrayMore.unique

### ArrayMoreKV.aggregate

Combine two KeyValue Arrays. Similar behavior of ArrayMore.aggregate

### ArrayMoreKV.countRowsByFunc

Count the total of rows based on the function result.

### ArrayMoreKV.countRowsByKey

Count the total of rows with the same key.

### ArrayMoreKV.countRowsByValue      

Count the total of rows with the same value.

### ArrayMoreKV.findIndexKey

Search for some key and returns the position of the first found.

### ArrayMoreKV.findIndexValue        

Search for some value and returns the position of the first found.

### ArrayMoreKV.findRowByKey

Search for some key and returns the row of the first found.

### ArrayMoreKV.findRowByValue

Search for some value and returns the row of the first found.

### ArrayMoreKV.flip

Convert keys in values and values in keys.

### ArrayMoreKV.getKeys

Extract the keys of the ArrayMoreKV.

### ArrayMoreKV.getValues             

Extract the values of the ArrayMoreKV.

### ArrayMoreKV.groupKeysByValue

Group the keys from rows that have the same value.

### ArrayMoreKV.groupRowsByFunc

Group the rows that have the same function result.

### ArrayMoreKV.groupValuesByKey

Group the values from rows that have the same key.
 
### ArrayMoreKV.normalizeKeys         

Normalize the keys. Similar to the ArrayMore.normalize.

### ArrayMoreKV.normalizeValues

Normalize the values. Similar to the ArrayMore.normalize.

### ArrayMoreKV.sortByKey

Sort the array by the key.

### ArrayMoreKV.sortByValue

sort the array by the value.

### ArrayMoreKV.sumKeysByValue

Sum the key of the rows with the same value.

### ArrayMoreKV.sumValuesByKey        

Sum the values of the rows with the same key.

### ArrayMoreKV.transformKeys

Apply one function that changes the array of keys.

### ArrayMoreKV.transformValues       

Apply one function that changes the array of values.

### ArrayMoreKV.union 

Create a new ArrayMoreKV with the union of two ArrayMoreKV.
