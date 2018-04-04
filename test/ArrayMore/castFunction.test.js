const List = require('../../index');
describe('castFunction', () => {

  it('castFunction of 1 => 1', () => {
    expect(new List().castFunction(1)).toEqual(1);
  });

  it('castFunction of null => null', () => {
    expect(new List().castFunction(null)).toEqual(null);
  });

  it('castFunction of undefined => undefined', () => {
    expect(new List().castFunction(undefined)).toEqual(undefined);
  });

  it('castFunction of [1,2,3] => [1,2,3]', () => {
    expect(new List().castFunction([1,2,3])).toEqual([1,2,3]);
  });

  it('castFunction of l.length = 0', () => {
    expect(new List().castFunction(l => l.length)).toEqual(0);
  });

  it('castFunction of l = [1,2,3]', () => {
    expect(new List(1,2,3).castFunction(l => l)).toEqual(new List(1,2,3));
  });

  it('castFunction of l = [1,2,3]', () => {
    expect(new List(1,2,3).castFunction(l => [4,5,6])).toEqual(new List(4,5,6));
  });
});
