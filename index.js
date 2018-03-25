class ArrayMoreParent extends Array {

  copy() {
    return this.slice(0);
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
        result = result.prepend( current );
      }
    }
    return result;
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

  castFunction(value) {
    if( value === null || value === undefined || Number.isNaN( value ) ) {
      return value;
    }
    if( value.constructor !== Function ) {
      return value;
    }
    const result = value(this.copy());
    if( result.constructor === Array ) {
      return ArrayMore.cast( result );
    }
    return result;
  }

  append(value, castNoValueToNull=false, keepHoles=false) {
    const jokerValue = ArrayMore.jokerValue(
      this, value, castNoValueToNull, keepHoles, true
    );
    return this.copy().concat( jokerValue );
  }

  prepend(value, castNoValueToNull=false, keepHoles=false) {
    const castArray = new Array().concat(this);
    const jokerValue = ArrayMore.jokerValue(
      this, value, castNoValueToNull, keepHoles, true
    );
    return jokerValue.concat( castArray );
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
}

class ArrayMore extends ArrayMoreParent {

  /**
   * Cast any input to ArrayMore
   */
  static cast(value, castNoValueToNull=false, keepHoles=false) {
    if( value === undefined || value === null ||
        Number.isNaN( value ) ) {
          return ArrayMore.atomic( value, castNoValueToNull );
    }
    if( value.constructor === ArrayMore || value.constructor === ArrayMoreKV ) {
      return value;
    }
    if( value.constructor !== Array ) {
      return ArrayMore.atomic( value, castNoValueToNull );
    }
    const isUndefinedValues = value.every( element => element === undefined );
    if( isUndefinedValues ) {
      let emptyList = new ArrayMore( value.length );
      if( keepHoles ) {
        return emptyList;
      }
      return emptyList.fill(undefined);
    }
    let result;
    if( ! keepHoles ) {
      result = new ArrayMore();
      for( let i = 0; i < value.length; i += 1 ) {
        let element = value[i];
        result.push( ArrayMore.safeCast( element, castNoValueToNull, keepHoles ) );
      }
    } else {
      result = new ArrayMore( value.length );
      for( let i in value ) {
        let element = value[i];
        result[i] = ArrayMore.safeCast( element, castNoValueToNull, keepHoles );
      }
    }
    return result;
  }

  /**
   * Cast array elements values
   */
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

  /**
   * Create an array from a to b using the steps
   */
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
   * Create an atomic array with one element, the received value
   */
  static atomic( value, castNoValueToNull = false ) {
    let atomicList  = new ArrayMore();
    if( value === undefined || value === null || Number.isNaN( value ) ) {
      atomicList.push( castNoValueToNull ? null : value );
    } else {
      atomicList.push( value );
    }
    return atomicList;
  }

  /**
   * Convert flexible input value, list or function to ready to use data
   */
  static jokerValue( thisRef, value, castNoValueToNull=false, keepHoles=true, touchArrayMore=false ) {
    // if( thisRef === null ) {
    //   thisRef = this;
    // }
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
    return ArrayMore.cast( thisRef.castFunction( value ), castNoValueToNull, keepHoles );
  }

