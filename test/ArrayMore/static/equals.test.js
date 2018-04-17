const List = require('../../../index');
describe('equals', () => {

  it('should equals be able to compare equal simple values', () => {
    expect(List.equals(3,3)).toEqual(true);
  });

  it('should equals be able to compare equal Number values without cast', () => {
    expect(List.equals(3,new Number(3))).toEqual(false);
  });

  it('should equals be able to compare equal Number values with cast', () => {
    expect(List.equals(3,new Number(3),true)).toEqual(true);
    expect(List.equals(" 3",new Number(3),true)).toEqual(true);
    expect(List.equals(new Number(3),3,true)).toEqual(true);
    expect(List.equals(new Number(3)," 3",true)).toEqual(true);
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

  it('should same data be equal', () => {
    expect(List.equals(new Date(2000,1,2),new Date(2000,1,2))).toEqual(true);
  });

  it('should diff data be not equal', () => {
    expect(List.equals(new Date(2000,1,2),new Date(2000,2,3))).toEqual(false);
  });

  it('should same data as number not be equal to date without cast', () => {
    expect(List.equals(1 * new Date(2000,1,2),new Date(2000,1,2))).toEqual(false);
  });

  it('should same data as Number not be equal to date without cast', () => {
    expect(List.equals(new Number(1 * new Date(2000,1,2)),new Date(2000,1,2))).toEqual(false);
  });

  it('should same data as number be equal to date with cast', () => {
    expect(List.equals(1 * new Date(2000,1,2),new Date(2000,1,2),true)).toEqual(true);
  });

  it('should same data as Number be equal to date with cast', () => {
    expect(List.equals(new Number(1 * new Date(2000,1,2)),new Date(2000,1,2),true)).toEqual(true);
  });

  it('should same data be equal to date as number with cast', () => {
    expect(List.equals(new Date(2000,1,2),1 * new Date(2000,1,2),true)).toEqual(true);
  });

  it('should same data be equal to date as Number with cast', () => {
    expect(List.equals(new Date(2000,1,2),new Number(1 * new Date(2000,1,2)),true)).toEqual(true);
  });

  it('should diff data be diff to date as number with cast', () => {
    expect(List.equals(new Date(2000,1,2),1 + 1 * new Date(2000,1,2),true)).toEqual(false);
  });

  it('should diff data be diff to date as Number with cast', () => {
    expect(List.equals(new Date(2000,1,2),new Number(1 + 1 * new Date(2000,1,2)),true)).toEqual(false);
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
  it('should equals call object toString method', () => {

    class Wow {
      constructor( x ) {
        this.x = x;
      }

      toString() {
        return this.x + "!";
      }
    }

    class Uau {
      constructor( x ) {
        this.x = x;
      }

      toString() {
        return this.x + "!";
      }
    }
    expect( List.equals( new Wow(2), "2!" ) ).toEqual(false);
    expect( List.equals( new Wow(2), "2!",true ) ).toEqual(true);
    expect( List.equals( new Wow(2), new Uau(2),true ) ).toEqual(true);
    expect( List.equals( "2!", new Wow(2) ) ).toEqual(false);
    expect( List.equals( "2!", new Wow(2),true ) ).toEqual(true);
  });

  it('last case should try json stringify', () => {

    expect( List.equals( Symbol("a"), {}, true ) ).toEqual(false);
  });

});
