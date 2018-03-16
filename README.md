# arraymore.js

A extension of the Javascript Array with super powers.

## All the oll Javascript Array

This class extends the Javascript Array. So, all the previous features are still over there. The goal is keep all the javascript methods working as usual.

## Basic methods

This new class provides some new expected methods like head(), tail(), equals(), append(), prepend() and copy().

## Mathematic

Also, it provides some mathematical methods like sum(), max(), min(), range(), normalize(), derivate(), integrate(c), sqrt(), pow(x), times(x), plus(x) that can make more easy to write and read some mathematical transformations.

## List combinations

There are others methods like overlaps(list), diff(list), errorRate(list), aggregate(list) that intent to help the combination of two lists.

```javascript
    const List = require("arraymore.js")
    List.
      /* [1,2...10] */
      range(10).
      /* ArrayList [0.18181818181818182, 0.16363636363636364, ... , 0.01818181818181818 ] */
      normalize().
      /* native filter */
      filter(
        /*  filter elements bigger than the average of the list */
        (value , key, list) => v > list.avg()
      ).
      /*  sum the value of the list */
      sum();
```

```javascript
    const List = require("arraymore.js")
    new List(1,5,3,6,3,8,2,3,7).
        normalize().
        sqrt().
        derivate().
        times(100).
        sort().
        head(5).
        integrate()
```

## Constructors

### From Cast
```javascript
  const List = require("arraymore.js")
  var arr1to5 = [1,2,3,4,5];
  var list1to5FromCast = List.cast(arr1to5);
```
### From Arguments
```javascript
  const List = require("arraymore.js")
  var list1to5FromArgs = new List(1,2,3,4,5);
```
### From Range
```javascript
  var list1to5FromRange = List.range(1,6); // [min,max)
```
### From Transformations
```javascript
  var list1to5FromRange2 = List.range(5).plus(1); // [0,1,2,3,4] + 1 = [1,2,3,4,5]
```
### From Empty List more Append Methods
```javascript
  var list1to5FromAppend = new List().
    append(1).
    append(2).
    append(3).
    append(4).
    append(5);
```
### From Empty List more Prepend Methods
```javascript
  var list1to5FromPrepend = new List().
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
  console.log( list1to5FromCast.equals( list1to5FromAppend ) );  // true
  console.log( list1to5FromCast.equals( list1to5FromPrepend ) ); // true
```
## Special Attention with one parameter inputs
```javascript

  // ArrayMore [ 1 ]
  var arr1 = [1];
  var list1FromCastArray = List.cast(arr1);
  var list1FromCastValue = List.cast(1);
  var list1FromAppend    = new List().append(1);
  var list1FromAppend    = new List().prepend(1);
  console.log( list1FromCastArray.equals( arr1 ) );               // true
  console.log( list1FromCastArray.equals( list1FromCastArray ) ); // true
  console.log( list1FromCastArray.equals( list1FromAppend ) );    // true
  console.log( list1FromCastArray.equals( list1FromAppend ) );    // true
```
## Special Attention with empty list inputs
```javascript

  // Empty List
  var arrEmpty3 = new Array(3);
  var listEmpty3 = new List(3);
  var listEmpty3FromCast = List.cast([undefined,undefined,undefined]);
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

  var listEmpty1 = new List(1);                 // ArrayMore [ undefined ]
  var listValue1FromCast = List.cast(1);        // ArrayMore [ 1 ]
  var listValue1FromCastArr1 = List.cast([1]);  // ArrayMore [ 1 ]
  var listValueArr1 = new List([1]);            // ArrayMore [ [ 1 ] ]

  console.log( listEmpty1.equals( listValueArr1 ) );          // false
  console.log( listEmpty1.equals( listValue1FromCast ) );     // false
  console.log( listEmpty1.equals( listValue1FromCastArr1 ) ); // false

  console.log( listValueArr1.equals( listValue1FromCast ) );               // false
  console.log( listValueArr1.equals( listValue1listValue1FromCastArr1 ) ); // false
  console.log( listValueArr1.equals( listEmpty1 ) );                       // false

```

## New Methods

All 

### Abs

Create a new list with all the values changed to the abs

```javascript
  const List = require("arraymore.js")
  new List( -1, -2, -3, 4, 5 ).abs()) // [ 1, 2, 3, 4, 5 ]
```

You can replace the value of the return to empty inputs, the default value is empty list.

```javascript
  const List = require("arraymore.js")
  console.log(new List().abs()); // []
  console.log(new List().abs(":(")); // ":("
```

You can replace the value of invalid numbers input, the default value is NaN.

```javascript
  const List = require("arraymore.js")
  console.log(new List(1,2,"x",3).abs()); // [1,2,3,NaN,3]
  console.log(new List(1,2,"x",3).abs([],0)); // [1,2,3,0,3]
```

### Accumulate

Starting from zero, add each value of the array and create a new array with size n + 1

```javascript
  const List = require("arraymore.js")
  new List( 1, 1, 1, 1, 1 ).accumulate()) // [ 0, 1, 2, 3, 4, 5 ]
```

### Aggregate
