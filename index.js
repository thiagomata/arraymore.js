module.exports = class ArrayMore extends Array {

  static cast( v, castNoValueToNull = true ) {
    if( v === undefined || v === null || Number.isNaN( v ) ) {
      return new ArrayMore().append( castNoValueToNull ? null : v );
    }
    if( v.constructor ===  ArrayMore ) {
      return v;
    }
    if( v.constructor === Array ) {
      const isEmpty = v.every( e => e === undefined );
      if( ! isEmpty ) {
        return new ArrayMore().parentConcat(v);
      }
      return new ArrayMore( v.length ).fill( undefined );
    }
    return new ArrayMore().parentConcat([v]);
  }

  static  comparable( a, b, castSimilar = false, anyOrder = true ) {
    //console.log("comparable",a,b);
    const listA = (
        () => {
          if ( a.constructor === Array || a.constructor === ArrayMore ) {
            return ArrayMore.cast(a);
          }
          return null;
        }
    )();
    //console.log("listA = ",listA);

    const listB = (
      () => {
        if ( b.constructor === Array || b.constructor === ArrayMore  ) {
          return ArrayMore.cast(b);
        }
        return null;
      }
    )();
    //console.log("listB = ",listB);

    if( ! castSimilar && (
        ( listA === null && listB !== null ) ||
        ( listB === null && listA !== null )
      )
    ) {
      //console.log("not similar");
      return false;
    }

    if( listA !== null && listB !== null ) {
      //console.log("list comparable");
      return listA.listComparable( listB, castSimilar, anyOrder );
    }

    if( listA !== null || listB !== null ) {
      //console.log("similar comparable");
      return ArrayMore.cast(a).listComparable(
        ArrayMore.cast(b),
        castSimilar,
        anyOrder
      );
    }

    if( a.equals !== undefined ) {
      //console.log("object a comparable");
      return a.equals( b );
    }

    if( b.equals !== undefined ) {
      //console.log("object b comparable");
      return b.equals( a );
    }

    if( castSimilar ) {
      //console.log("value comparable ",a,b);
      return a == b;
    }

    //console.log("absolute value comparable ",a,b);
    return a === b;
  }

  static range( a, b = 0, step = 1 ) {
    var list = new ArrayMore();
    if( a < b ) {
      step = Math.abs( step );
      for( var i = a; i < b; i += step ) {
          list.push(i);
      }
    } else {
      step = Math.abs( step ) * -1;
      for( var i = a; i > b; i += step ) {
          list.push(i);
      }
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
   * When we extends the Array the concat method did not behaves as expected.
   * So, we have to make a ugly bugfix over the push of empty value arrays
   */
  concat( data = undefined) {
    if( data === undefined ) {
      return this;
    }
    const otherList = ArrayMore.cast( data );
    if( ! otherList.isUndefinedValues() ) {
      return this.copy().parentConcat( otherList );
    }
    return this.copy().parentConcat(
      otherList.fill( undefined )
    );
  }

  isEmptyValues() {
    return this.every( v => v == undefined );
  }

  isNullValues() {
    if( this.length === 0 ) {
      return true;
    }
    if( this.isUndefinedValues() ) {
      return false;
    }
    return this.every( v => v === null );
  }

  isUndefinedValues() {
    return this.every( v => v === undefined );
  }

  listComparable( otherList, castSimilar = false, anyOrder = true ) {
    const thisList = this;
    if( otherList.length != this.length ) {
      //console.log("otherList.length", otherList.length );
      //console.log("this.length", this.length );
      //console.log("diff length");
      return false;
    }

    if( this.isEmptyValues() || otherList.isEmptyValues() ) {
      //console.log("diff empty values");
      return this.isEmptyValues === otherList.isEmptyValues;
    }

    if( ! anyOrder ) {
      //console.log("test in order");
      return this.every(
        ( element, key ) => {
          //console.log("call comparable");
          return ArrayMore.comparable( element, otherList[ key ] );
        }
      )
    }

    if( ! otherList.
      every(
        otherElement =>  thisList.some(
          thisElement => {
            //console.log("in the loop");
            return ArrayMore.comparable(
              thisElement,
              otherElement,
              castSimilar,
              anyOrder
            )
          }
        )
      )
    ) {
      //console.log("other => this");
      return false;
    }
    if( ! thisList.
      every(
        thisElement =>  otherList.some(
          otherElement => {
            //console.log("in the loop");
            return ArrayMore.comparable(
              otherElement,
              thisElement,
              castSimilar,
              anyOrder
            )
          }
        )
      )
    ) {
      return false;
    }
    return true;
  }

  equals( other, anyOrder = true ) {
    return ArrayMore.comparable( this, other, false, anyOrder );
  }

  similar( other, anyOrder = true ) {
    return ArrayMore.comparable( this, other, true, anyOrder );
  }

  isEmpty() {
    return ( this.length === 0 );
  }

  take(n) {
    if( n < 0 ) {
      return this.slice( n * -1 );
    }
    return this.slice(0, n);
  }

  head(n = 10) {
    return this.take(n);
  }

  tail(n = 10) {
    if( n < 0 ) {
      return this.slice( 0, this.length - ( n * -1 ) );
    }
    return this.slice( this.length - n );
  }

  append( v ) {
    var copy = this.copy();
    copy.push( v );
    return copy;
  }

  prepend( v ) {
    return ArrayMore.cast(v).concat( this );
  }

  has( f ) {
    return this.some( f );
  }

  unique() {
    if (this.isEmpty()) {
      return this;
    }
    if( this.isUndefinedValues() ) {
      var result = new ArrayMore();
      result.push( undefined );
      return result;
    }

    var result = new ArrayMore();
    var list = this.copy();
    while( list.length ) {
      let current = list.pop();
      let exists = list.some(
        element => ArrayMore.comparable( element, current )
      );
      if( ! exists ) {
        result = result.prepend( [ current ] );
      }
    }
    return result;
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
      return ArrayMore.cast( emptyValue );
    }
    var total = this.sum();
    return this.map(x => x / total);
  }

  accumulate( c = 0 ) {
    return this.
    map( x => ArrayMore.cast(x) ).
    reduce(
      (x, y) => {
        var s = x.last();
        var yAcc = y.map(v => v + s);
        return x.concat(yAcc);
      },
      ArrayMore.cast( c )
    )
  }

  integrate( c = 0 ) {
    return this.accumulate( c ).head(-1);
  }

  last() {
    return this[ this.length - 1 ];
  }

  first() {
    return this[0];
  }

  derivate() {
    return this.
    reduce(
      (x, y) => {
        return x.concat(
          ArrayMore.cast(
            y - x.sum()
          )
        )
      },
      ArrayMore.cast( 0 )
    ).head(-1)
  }

  aggregate(
    otherArray,
    aggregateFunction    = (x, y) => x + y,
    onlyOneFoundFunction = x => x
  ) {
    const size = Math.max( this.length, otherArray.length );
    const self = this;
    return ArrayMore.
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

  sqrt( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.map( x => Math.sqrt( x ) )
  }

  round( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.map( x => Math.round( x ) )
  }

  abs( emptyValue = null ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.map( x => Math.abs( x ) )
  }

  rotate( value, emptyValue, operation ) {
    var list = ArrayMore.cast( value );
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.map(
      (x, key) => operation( x, list[ key % list.length ] )
    );
  }

  plus( value = 1, emptyValue = null ) {
    return this.rotate( value, emptyValue, (x,y) => x + y )
  }

  less( value = 1, emptyValue = null ) {
    return this.rotate( value, emptyValue, (x,y) => x - y )
  }

  more( value = 1, emptyValue = null ) {
    return this.plus( v, emptyValue );
  }

  times( value = 1, emptyValue = null ) {
    return this.rotate( value, emptyValue, (x,y) => x * y )
  }

  div( value = 1, emptyValue = null ) {
    return this.rotate( value, emptyValue, (x,y) => x / y )
  }

  squared() {
    return this.pow(2);
  }

  pow( value = 2, emptyValue = null ) {
    return this.rotate( value, emptyValue, (x,y) => Math.pow(x,y) )
  }

  diff( otherArray ) {
    return this.
    aggregate(
      otherArray,
      (x, y) => x - y,
      (v) => v
    );
  }

  errorRate( otherArray ) {
    return this.
    aggregate(
      otherArray,
      (x, y) => Math.pow(x - y, 2),
      (v) => v * v
    );
  }

  flat() {
    return this.map(
      v => ArrayMore(v)
    ).
    reduce(
      (a,b) => a.concat(b),
      new ArrayMore()
    )
  }
}
