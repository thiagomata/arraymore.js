const List = require('../index');
describe('comparable', () => {

  it('should comparable empty array with empty list', () => {
    expect(List.comparable([],new List())).toEqual(true);
  });

  it('should comparable empty array with empty array', () => {
    expect(List.comparable([],[])).toEqual(true);
  });

  it('should comparable empty array fail with list with value', () => {
    expect(List.comparable([],List.cast([1]))).toEqual(false);
  });

  it('should comparable empty array fail with list no value', () => {
    expect(List.comparable([],new List(1))).toEqual(false);
  });

  it('should comparable empty array fail with array with no value', () => {
    expect(List.comparable([],new Array(1))).toEqual(false);
  });

  it('should comparable empty array fail with array with value', () => {
    expect(List.comparable([],[1])).toEqual(false);
  });

  it('should comparable value array with value list', () => {
    expect(List.comparable([1,2,3],new List(1,2,3))).toEqual(true);
  });

  it('should comparable empty array with empty list', () => {
    expect(List.comparable(new Array(10),new List(10))).toEqual(true);
  });

  it('should comparable array with value with list with value', () => {
    expect(List.comparable(new Array([1,2,3]),new List([1,2,3]))).toEqual(true);
  });

  it('should comparable array with value with list with value', () => {
    expect(List.comparable(new Array([1,2,3]),new List([1,2,4]))).toEqual(false);
  });

  it('should comparable array with value with list with value', () => {
    expect(List.comparable(new Array([1,2,3]),new List([1,2,3,4]))).toEqual(false);
  });

  it('should comparable array with value with list with value', () => {
    expect(List.comparable(new Array([1,2,3,4]),new List([1,2,3]))).toEqual(false);
  });

  it('should comparable array with value with list with value', () => {
    expect(List.comparable(new Array([1,2,3,5]),new List([1,2,3,4]))).toEqual(false);
  });

  it('should comparable tree', () => {
    expect(List.comparable([1,[2],[[3],4]],new List(1,[2],[[3],4]))).toEqual(true);
  });

  it('should comparable tree', () => {
    expect(List.comparable([1,[2],[[3],4]],new List(1,[2],[[5],4]))).toEqual(false);
  });

  it('should not comparable cast simple values with array', () => {
    expect(List.comparable(1,[1])).toEqual(false);
  });

  it('comparable [undefined] with [null]', () => {
    expect(List.comparable([undefined],[null])).toEqual(true);
  });

  it('comparable undefined with 1', () => {
    expect(List.comparable(undefined,1)).toEqual(false);
  });

  it('comparable 1 with undefined', () => {
    expect(List.comparable(1,undefined)).toEqual(false);
  });

  it('comparable [NaN] with [null]', () => {
    expect(List.comparable([NaN],[null])).toEqual(true);
  });

  it('should equals call object equals method', () => {

    class Example {
      constructor( x ) {
        this.x = x;
      }

      equals( otherExample ) {
        if( otherExample.constructor == Example ) {
          return ( this.x > 10 ) === ( otherExample.x > 10 );
        }
        return ( this.x > 10 ) === ( otherExample > 10 );
      }
    }

    expect( List.comparable( [ new Example(2) ], [ new Example(1) ] ) ).toEqual(true);
    expect( List.comparable( [ new Example(2) ], [ new Example(100) ] ) ).toEqual(false);
    expect( List.comparable( [ new Example(2) ], [1] ) ).toEqual(true);
    expect( List.comparable( [ new Example(2) ], [100] ) ).toEqual(false);
    expect( List.comparable( [2], [ new Example(1) ] ) ).toEqual(true);
    expect( List.comparable( [2], [ new Example(100) ] ) ).toEqual(false);
  });

});
