const List = require('../index');
describe('range', () => {

  it('should range with one value return the list with 0 to value - 1', () => {
    expect(List.range(10)).toEqual(new List(0,1,2,3,4,5,6,7,8,9));
  });

  it('should range of no interval creates empty array', () => {
    expect(List.range(0,0)).toEqual(new List());
  });

  it('should range create a simple interval', () => {
    expect(List.range(1,10)).toEqual(new List(1,2,3,4,5,6,7,8,9));
  });

  it('should range create a decrement interval', () => {
    expect(List.range(10,1)).toEqual(new List(10,9,8,7,6,5,4,3,2));
  });

  it('should range with step diff 2', () => {
    expect(List.range(10, 1, 2)).toEqual(new List(10,8,6,4,2));
  });

  it('should range with step negative', () => {
    expect(List.range(10, 1, -2)).toEqual(new List(10,8,6,4,2));
  });

  it('should range with step really big', () => {
    expect(List.range(1, 10, 1000)).toEqual(List.cast( 1 ));
  });
});
