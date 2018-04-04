const List = require('../../../index');
describe('equals', () => {

  it('should equals be able to compare equal simple values', () => {
    expect(List.equals(3,3)).toEqual(true);
  });

  it('should equals be able to compare diff simple values', () => {
    expect(List.equals(3,4)).toEqual(false);
  });

  it('should equals empty array with empty list', () => {
    expect(List.equals([],new List())).toEqual(true);
  });

  it('should equals empty array with empty array', () => {
    expect(List.equals([],[])).toEqual(true);
  });

  it('should equals empty array fail with list with value', () => {
    expect(List.equals([],List.cast([1]))).toEqual(false);
  });

  it('should equals empty array fail with list no value', () => {
    expect(List.equals([],new List(1))).toEqual(false);
  });

  it('should equals empty array fail with array with no value', () => {
    expect(List.equals([],new Array(1))).toEqual(false);
  });

  it('should equals empty array fail with array with value', () => {
    expect(List.equals([],[1])).toEqual(false);
  });

  it('should equals value array with value list', () => {
    expect(List.equals([1,2,3],new List(1,2,3))).toEqual(true);
  });

  it('should equals empty array with empty list', () => {
    expect(List.equals(new Array(10),new List(10))).toEqual(true);
  });

  it('should equals array with value with list with value', () => {
    expect(List.equals(new Array([1,2,3]),new List([1,2,3]))).toEqual(true);
  });

  it('should equals array with value with list with value', () => {
    expect(List.equals(new Array([1,2,3]),new List([1,2,4]))).toEqual(false);
  });

  it('should equals array with value with list with value', () => {
    expect(List.equals(new Array([1,2,3]),new List([1,2,3,4]))).toEqual(false);
  });

  it('should equals array with value with list with value', () => {
    expect(List.equals(new Array([1,2,3,4]),new List([1,2,3]))).toEqual(false);
  });

  it('should equals array with value with list with value', () => {
    expect(List.equals(new Array([1,2,3,5]),new List([1,2,3,4]))).toEqual(false);
  });

  it('should equals tree', () => {
    expect(List.equals([1,[2],[[3],4]],new List(1,[2],[[3],4]))).toEqual(true);
  });

  it('should equals tree', () => {
    expect(List.equals([1,[2],[[3],4]],new List(1,[2],[[5],4]))).toEqual(false);
  });

  it('should not equals cast simple values with array', () => {
    expect(List.equals(1,[1])).toEqual(false);
  });

  it('equals [undefined] with [null]', () => {
    expect(List.equals([undefined],[null])).toEqual(true);
  });

  it('equals undefined with 1', () => {
    expect(List.equals(undefined,1)).toEqual(false);
  });

  it('equals 1 with undefined', () => {
    expect(List.equals(1,undefined)).toEqual(false);
  });

  it('equals [NaN] with [null]', () => {
    expect(List.equals([NaN],[null],true)).toEqual(true);
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

    expect( List.equals( [ new Example(2) ], [ new Example(1) ] ) ).toEqual(true);
    expect( List.equals( [ new Example(2) ], [ new Example(100) ] ) ).toEqual(false);
    expect( List.equals( [ new Example(2) ], [1] ) ).toEqual(true);
    expect( List.equals( [ new Example(2) ], [100] ) ).toEqual(false);
    expect( List.equals( [2], [ new Example(1) ] ) ).toEqual(true);
    expect( List.equals( [2], [ new Example(100) ] ) ).toEqual(false);
  });

});
