const List = require('../arraylist');
describe('equals', () => {

  it('should equals be true to the empty list', () => {
    expect(new List().equals([])).toEqual(true);
  });

  it('should equals be true to the no value list', () => {
    expect(new List(5).equals(new Array(5))).toEqual(true);
  });

  it('should equals be true to the same list', () => {
    expect(new List(1, 2).equals([1, 2])).toEqual(true);
  });

  it('should equals by default ignore order', () => {
    expect(new List(1, 2, 3).equals([2, 1, 3])).toEqual(true);
  });

  it('should not be equals when a contains b', () => {
    expect(new List(1, 2, 3).equals([1, 2, 3, 4])).toEqual(false);
  });

  it('should not be equals when b contains a', () => {
    expect(new List(1, 2, 3, 4).equals([1, 2, 3])).toEqual(false);
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

  it('should equals not ignoring order be true to same list', () => {
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
        return ( this.x > 10 ) === ( otherExample.x > 10 );
      }
    }

    expect(List.cast([new Example(2)]).equals(List.cast([new Example(1)]))).toEqual(true);
    expect(List.cast([new Example(2)]).equals(List.cast([new Example(100)]))).toEqual(false);
  });
});
