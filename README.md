# arraylist.js

A extension of the Javascript Array with super powers.

ArrayList.
  range(10).               // [1,2...10]
  normalize().             // ArrayList [0.18181818181818182, 0.16363636363636364, ... , 0.01818181818181818 ]
  filter(                  // native filter
    (v,k,a) => v > a.avg() // take the average of the list
  ).
  sum()                    // sum the values of the list
