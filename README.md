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
    new List(1,5,3,6,3,8,2,3,7).normalize().sqrt().derivate().times(100).integrate().avg()
```
