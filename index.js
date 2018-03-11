module.exports = class ArrayMore extends Array {

  /**
   * Cast any input to ArrayMore
   */
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
        return new ArrayMore().parent().concat(v);
      }
      return new ArrayMore( v.length ).fill( undefined );
    }
    return new ArrayMore().parent().concat([v]);
  }

  /**
   * Cast and convert a and b and check if they are equivalent
   *
   * @return boolean true if a equivalent b
   */
  static  comparable( a, b, castSimilar = false, anyOrder = true ) {
    //console.log("comparable",a,b);
    const listA = (
        () => {
          if( a == undefined ) {
            return null;
          }
          if ( a.constructor === Array || a.constructor === ArrayMore ) {
            return ArrayMore.cast(a);
          }
          return null;
        }
    )();
    //console.log("listA = ",listA);

    const listB = (
      () => {
        if( b == undefined ) {
          return null;
        }
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

    if( a !== undefined && a.equals !== undefined ) {
      //console.log("object a comparable");
      return a.equals( b );
    }

    if( b !== undefined && b.equals !== undefined ) {
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

  static range( a, b = null, step = 1 ) {
    if( b === null ) {
      b = a;
      a = 0;
    }
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

  /**
   * Provides access to the parent method
   */
  parent() {
    return {
      concat: super.concat.bind(this),
      copyWithin: super.copyWithin.bind(this),
      entries: super.entries.bind(this),
      every: super.every.bind(this),
      fill: super.fill.bind(this),
      filter: super.filter.bind(this),
      find: super.find.bind(this),
      findIndex: super.findIndex.bind(this),
      forEach: super.forEach.bind(this),
      includes: super.includes.bind(this),
      indexOf: super.indexOf.bind(this),
      join: super.join.bind(this),
      keys: super.keys.bind(this),
      lastIndexOf: super.lastIndexOf.bind(this),
      map: super.map.bind(this),
      pop: super.pop.bind(this),
      push: super.push.bind(this),
      reduce: super.reduce.bind(this),
      reduceRight: super.reduceRight.bind(this),
      reverse: super.reverse.bind(this),
      shift: super.shift.bind(this),
      slice: super.slice.bind(this),
      some: super.some.bind(this),
      sort: super.sort.bind(this),
      splice: super.splice.bind(this),
      unshift: super.unshift.bind(this),
    };
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
      return this.copy().parent().concat( otherList );
    }
    return this.copy().parent().concat(
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
      return this.isEmptyValues === ArrayMore.cast(otherList).isEmptyValues;
    }

    if( ! anyOrder ) {
      //console.log("test in order");
      return this.every(
        ( element, key ) => {
          //console.log("call comparable");
          return ArrayMore.comparable( element, otherList[ key ], castSimilar, anyOrder );
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

  has( value ) {
    if( value.constructor == Function ) {
      return this.some( value );
    }
    return this.some(
      ( element ) => ArrayMore.comparable( element, value )
    );
  }

  hasIndex( value ) {
    if( value.constructor == Function ) {
      return this.findIndex( value );
    }
    return this.findIndex(
      ( element ) => ArrayMore.comparable( element, value )
    );
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

  max( emptyValue = null, invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => (x > y ? x : y));
      }
    )
  }

  min( emptyValue = null, invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => (x < y ? x : y));
      }
    )
  }

  sum( emptyValue = null, invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => x + y);
      }
    )
  }

  avg( emptyValue = null, invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        var total = list.sum();
        return list.sum() / list.length;
      }
    )
  }

  normalize( emptyValue = [], invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        var total = list.sum();
        return list.map( x => x / total );
      }
    )
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

  last( emptyValue = null ) {
    return ( this[this.length - 1] === undefined ) ? emptyValue : this[this.length - 1];
  }

  first( emptyValue = null ) {
    return ( this[0] === undefined ) ? emptyValue : this[0];
  }

  derivate( invalidValue = NaN ) {
    return this.replaceNaN( invalidValue ).
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
        var result = aggregateFunction(self[k], otherArray[ k ]);
        return result;
      }
    )
  }

  overlaps(
    ys,
    fSearch    = (a,b) => a == b,
    fGet       = (a) => a,
    valueEmpty = null
  ) {
    return ArrayMore.cast(ys).map(
      ( yv ) => {
        const p = this.hasIndex( ( xv ) => fSearch( xv, yv ) );
        if( p === -1 ) return valueEmpty;
        return fGet( this[ p ] )
      }
    )
  }

  sqrt( emptyValue = [], invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => list.map( x => Math.sqrt(x) )
    )
  }

  round( emptyValue = [], invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => list.map( x => Math.round(x) )
    )
  }

  abs( emptyValue = [], invalidValue = NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => list.map( x => Math.abs(x) )
    )
  }

  map( callback ) {
    return ArrayMore.cast( this.parent().map( callback ) );
  }

  replaceNaN( invalidValue = NaN ) {
    if( Number.isNaN( invalidValue ) ) {
      return this;
    }
    if( Number.isNaN( 1 * invalidValue ) ) {
      throw new Error( "invalid value replacer must be a valid number" );
    }
    return this.map(
      x => Number.isNaN( 1 * x ) ? invalidValue : x
    );
  }

  rotate( rotation, emptyValue, operation, invalidValue = NaN) {
    var rotateList = ArrayMore.cast( rotation );
    if( this.isEmpty() ) {
      return emptyValue;
    }
    return this.replaceNaN( invalidValue ).map(
      (x, key) => operation( x, rotateList[ key % rotateList.length ] )
    );
  }

  applyOperation( emptyValue, invalidValue /*= NaN*/, operation ) {
    if( this.isEmpty() ) {
      return emptyValue;
    }
    var cleanList = this.replaceNaN(
      invalidValue
    );
    return operation( cleanList );
  }

  plus( value = 1, emptyValue = [], invalidValue = NaN ) {
    return this.rotate( value, emptyValue, (x,y) => x + y, invalidValue )
  }

  more( value = 1, emptyValue = [], invalidValue = NaN ) {
    return this.plus( value, emptyValue, invalidValue );
  }

  less( value = 1, emptyValue = [], invalidValue = NaN ) {
    return this.rotate( value, emptyValue, (x,y) => x - y, invalidValue )
  }

  times( value = 1, emptyValue = [], invalidValue = NaN ) {
    return this.rotate( value, emptyValue, (x,y) => x * y, invalidValue )
  }

  div( value = 1, emptyValue = [], invalidValue ) {
    return this.rotate( value, emptyValue, (x,y) => x / y, invalidValue )
  }

  squared( emptyValue = [], invalidValue = NaN ) {
    return this.pow(2, emptyValue, invalidValue );
  }

  pow( value = 2, emptyValue = [], invalidValue = NaN ) {
    return this.rotate( value, emptyValue, (x,y) => Math.pow(x,y), invalidValue )
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
      v => ArrayMore.cast(v)
    ).
    reduce(
      (a,b) => a.concat(b),
      new ArrayMore()
    )
  }
}
