class ArrayMoreParent extends Array {

  copy() {
    return this.slice(0);
  }

  equals(other, anyOrder=true) {
    return ArrayMore.equals( this, other, false, anyOrder );
  }

  similar(other, anyOrder=true) {
    return ArrayMore.equals( this, other, true, anyOrder );
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

  has( value, castSimilar = false ) {
    if( value.constructor == Function ) {
      return this.some( value );
    }
    return this.some(
      ( element ) => ArrayMore.equals( element, value, castSimilar )
    );
  }

  hasIndex( value, castSimilar = false ) {
    if( value.constructor == Function ) {
      return this.findIndex( value );
    }
    return this.findIndex(
      ( element ) => ArrayMore.equals( element, value, castSimilar )
    );
  }

  unique( castSimilar = false ) {
    if (this.isEmpty()) {
      return this;
    }
    if( this.isUndefinedValues() ) {
      return ArrayMore.atomic( undefined );
    }

    let result = new ArrayMore();
    let list = this.copy();
    while( list.length ) {
      let current = list.pop();
      let exists = list.some(
        element => ArrayMore.equals( element, current, castSimilar )
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
    // if( this._parent === undefined ) {
    //   this._parent =
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
        unshift: super.unshift.bind(this)
      };
    // }
    // return this._parent;
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
}

class ArrayMore extends ArrayMoreParent {

  static cast(value, castNoValueToNull=false, keepHoles=false) {

    if( value === undefined || value === null || Number.isNaN( value ) ) {
      return ArrayMore.atomic( value, castNoValueToNull );
    }

    if( value instanceof ArrayMoreParent ) {
      return value;
    }

    if( ! ( value instanceof Array ) ) {
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
      let key;
      for( key = 0; key < value.length; key += 1 ) {
        let element = value[key];
        result.push( ArrayMore.safeCast( element, castNoValueToNull, keepHoles ) );
      }
    } else {
      result = new ArrayMore( value.length );
      let key;
      for( key in value ) {
        let element = value[key];
        result[key] = ArrayMore.safeCast( element, castNoValueToNull, keepHoles );
      }
    }
    return result;
  }

  static safeCast( value, castNoValueToNull = false, keepHoles = false ) {
    if( value === undefined || value === null || Number.isNaN( value ) ) {
      if( castNoValueToNull ) {
        return null;
      }
      return value;
    }
    if( value instanceof Array ) {
      return ArrayMore.cast( value, castNoValueToNull, keepHoles );
    }
    return value;
  }


  static castValueToList( value, castSimilar ) {
    if( value == undefined ) {
      return null;
    }
    if ( value instanceof Array ) {
      return ArrayMore.cast( value, castSimilar);
    }
    return null;
  }

  static equals(a, b, castSimilar=false, anyOrder=true) {

    if( a === b ) {
      return true;
    }

    if( castSimilar && a == b ) {
      return true;
    }

    const listA = ArrayMore.castValueToList( a, castSimilar );
    const listB = ArrayMore.castValueToList( b, castSimilar );

    const isListANull = ( listA === null );
    const isListBNull = ( listB === null );

    const diffListNulls = ( isListANull != isListBNull );

    if( ! castSimilar && diffListNulls ) {
      return false;
    }

    const allListsAreNotNull = ( listA !== null && listB !== null );
    const someListIsNotNull  = ( listA !== null || listB !== null );

    if( allListsAreNotNull ) {
      return ArrayMore.listEquals(
        listA, listB, castSimilar, anyOrder
      );
    }

    if( someListIsNotNull ) {
      return ArrayMore.listEquals(
        ArrayMore.cast(a,castSimilar),
        ArrayMore.cast(b,castSimilar),
        castSimilar,
        anyOrder
      );
    }

    const aHasEqualsMethod = ( a !== undefined && a.equals !== undefined );
    const bHasEqualsMethod = ( b !== undefined && b.equals !== undefined );

    if( aHasEqualsMethod ) {
      return a.equals( b );
    }

    if( bHasEqualsMethod ) {
      return b.equals( a );
    }

    if( a === undefined || b === undefined ) {
      return false;
    }

    if( a instanceof Object && b instanceof Object ) {
      return ArrayMore.objectEquals( a, b, castSimilar, anyOrder );
    }

    return false;
  }

  static objectEquals( a, b, castSimilar, anyOrder ) {

    const sameClass = ( a.constructor == b.constructor );

    if( ! sameClass && ! castSimilar ) {
      return false;
    }

    for( let prop in a ) {
      if( a.hasOwnProperty( prop ) && a[ prop ].constructor != Function ) {
        if( ! b.hasOwnProperty( prop ) ) {
          return false;
        }
        if( ! ArrayMore.equals( a[ prop ], b[ prop ], castSimilar, anyOrder ) ) {
          return false;
        }
      }
    }
    for( let prop in b ) {
      if( b.hasOwnProperty( prop ) && b[ prop ].constructor != Function ) {
        if( ! a.hasOwnProperty( prop ) ) {
          return false;
        }
      }
    }
    return true;
  }

  /**``
   * Create an array from a to b using the steps
   */
  static range(start, end = null, step=1) {
    if( end === null ) {
      end = start;
      start = 0;
    }
    let list = new ArrayMore();
    if( start < end ) {
      step = Math.abs( step );
      let number;
      for( number = start; number < end; number += step ) {
          list.push(number);
      }
    } else {
      step = Math.abs( step ) * -1;
      let number;
      for( number = start; number > end; number += step ) {
          list.push(number);
      }
    }
    return list;
  }

  static atomic( value, castNoValueToNull = false ) {
    let atomicList  = new ArrayMore();
    if( value === undefined || value === null || Number.isNaN( value ) ) {
      atomicList.push( castNoValueToNull ? null : value );
    } else {
      atomicList.push( value );
    }
    return atomicList;
  }

  static jokerValue( thisRef, value, castNoValueToNull=false, keepHoles=true, touchArrayMore=false ) {
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

  static listEquals( thisList, otherList, castSimilar=false, anyOrder=true) {
    if( otherList.length != thisList.length ) {
      return false;
    }

    if( thisList.isEmptyValues() || otherList.isEmptyValues() ) {
      return thisList.isEmptyValues() === ArrayMore.cast(otherList).isEmptyValues();
    }

    if( ! anyOrder ) {
      return thisList.every(
        ( element, key ) => {
          return ArrayMore.equals( element, otherList[ key ], castSimilar, anyOrder );
        }
      )
    }

    if( ! otherList.
      every(
        otherElement =>  thisList.some(
          thisElement => {
            return ArrayMore.equals(
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
            return ArrayMore.equals(
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

  mod(value=2, emptyValue=[], invalidValue=NaN) {
    return this.rotate( value, emptyValue, (x,y) => x % y, invalidValue )
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

  asContextOfKV( arrKeys, arrValues, rotate = false, missingValue = null ) {
    return ArrayMoreKV.asKV( this, arrKeys, arrValues, rotate, missingValue );
  }

  asKV(
    extractKey    = (value, key ) => key,
    extractValue  = value => value,
    rotate        = false,
    missingValue  = null
  ) {
    let keyFunction;
    let valueFunction;

    if( extractKey instanceof Array  ) {
      keyFunction = extractKey;
    } else {
      keyFunction = list => list.map( extractKey );
    }

    if( extractValue instanceof Array  ) {
      valueFunction = extractValue;
    } else {
      valueFunction = list => list.map( extractValue );
    }

    return ArrayMoreKV.asKV(
      this,
      keyFunction,
      valueFunction,
      rotate,
      missingValue
    );
  }

  countByFunc(
    extractKey    = (v) => v,
    extractValue  = (v) => 1,
    reduce        = (a,b) => a + b
  ) {
    return ArrayMoreKV.groupByFunc( this, extractKey, extractValue, reduce );
  }

  countByValue(
    extractKey    ,
    extractValue  ,
    reduce
 ) {
    return this.countByFunc( extractKey, extractValue, reduce );
  }

  groupByFunc(
    extractKey    ,
    extractValue  ,
    reduce
  ) {
    return ArrayMoreKV.groupByFunc( this, extractKey, extractValue, reduce );
  }

  groupByValue(
    extractKey    ,
    extractValue  ,
    reduce
  ) {
    return ArrayMoreKV.groupByFunc( this, extractKey, extractValue, reduce );
  }
}

class ArrayMoreKV extends ArrayMoreParent {

  static asKV( context, arrKeys, arrValues, rotate, missingValue = null ) {

    const castNoValueToNull = true;
    const keepHoles = false;
    const touchArrayMore = false;

    const arrValuesMore = arrValues === undefined ? new ArrayMore() :
      ArrayMore.jokerValue(
        context, arrValues, castNoValueToNull, keepHoles, touchArrayMore
      );

    const arrKeysMore = arrKeys === undefined ? new ArrayMore() :
      ArrayMore.jokerValue(
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

  static groupByFunc(
    data,
    extractKey = (v) => v,
    extractValue = (v) => [v],
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
          const castedValued = extractValue( value );
          const safeCasted = ArrayMore.safeCast( castedValued );
          counts.push( safeCasted );
        } else {
          counts[ posResult ] = reduce(
            counts[ posResult ],
            extractValue(value)
          );
        }
      }
    );
    return ArrayMoreKV.asKV( data, results, counts );
  }

  findIndexKey( key, castSimilar = false ) {
    return this.findIndex( kv => ArrayMore.equals( key, kv.key, castSimilar ) );
  }

  findRowByKey( key, castSimilar = false ) {
    return this.find( kv => ArrayMore.equals( key, kv.key, castSimilar ) );
  }

  findIndexValue( value, castSimilar = false ) {
    return this.findIndex( kv => ArrayMore.equals( value, kv.value, castSimilar ) );
  }

  findRowByValue( value, castSimilar = false ) {
    return this.find( kv => ArrayMore.equals( value, kv.value, castSimilar ) );
  }

  sortByValue( func = (a,b) => a - b ) {
    if( func === "ASC" ) {
      return this.sortByValue();
    }
    if( func === "DESC" ) {
      return this.sortByValue(
        (a,b) => b - a
      )
    }
    return this.copy().sort(
      ( kv1, kv2 ) => func(kv1.value, kv2.value)
    )
  }

  sortByKey( func = (a,b) => a - b ) {
    if( func === "ASC" ) {
      return this.sortByKey();
    }
    if( func === "DESC" ) {
      return this.sortByKey(
        (a,b) => b - a
      )
    }
    return this.copy().sort(
      ( kv1, kv2 ) => func(kv1.key, kv2.key)
    )
  }

  countRowsByFunc(
    extractKey   = (row) => row.key,
    extractValue = (row) => 1,
    reduce       = (a,b) => a + b
  ) {
    return ArrayMoreKV.groupByFunc(
      this,
      extractKey,
      extractValue,
      reduce
    );
  }

  countRowsByValue() {
    return this.countRowsByFunc(
      (row) => row.value,
    );
  }

  countRowsByKey() {
    return this.countRowsByFunc();
  }

  sumValuesByKey() {
    return this.countRowsByFunc(
      (row) => row.key,
      (row) => row.value
    );
  }

  sumKeysByValue() {
    return this.countRowsByFunc(
      (row) => row.value,
      (row) => row.key
    );
  }

  groupRowsByFunc(
    extractKey   = (row) => row.value,
    extractValue = (row) => [row.key],
    reduce       = (acc,key) => acc.concat(key)

  ) {
    return ArrayMoreKV.groupByFunc(
      this,
      extractKey,
      extractValue,
      reduce
    );
  }

//  groupRowsByKey() {
  groupValuesByKey() {
    return this.groupRowsByFunc(
      (row) => row.key,
      (row) => [row.value]
    );
  }

  // groupRowsByValue() {
  groupKeysByValue() {
    return this.groupRowsByFunc(
    );
  }

  transformKeys( transformation = (key) => key ) {
    return this.copy().map(
      row => {
        return {
          key: transformation(row.key),
          value: row.value
        }
      }
    );
  }

  transformValues( transformation = (value) => value ) {
    return this.copy().map(
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

  flip() {
    return ArrayMoreKV.asKV( this, this.getValues(), this.getKeys() );
  }

  normalizeKeys( area = 1, emptyValue=[], invalidValue=NaN) {
    let keys = this.getKeys().normalize( area, emptyValue, invalidValue );
    let values = this.getValues();
    return ArrayMoreKV.asKV( this, keys, values );
  }

  normalizeValues( area = 1, emptyValue=[], invalidValue=NaN) {
    let keys = this.getKeys();
    let values = this.getValues().normalize( area, emptyValue, invalidValue );
    return ArrayMoreKV.asKV( this, keys, values );
  }

  union( otherKV, unionFunction = (x,y) => ArrayMore.cast(x).concat(y), notFoundValue = [] ) {
    return this.aggregate( otherKV, unionFunction, notFoundValue );
  }

  aggregate( otherKV, aggregateFunction = (x,y) => x + y, notFoundValue = 0 ) {
    let me = this;
    let myKeys = this.getKeys();
    let otherKeys = otherKV.getKeys();
    let allKeys = myKeys.concat(otherKeys).unique().flat(true);
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

  last(emptyValue=null) {
    return this.getByPosition(this.length - 1, emptyValue );
  }

  first(emptyValue=null) {
    return this.getByPosition(0, emptyValue );
  }

  getByPosition(position, emptyValue=null) {
    return ( this[position] === undefined ) ? emptyValue : this[position];
  }

  findByKey(key, emptyValue=null) {
    return this.find(
      (kv) => ArrayMore.equals(kv.key, key, false)
    )
  }

  findByValue(value, emptyValue=null) {
    return this.find(
      (kv) => ArrayMore.equals(kv.value, value, false)
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

  valuesPlus(value=1, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().plus( value, emptyValue, invalidValue )
    );
  }

  valuesMore(value=1, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().more( value, emptyValue, invalidValue )
    );
  }

  valuesLess(value=1, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().less( value, emptyValue, invalidValue )
    );
  }

  valuesTimes(value=1, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().times( value, emptyValue, invalidValue )
    );
  }

  valuesDiv(value=1, emptyValue=[], invalidValue) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().div( value, emptyValue, invalidValue )
    );
  }

  valuesSquared(emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().squared( emptyValue, invalidValue )
    );
  }

  valuesPow(value=2, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().pow( value, emptyValue, invalidValue )
    );
  }

  valuesMod(value=2, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().mod( value, emptyValue, invalidValue )
    );
  }

  valuesSin(value=1, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().sin( value, emptyValue, invalidValue )
    );
  }

  valuesCos(value=1, emptyValue=[], invalidValue=NaN) {
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      this.getValues().cos( value, emptyValue, invalidValue )
    );
  }

  derivate() {
    const lastK = this.length - 1;
    var newValues = new ArrayMore();
    for( var i = 0; i < this.length; i++ ) {
      if( i == 0 ) {
        newValues.push( this[ i ].value );
        continue;
      }
      const previousValues   = newValues.sum();
      const currentDiffValue = this[ i ].value - previousValues;
      const previousKeyValue = this[ i - 1 ].key;
      const currentDiffKey   = this[ i ].key - previousKeyValue;
      newValues.push( currentDiffValue / currentDiffKey );
    }
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      newValues,
    );
  }

  integrate(c = 0) {
    const lastK = this.length - 1;
    var newValues = new ArrayMore();
    for( var i = 0; i < this.length; i++ ) {
      const isFirst = ( i === 0 );
      if ( isFirst ) {
        newValues.push( this[ 0 ].value + c );
        continue;
      }
      const deltaKey = this[ i ].key - this[ i - 1 ].key;
      newValues.push(
        newValues[ i - 1 ] +
        ( this[ i ].value * deltaKey )
      );
    }
    return ArrayMoreKV.asKV(
      this,
      this.getKeys(),
      newValues,
    );
  }
}

module.exports = ArrayMore;
