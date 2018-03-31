const List = require('../index');
describe('equals', () => {

  it('should equals be true to the empty list', () => {
    expect(new List().equals([])).toEqual(true);
  });

  it('should equals be false to [1] and [2]', () => {
    expect(new List([1]).equals([2])).toEqual(false);
  });

  it('should equals be false to [1] and [2]', () => {
    expect(new List([2]).equals([1])).toEqual(false);
  });

  it('should equals be true to the no value list', () => {
    expect(new List(5).equals(new Array(5))).toEqual(true);
  });

  it('should equals be true to the same list', () => {
    expect(new List(1, 2).equals([1, 2])).toEqual(true);
  });

  it('should equals be true to same object elements', () => {
    expect(new List({a:1}, {b:2}).equals([{a:1}, {b:2}])).toEqual(true);
  });

  it('should equals be false to diff object elements', () => {
    expect(new List({a:1}, {b:3}).equals([{a:1}, {b:2}])).toEqual(false);
  });

  it('should equals be false to diff a > b object elements', () => {
    expect(new List({a:1}, {b:2,c:1}).equals([{a:1}, {b:2}])).toEqual(false);
  });

  it('should equals be false to diff a < b object elements', () => {
    expect(new List({a:1}, {b:2}).equals([{a:1}, {b:2,c:1}])).toEqual(false);
  });

  it('should equals be false to diff a.x != b.x object elements', () => {
    expect(new List({a:1}, {b:2,c:[10,11]}).equals([{a:1}, {b:2,c:[10,12]}])).toEqual(false);
  });

  it('should equals be false to diff a.x = b.x object elements', () => {
    expect(new List({a:1}, {b:2,c:[10,11]}).equals([{a:1}, {b:2,c:[10,11]}])).toEqual(true);
  });

  it('should equals be false to diff class objects', () => {
    function Foo( v ) {
      this.v = v;
    }
    function Bar( v ) {
      this.v = v;
    }
    let foo = new Foo(1);
    let bar = new Bar(1);
    expect(new List(foo).equals([bar])).toEqual(false);
  });

  it('should equals be true to same class objects', () => {
    function Foo( v ) {
      this.v = v;
    }
    let foo = new Foo(1);
    let fooEqual = new Foo(1);
    expect(new List(foo).equals([fooEqual])).toEqual(true);
  });

  it('should equals by default ignore order', () => {
    expect(new List(1, 2, 3).equals([2, 1, 3])).toEqual(true);
  });

  it('should not be equals when a contains b', () => {
    expect(new List(1, 2, 3).equals([1, 2, 3, 4])).toEqual(false);
  });

  it('should not be equals when a contains b values', () => {
    expect(new List(1, 2, 3, 3).equals([1, 2, 3, 4])).toEqual(false);
  });

  it('should not be equals when b contains a', () => {
    expect(new List(1, 2, 3, 4).equals([1, 2, 3])).toEqual(false);
  });

  it('should not be equals when b contains a values', () => {
    expect(new List(1, 2, 3, 4).equals([1, 2, 3, 3])).toEqual(false);
  });

  it('should not be equals when compare list to value', () => {
    expect(new List(1).equals(1)).toEqual(false);
  });

  it('should not be equals when compare list to value', () => {
    expect(new List(1,2).equals(new List(1,new List([2])))).toEqual(false);
  });

  it('should equals be able to compare equal tree structures', () => {
    expect(new List(1, [2], [[3],[[4]]]).equals([1, [2], [[3],[[4]]]])).toEqual(true);
  });

  it('should equals be able to compare diff tree structures', () => {
    expect(new List(1, [2], [[3],[[4]]]).equals([1, [2], [[3],[[5]]]])).toEqual(false);
  });

  it('should equals by option not ignore order', () => {
    expect(new List(1, 2, 3).equals([2,1,3],false)).toEqual(false);
  });

  it('should equals not ignoring order be true to same list in the same order', () => {
    expect(new List(1, 2, 3).equals([1, 2, 3],false)).toEqual(true);
  });

  it('should not equals cast array to element', () => {
    expect(new List(1, [2]).equals([1,2])).toEqual(false);
  });

  it('should not equals cast string to number', () => {
    expect(new List(1, 2).equals([1,'2'])).toEqual(false);
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

    expect( List.cast( [ new Example(2) ] ).equals( List.cast( [ new Example(1) ] ) ) ).toEqual(true);
    expect( List.cast( [ new Example(2) ] ).equals( List.cast( [ new Example(100) ] ) ) ).toEqual(false);
    expect( List.cast( [ new Example(2) ] ).equals( List.cast( [1] ) ) ).toEqual(true);
    expect( List.cast( [ new Example(2) ] ).equals( List.cast( [100] ) ) ).toEqual(false);
    expect( List.cast( [2] ).equals( List.cast( [ new Example(1) ] ) ) ).toEqual(true);
    expect( List.cast( [2] ).equals( List.cast( [ new Example(100) ] ) ) ).toEqual(false);
  });
});