  /*
   * When we extends the Array the concat method did not behaves as expected.
   * So, we have to make a ugly bugfix over the push of empty value arrays
   */
  concat(data=undefined, castNoValueToNull=false, keepHoles=false) {
    if( data === undefined ) {
      return this;
    }
    const otherList = ArrayMore.jokerValue( this, data, castNoValueToNull, keepHoles );
    if( ! otherList.isUndefinedValues() ) {
      return this.copy().parent().concat( otherList );
    }

    return this.copy().parent().concat(
      otherList
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

  sum( emptyValue=0, invalidValue=NaN ) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.reduce((x, y) => x + y, emptyValue);
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
    const areaSafe = ArrayMore.jokerValue( this, area );
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        const total = list.sum();
        return list.map( x => x / total ).times(areaSafe);
      }
    )
  }

  accumulate(c=0, emptyValue=[0], invalidValue=NaN) {
    return this.applyOperation( emptyValue, invalidValue,
      (list) => {
        return list.
        map( x => ArrayMore.jokerValue(this, x) ).
        reduce(
          (x, y) => {
            const s = x.last();
            const yAcc = y.map(v => v + s);
            return x.concat(yAcc);
          },
          ArrayMore.jokerValue( this, c )
        )
      }
    )
  }

  integrate(c=0, freq=1, emptyValue=[], invalidValue=NaN) {
    return this.times(freq).accumulate( c, emptyValue, invalidValue ).head(-1);
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
    return ArrayMore.jokerValue(this, ys).map(
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

  reduce(callback, initialValue=null, emptyList = [], castNoValueToNull=false, keepHoles=false) {
    let reduceResult;

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
        this.castFunction( ArrayMore.jokerValue( this, rotation ).getRotate( key, emptyValue ) )
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
      ArrayMore.jokerValue( this, otherArray),
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

  flat( deep = false, thisRef = null ) {
    if( thisRef === null ) {
      thisRef = this;
    }
    if( deep ) {
      return this.flatDeep();
    }
    return this.map(
      v => ArrayMore.jokerValue(thisRef, v),
      thisRef
    ).
    reduce(
      (a,b) => a.concat(b),
      new ArrayMore()
    )
  }

  flatDeep( thisRef = null ) {
    if( thisRef === null ) {
      thisRef = this;
    }
    return this.flat(false, thisRef).map(
      value => {
        if( value.constructor === Array || value.constructor === ArrayMore ) {
          return value.flatDeep( thisRef );
        }
        if( value.constructor === Function ) {
          return ArrayMore.jokerValue(thisRef,value);
        }
        return [value];
      },
      thisRef
    ).
    reduce(
      (a,b) => a.concat(b),
      []
    )
  }

  resize( newSize, rotate = true, missingValue = null ) {
    return new ArrayMore(newSize).fill(missingValue).map(
      (element,pos) => {
        if( rotate ) {
          return this.getRotate(pos);
        }
        return this.get( pos, missingValue );
      }
    )
  }

  asKeyOfKV( arrValues = l => l , rotate = false, missingValue = null ) {
    return ArrayMoreKV.asKV( this, this, arrValues, rotate, missingValue );
  }

  asValueOfKV( arrKeys = l => l , rotate = false, missingValue = null ) {
    return ArrayMoreKV.asKV( this, arrKeys, this, rotate, missingValue );
  }

  asKeyValueOfKV( arrKeys, arrValues, rotate = true, missingValue = null ) {
    return ArrayMoreKV.asKV( this, arrKeys, arrValues, rotate, missingValue );
  }

  countByValue(
    extractKey = (v) => v,
    castValue = (v) => 1,
    reduce = (a,b) => a + b
 ) {
    return ArrayMoreKV.countByKey( this, extractKey, castValue, reduce );
  }

  countByFunc(
    extractKey = (v) => v,
    castValue = (v) => 1,
    reduce = (a,b) => a + b
  ) {
    return ArrayMoreKV.countByFunc( this, extractKey, castValue, reduce );
  }

  groupByValue(
    func = (v) => v,
    castValue = (v) => [v],
    reduce = (a,b) => a.concat(b)
  ) {
    return ArrayMoreKV.groupByValue( this, func, castValue, reduce );
  }

  groupByFunc(
    extractKey = (v) => v,
    castValue = (v) => [v],
    reduce = (a,b) => a.concat(b)
  ) {
    return ArrayMoreKV.countByFunc( this, extractKey, castValue, reduce );
  }
}

class ArrayMoreKV extends ArrayMoreParent {

    static asKV( context, arrKeys, arrValues, rotate, missingValue = null ) {

    const castNoValueToNull = true;
    const keepHoles = false;
    const touchArrayMore = false;

    const arrValuesMore = ArrayMore.jokerValue(
      context, arrValues, castNoValueToNull, keepHoles, touchArrayMore
    );

    const arrKeysMore = ArrayMore.jokerValue(
      context, arrKeys, castNoValueToNull, keepHoles, touchArrayMore
    );

    const maxSize = Math.max( arrKeysMore.length, arrValuesMore.length );

    const arrKeysResize   = ArrayMore.cast( arrKeysMore   ).resize( maxSize, rotate, missingValue );
    const arrValuesResize = ArrayMore.cast( arrValuesMore ).resize( maxSize, rotate, missingValue );

    return new ArrayMoreKV().concat(
      ArrayMore.cast(arrKeysResize).rotate(
        arrValuesResize,
        [],
        (k,v) => {
            return {key:k,value:v};
        }
      )
    );
  }

  static groupByKey(
    data,
    extractKey = (v) => v,
    castValue = (v) => [v],
    reduce = (a,b) => a.concat(b)
  ) {
    return ArrayMoreKV.groupByFunc( data, extractKey, castValue, reduce );
  }

  static countByKey(
    data,
    extractKey = (v) => v,
    castValue = (v) => 1,
    reduce = (a,b) => a + b
  ) {
    return ArrayMoreKV.countByFunc( data, extractKey );
  }

  static countByFunc(
    data,
    extractKey = (v) => v,
    castValue = (v) => 1,
    reduce = (a,b) => a + b
  ) {
    return ArrayMoreKV.groupByFunc(
      data,
      extractKey,
      castValue,
      reduce
    );
  }

  static groupByFunc(
    data,
    extractKey = (v) => v,
    castValue = (v) => [v],
    reduce = (a,b) => a.concat(b)
  ) {
    let counts  = new ArrayMore();
    let results = new ArrayMore();
    ArrayMore.cast(  data ).forEach(
      (value) => {
        let result = extractKey( value );
        let posResult = results.indexOf( result );
        if( posResult === -1 ) {
          results.push( result );
          const castedValued = castValue( value );
          const safeCasted = ArrayMore.safeCast( castedValued );
          counts.push( safeCasted );
        } else {
          counts[ posResult ] = reduce(
            counts[ posResult ],
            castValue(value)
          );
        }
      }
    );
    return ArrayMoreKV.asKV( data, results, counts );
  }

  /**
   * Create a copy of the ArrayMoreKV
   */
  copy() {
    return this.slice(0);
  }

  findIndexKey( key ) {
    return this.findIndex( kv => ArrayMore.comparable( key, kv.key ) );
  }

  findKey( key ) {
    return this.find( kv => ArrayMore.comparable( key, kv.key ) );
  }

  findIndexValue( value ) {
    return this.findIndex( kv => ArrayMore.comparable( value, kv.value ) );
  }

  findValue( value ) {
    return this.find( kv => ArrayMore.comparable( value, kv.value ) );
  }

  sortByValue( func = (a,b) => a - b ) {
    return this.sort(
      ( kv1, kv2 ) => func(kv1.value, kv2.value)
    )
  }

  sortByKey( func = (a,b) => a - b ) {
    return this.sort(
      ( kv1, kv2 ) => func(kv1.key, kv2.key)
    )
  }

  groupByKey() {
    return ArrayMoreKV.groupByKey(
      this,
      (row) => row.key,
      (row) => [row.value],
      (acc,value) => acc.concat(value)
    );
  }

  countByKey() {
    return ArrayMoreKV.countByKey(
      this,
      (row) => row.key,
      (row) => 1,
      (acc,value) => acc + value
    );
  }

  groupByValue() {
    return ArrayMoreKV.groupByKey(
      this,
      (row) => row.value,
      (row) => [row.key],
      (acc,key) => acc.concat(key)
    );
  }

  countByValue() {
    return ArrayMoreKV.groupByKey(
      this,
      (row) => row.value,
      (row) => 1,
      (acc,key) => acc + key
    );
  }

  transformKeys( transformation = (key) => key ) {
    return this.map(
      row => {
        return {
          key: transformation(row.key),
          value: row.value
        }
      }
    );
  }

  transformValues( transformation = (value) => value ) {
    return this.map(
      row => {
        return {
          key: row.key,
          value: transformation(row.value)
        }
      }
    );
  }

  getValues() {
    const values = new Array().concat( this.map( kv => kv.value ) );
    return new ArrayMore().concat(values);
  }

  getKeys() {
    const keys = new Array().concat( this.map( kv => kv.key ) );
    return new ArrayMore().concat(keys);
  }

  normalizeKeys( area = 1, emptyValue=[], invalidValue=NaN) {
    var keys = this.getKeys().normalize( area, emptyValue, invalidValue );
    var values = this.getValues();
    return ArrayMoreKV.asKV( keys, values );
  }

  normalizeValues( area = 1, emptyValue=[], invalidValue=NaN) {
    var keys = this.getKeys();
    var values = this.getValues().normalize( area, emptyValue, invalidValue );
    return ArrayMoreKV.asKV( keys, values );
  }

  union( otherKV, unionFunction = (x,y) => ArrayMore.cast(x).concat(y), notFoundValue = [] ) {
    return this.aggregate( otherKV, unionFunction, notFoundValue );
  }

  aggregate( otherKV, aggregateFunction = (x,y) => x + y, notFoundValue = 0 ) {
    var me = this;
    var myKeys = this.getKeys();
    var otherKeys = otherKV.getKeys();
    var allKeys = myKeys.concat(otherKeys).unique().flat(true);
    return new ArrayMoreKV().concat(
      allKeys.map(
        (key) => {
          let myIndex = me.findIndexKey(key);
          let otherIndex = otherKV.findIndexKey(key);
          let myValue = ( myIndex == -1 ? notFoundValue : me[ myIndex ].value );
          let otherValue = ( otherIndex == -1 ? notFoundValue : otherKV[ otherIndex ].value );
          return {
            key: key,
            value: aggregateFunction( myValue, otherValue )
          }
        }
      )
    );
  }
}

module.exports = ArrayMore;
