module.exports = class ArrayMore extends Array {

  /**
   * Cast any input to ArrayMore
   */
  static cast(v, castNoValueToNull=false, keepHoles=false) {
    if( v === undefined || v === null || Number.isNaN( v ) ) {
      return ArrayMore.atomic( v, castNoValueToNull );
    }
    if( v.constructor ===  ArrayMore ) {
      return v;
    }
    if( v.constructor === Array ) {
      const isEmpty = v.every( e => e === undefined );
      if( ! isEmpty && !keepHoles ) {
        let result = new ArrayMore();
        for( let i = 0; i < v.length; i += 1 ) {
          let element = v[i];
          result.push( ArrayMore.safeCast( element, castNoValueToNull, keepHoles ) );
        }
        return result;
      }
      if ( ! isEmpty && keepHoles ) {
        let result = new ArrayMore( v.length );
        for( let i in v ) {
          let element = v[i];
          result[i] = ArrayMore.safeCast( element, castNoValueToNull, keepHoles );
        }
        return result;
      }
      return new ArrayMore( v.length ).fill( undefined );
    }
    return new ArrayMore().parent().concat([v]);
  }

  static safeCast(value, castNoValueToNull=false, keepHoles=false) {
    if( value === undefined || value === null || Number.isNaN( value ) ) {
      if( castNoValueToNull ) {
        return null;
      }
      return value;
    }
    if( value.constructor === Array ) {
      return ArrayMore.cast( value, castNoValueToNull, keepHoles );
    }
    return value;
  }


  /**
   * Cast and convert a and b and check if they are equivalent
   *
   * @return boolean true if a equivalent b
   */
  static comparable(a, b, castSimilar=false, anyOrder=true) {
    const listA = (
        () => {
          if( a == undefined ) {
            return null;
          }
          if ( a.constructor === Array || a.constructor === ArrayMore ) {
            return ArrayMore.cast(a,castSimilar);
          }
          return null;
        }
    )();

    const listB = (
      () => {
        if( b == undefined ) {
          return null;
        }
        if ( b.constructor === Array || b.constructor === ArrayMore  ) {
          return ArrayMore.cast(b,castSimilar);
        }
        return null;
      }
    )();

    if( ! castSimilar && (
        (listA === null && listB !== null || listB === null && listA !== null)
      )
    ) {
      return false;
    }

    if( listA !== null && listB !== null ) {
      return listA.listComparable( listB, castSimilar, anyOrder );
    }

    if( listA !== null || listB !== null ) {
      return ArrayMore.cast(a,castSimilar).listComparable(
        ArrayMore.cast(b,castSimilar),
        castSimilar,
        anyOrder
      );
    }

    if( a !== undefined && a.equals !== undefined ) {
      return a.equals( b );
    }

    if( b !== undefined && b.equals !== undefined ) {
      return b.equals( a );
    }

    if( castSimilar ) {
      return a == b;
    }

    return a === b;
  }

  static range(a, b=null, step=1) {
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
    if( this._parent === undefined ) {
      this._parent = {
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
    return this._parent;
  }

  copy() {
    return this.slice(0);
  }

  static atomic( value, castNoValueToNull = false ) {
    var atomicList  = new ArrayMore();
    atomicList.push( castNoValueToNull ? null : value );
    return atomicList;
  }

  jokerValue(value, castNoValueToNull=false, keepHoles=true, touchArrayMore=false) {
    if( value  === undefined || value  === null || Number.isNaN( value  ) ) {
      return ArrayMore.atomic( value, castNoValueToNull );
    }
    if( value.constructor === ArrayMore ) {
      if( ! touchArrayMore ) {
        return value;
      }
      return ArrayMore.atomic( value, castNoValueToNull );
    }
    if( value.constructor === Array ) {
      if( ! touchArrayMore ) {
        return ArrayMore.cast(value);
      }
      return ArrayMore.cast([value]);
    }
    if( value.constructor === Function ) {
      return ArrayMore.cast( value( this.copy() ), castNoValueToNull, keepHoles );
    }
    return ArrayMore.cast( value, castNoValueToNull, keepHoles );
  }

  /*
   * When we extends the Array the concat method did not behaves as expected.
   * So, we have to make a ugly bugfix over the push of empty value arrays
   */
  concat(data=undefined, castNoValueToNull=false, keepHoles=false) {
    if( data === undefined ) {
      return this;
    }
    const otherList = this.jokerValue( data, castNoValueToNull, keepHoles, false );
    if( ! otherList.isUndefinedValues() ) {
      return this.copy().parent().concat( otherList );
    }
    return this.copy().parent().concat(
      ArrayMore.cast(data,castNoValueToNull,keepHoles)
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

  listComparable(otherList, castSimilar=false, anyOrder=true) {
    const thisList = this;
    if( otherList.length != this.length ) {
      return false;
    }

    if( this.isEmptyValues() || otherList.isEmptyValues() ) {
      return this.isEmptyValues() === ArrayMore.cast(otherList).isEmptyValues();
    }

    if( ! anyOrder ) {
      return this.every(
        ( element, key ) => {
          return ArrayMore.comparable( element, otherList[ key ], castSimilar, anyOrder );
        }
      )
    }

    if( ! otherList.
      every(
        otherElement =>  thisList.some(
          thisElement => {
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
      return false;
    }
    if( ! thisList.
      every(
        thisElement =>  otherList.some(
          otherElement => {
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

  equals(other, anyOrder=true) {
    return ArrayMore.comparable( this, other, false, anyOrder );
  }

  similar(other, anyOrder=true) {
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

  head(n=10) {
    return this.take(n);
  }

  tail(n=10) {
    if( n < 0 ) {
      return this.slice( 0, this.length - ( n * -1 ) );
    }
    return this.slice( this.length - n );
  }

  append(value, castNoValueToNull=false, keepHoles=false) {
    return this.copy().concat(
      this.jokerValue( value, castNoValueToNull, keepHoles, true ),
      castNoValueToNull,
      keepHoles );
  }

  prepend(value, castNoValueToNull=false, keepHoles=false) {
    return this.
      jokerValue( value, castNoValueToNull, keepHoles, false ).
      concat( this, castNoValueToNull, keepHoles );
  }

  has(value) {
    if( value.constructor == Function ) {
      return this.some( value );
    }
    return this.some(
      ( element ) => ArrayMore.comparable( element, value )
    );
  }

  hasIndex(value) {
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
      return ArrayMore.atomic( undefined );
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

  max(emptyValue=null, invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => (x > y ? x : y));
      }
    )
  }

  min(emptyValue=null, invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => (x < y ? x : y));
      }
    )
  }

  sum(emptyValue=null, invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => x + y);
      }
    )
  }

  avg(emptyValue=null, invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.sum() / list.length;
      }
    )
  }

  normalize( area = 1, emptyValue=[], invalidValue=NaN) {
    if( area.constructor == Function ) {
      area = area(this);
    }
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        const total = list.sum();
        return list.map( x => x / total ).times(area);
      }
    )
  }

  accumulate(c=0, emptyValue=[0], invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.
        map( x => this.jokerValue(x) ).
        reduce(
          (x, y) => {
            const s = x.last();
            const yAcc = y.map(v => v + s);
            return x.concat(yAcc);
          },
          this.jokerValue( c )
        )
      }
    )
  }

  integrate(c=0, emptyValue=[], invalidValue=NaN) {
    return this.accumulate( c, emptyValue, invalidValue ).head(-1);
  }

  last(emptyValue=null) {
    return this.get(this.length - 1, emptyValue );
  }

  first(emptyValue=null) {
    return this.get(0, emptyValue );
  }

  get(key, emptyValue=null) {
    return ( this[key] === undefined ) ? emptyValue : this[key];
  }

  getRotate(key, emptyValue=null) {
    return this.get( key % this.length, emptyValue );
  }

  derivate(invalidValue=NaN) {
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

  aggregate(otherArray, aggregateFunction=(x, y) => x + y, onlyOneFoundFunction=x => x) {
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

  overlaps(ys, fSearch=(a,b) => a == b, fGet=(a) => a, valueEmpty=null) {
    return this.jokerValue(ys).map(
      ( yv ) => {
        const p = this.hasIndex( ( xv ) => fSearch( xv, yv ) );
        if (p === -1) {
          return valueEmpty;
        }
        return fGet( this[ p ] )
      }
    )
  }

  sqrt(emptyValue=[], invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => list.map( x => Math.sqrt(x) )
    )
  }

  round(precision=0, emptyValue=[], invalidValue=NaN) {
    const factor = Math.pow(10,precision);
    return this.applyOperation( emptyValue, invalidValue,
      (list) => list.times(factor).map( x => Math.round(x) ).div(factor)
    )
  }

  abs(emptyValue=[], invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => list.map( x => Math.abs(x) )
    )
  }

  map(callback, thisRef=undefined, castNoValueToNull=false, keepHoles=false) {
    if( thisRef === undefined ) {
      return ArrayMore.safeCast( this.parent().map( callback ), castNoValueToNull, keepHoles );
    }
    return ArrayMore.safeCast( this.parent().map( callback.bind(thisRef) ), castNoValueToNull, keepHoles );
  }

  reduce(callback, initialValue=null, castNoValueToNull=false, keepHoles=false) {
    var reduceResult;
    if( initialValue === null) {
      reduceResult = this.parent().reduce( callback );
    } else {
      reduceResult = this.parent().reduce( callback, initialValue );
    }
    return ArrayMore.safeCast( reduceResult, castNoValueToNull, keepHoles );
  }

  replaceNaN(invalidValue=NaN) {
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

  rotate(rotation, emptyValue, operation, invalidValue=NaN) {
    if( this.isEmpty() ) {
      return ArrayMore.safeCast( emptyValue );
    }
    return this.replaceNaN( invalidValue ).map(
      (x, key) => operation(
        x,
        this.jokerValue( rotation ).getRotate( key, emptyValue )
      )
    );
  }

  applyOperation(emptyValue, invalidValue, operation) {
    if( this.isEmpty() ) {
      return ArrayMore.safeCast( emptyValue );
    }
    return operation(
      this.replaceNaN(
        invalidValue
      )
    );
  }

  plus(value=1, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => x + y, invalidValue )
  }

  more(value=1, emptyValue=[], invalidValue=NaN) {
    return this.plus( value, emptyValue, invalidValue );
  }

  less(value=1, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => x - y, invalidValue )
  }

  times(value=1, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => x * y, invalidValue )
  }

  div(value=1, emptyValue=[], invalidValue) {
    return this.rotate( value, emptyValue, (x,y) => x / y, invalidValue )
  }

  squared(emptyValue=[], invalidValue=NaN) {
    return this.pow(2, emptyValue, invalidValue );
  }

  pow(value=2, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => Math.pow(x,y), invalidValue )
  }

  sin(value=1, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => Math.sin(x*y), invalidValue )
  }

  cos(value=1, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => Math.cos(x*y), invalidValue )
  }

  diff(otherArray) {
    return this.
    aggregate(
      this.jokerValue(otherArray),
      (x, y) => x - y,
      (v) => v
    );
  }

  errorRate(otherArray) {
    return this.
    aggregate(
      otherArray,
      (x, y) => Math.pow(x - y, 2),
      (v) => v * v
    );
  }

  flat() {
    return this.map(
      v => this.jokerValue(v)
    ).
    reduce(
      (a,b) => a.concat(b),
      new ArrayMore()
    )
  }
}
