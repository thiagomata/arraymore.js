module.exports = class ArrayList extends Array {

  static cast( v, castNoValueToNull = true ) {
    if( v === undefined || v === null || v === NaN ) {
      return new ArrayList().push( castNoValueToNull ? null : v );
    }
    if( v.constructor ===  ArrayList ) {
      return v;
    }
    if( v.constructor === Array ) {
      const isEmpty = v.every( e => e === undefined );
      if( ! isEmpty ) {
        return new ArrayList().parentConcat(v);
      }
      var result = new ArrayList();
      for( var i = 0; i < v.length; i++ ) {
        result.push( undefined );
      }
      return result;
    }
    return new ArrayList().parentConcat([v]);
  }

  static  comparable( a, b, castSimilar = false, anyOrder = true ) {
    // console.log("comparable",a,b);
    const listA = (
        () => {
          if ( a.constructor === Array || a.constructor === ArrayList ) {
            return ArrayList.cast(a);
          }
          return null;
        }
    )();
    // console.log("listA = ",listA);

    const listB = (
      () => {
        if ( b.constructor === Array || b.constructor === ArrayList  ) {
          return ArrayList.cast(b);
        }
        return null;
      }
    )();
    // console.log("listB = ",listB);

    if( ! castSimilar && (
        ( listA === null && listB !== null ) ||
        ( listB === null && listA !== null )
      )
    ) {
      // console.log("not similar");
      return false;
    }

    if( listA !== null && listB !== null ) {
      // console.log("list comparable");
      return listA.listComparable( listB, castSimilar, anyOrder );
    }

    if( listA !== null || listB !== null ) {
      // console.log("similar comparable");
      return ArrayList.cast(a).listComparable(
        ArrayList.cast(b),
        castSimilar,
        anyOrder
      );
    }

    if( a.equals !== undefined ) {
      // console.log("object a comparable");
      return a.equals( b );
    }

    if( b.equals !== undefined ) {
      // console.log("object b comparable");
      return b.equals( a );
    }

    if( castSimilar ) {
      // console.log("value comparable ",a,b);
      return a == b;
    }

    // console.log("absolute value comparable ",a,b);
    return a === b;
  }

  static range( a, b = 0, step = 1 ) {
    var list = new ArrayList();
    if( a < b ) {
        step = Math.abs( step );
    } else {
        step = Math.abs( step ) * -1;
    }

    for( var i = a; i != b; i += step ) {
        list.push(i);
    }
    return list;
  }

  parentConcat( data ) {
    return super.concat( data );
  }

  copy() {
    return this.slice(0);
  }

  /*
   * When we expends the Array the concat method did not behaves as expected
   * So, we have to make a bugfix over the push of empty value arrays
   */
  concat( data ) {
    const otherList = ArrayList.cast( data );
    if( ! otherList.isEmptyValues() ) {
      return this.copy().parentConcat( otherList );
    }
    var copy = this.copy();
    for( var i = 0; i < otherList.length; i++ ) {
      copy.push( undefined );
    }
    return copy;
  }

  isEmptyValues() {
    return this.every( v => v == undefined );
  }

  isNull() {
    return this.every( v => v == null );
  }

  listComparable( otherList, castSimilar = false, anyOrder = true ) {
    // console.log("list comparable inside");
    const thisList = this;
    if( otherList.length != this.length ) {
      // console.log("diff size");
      return false;
    }

    if( this.isEmptyValues() || otherList.isEmptyValues() ) {
      // console.log("comparing empty values");
      return this.isEmptyValues === otherList.isEmptyValues;
    }

    if( ! anyOrder ) {
      // console.log("order comparable");
      return this.every(
        ( element, key ) => {
          return ArrayList.comparable( element, otherList[ key ] );
        }
      )
    }
    // console.log("any order comparable");

    if( ! otherList.
      every(
        otherElement =>  thisList.some(
          thisElement => {
            // console.log("in the loop");
            return ArrayList.comparable(
              thisElement,
              otherElement,
              castSimilar,
              anyOrder
            )
          }
        )
      )
    ) {
      // console.log("fail other find this ");
      return false;
    }
    if( ! thisList.
      every(
        thisElement =>  otherList.some(
          otherElement => {
            // console.log("in the loop");
            return ArrayList.comparable(
              otherElement,
              thisElement,
              castSimilar,
              anyOrder
            )
          }
        )
      )
    ) {
      // console.log("fail this find other ");
      return false;
    }
    return true;
  }

  equals( other, anyOrder = true ) {
    return ArrayList.comparable( this, other, false, anyOrder );
  }

  similar( other, anyOrder = true ) {
    return ArrayList.comparable( this, other, true, anyOrder );
  }

  isEmpty() {
    return ( this.length === 0 );
  }

  take(n) {
    if( n < 0 ) return this.tail( n * -1 );
    return this.slice(0, n);
  }

  head(n = 10) {
    return this.take(n);
  }

  tail(n = 10) {
    if( n < 0 ) return this.head( n * -1 );
    return this.slice(this.length - n);
  }

  has( f ) {
    return this.findIndex( f ) > -1;
  }

  unique() {
    if (this.isEmpty()) {
      return this;
    }
    return this.
      map( x => [x] ).
      reduce( (x, y) => x.concat(
        y.filter( y1 => x.indexOf(y1) == -1 )
      ),
      new ArrayList()
    );
  }

  max( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.reduce((x, y) => (x > y ? x : y));
  }

  min( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.reduce((x, y) => (x < y ? x : y));
  }

  sum( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.reduce((x, y) => x + y);
  }

  avg( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.sum() / this.length;
  }

  normalize( emptyValue = [] ) {
    if( this.isEmpty() ) {
      return ArrayList.cast( emptyValue );
    }
    var total = this.sum();
    return this.map(x => x / total);
  }

  accumulate() {
    return this.
    map( x => ArrayList.cast(x) ).
    reduce(
      (x, y) => {
        var s = x.max();
        var yAcc = y.map(v => v + s);
        return x.concat(yAcc);
      },
      new ArrayList()
    )
  }

  aggregate(
    otherArray,
    aggregateFunction    = (x, y) => x + y,
    onlyOneFoundFunction = x => x
  ) {
    const size = Math.max( this.length, otherArray.length );
    const self = this;
    return ArrayList.
    range( 0, size, 1 ).
    map(
      (k) => {
        if (k >= otherArray.length) {
          return onlyOneFoundFunction( self[ k ] );
        }
        if (k >= self.length) {
          return onlyOneFoundFunction( otherArray[ k ] );
        }
        return aggregateFunction(self[k], otherArray[ k ]);
      }
    )
  }

  overlaps(
    ys         = (a,b) => a == b,
    fSearch    = (a,b) => a == b,
    fGet       = (a) => a,
    valueEmpty = null
  ) {
    return this.map(
      ( xv ) => {
        const p = ys.findIndex( ( yv ) => fSearch( xv, yv ) );
        if( p === -1 ) return valueEmpty;
        return fGet( ys[ p ] )
      }
    )
  }

  errorComparing( otherArray ) {
    return this.
    aggregate(
      otherArray,
      (x, y) => Math.round(x - y)
    );
  }

  flat() {
    return this.map(
      v => ArrayList(v)
    ).
    reduce(
      (a,b) => a.concat(b),
      new ArrayList()
    )
  }
}
