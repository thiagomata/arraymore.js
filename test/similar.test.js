const List = require('../index');
describe('similar', () => {

  it('should similar be true to the empty list', () => {
    expect(new List().similar([])).toEqual(true);
  });

  it('should similar be false to [1] and [2]', () => {
    expect(new List([1]).similar([2])).toEqual(false);
  });

  it('should similar be false to [1] and [2]', () => {
    expect(new List([2]).similar([1])).toEqual(false);
  });

  it('should similar be true to the no value list', () => {
    expect(new List(5).similar(new Array(5))).toEqual(true);
  });

  it('should similar be true to the same list', () => {
    expect(new List(1, 2).similar([1, 2])).toEqual(true);
  });

  it('should similar by default ignore order', () => {
    expect(new List(1, 2, 3).similar([2, 1, 3])).toEqual(true);
  });

  it('should not be similar when a contains b', () => {
    expect(new List(1, 2, 3).similar([1, 2, 3, 4])).toEqual(false);
  });

  it('should not be similar when b contains a', () => {
    expect(new List(1, 2, 3, 4).similar([1, 2, 3])).toEqual(false);
  });

  it('should not be similar when compare list to value', () => {
    expect(new List(1).similar(1)).toEqual(true);
  });

  it('should not be similar when compare list to value', () => {
    expect(new List(1,2).similar(new List(1,new List([2])))).toEqual(true);
  });

  it('should similar be able to compare equal tree structures', () => {
    expect(new List(1, [2], [[3],[[4]]]).similar([1, [2], [[3],[[4]]]])).toEqual(true);
  });

  it('should similar be able to compare diff tree structures', () => {
    expect(new List(1, [2], [[3],[[4]]]).similar([1, [2], [[3],[[5]]]])).toEqual(false);
  });

  it('should similar by option not ignore order', () => {
    expect(new List(1, 2, 3).similar([2,1,3],false)).toEqual(false);
  });

  it('should similar not ignoring order be true to same list in the same order', () => {
    expect(new List(1, 2, 3).similar([1, 2, 3],false)).toEqual(true);
  });

  it('should not similar cast array to element', () => {
    expect(new List(1, [2]).similar([1,2])).toEqual(true);
  });

  it('should not similar cast string to number', () => {
    expect(new List(1, 2).similar([1,'2'])).toEqual(true);
  });

  it('should similar call object similar method', () => {

    class Example {
      constructor( x ) {
        this.x = x;
      }

      equals( otherExample ) {
        return ( this.x > 10 ) === ( otherExample.x > 10 );
      }
    }

    expect(List.cast([new Example(2)]).similar(List.cast([new Example(1)]))).toEqual(true);
    expect(List.cast([new Example(2)]).similar(List.cast([new Example(100)]))).toEqual(false);
  });
});
