const List = require('../../index');
describe('derivate', () => {

  it('derivate of  [1,2,3,4,5] => [1,1,1,1,1]', () => {
    expect(List.cast([1,2,3,4,5]).derivate()).toEqual(List.cast([1,1,1,1,1]));
  });

  it('derivate of [5,9,12,14,15] => [5,4,3,2,1]', () => {
    expect(List.cast([5,9,12,14,15]).derivate()).toEqual(List.cast([5,4,3,2,1]));
  });

  it('derivate of [] =>  []', () => {
    expect(List.cast([]).derivate()).toEqual(List.cast([]));
  });

  it('derivate of [0,0] =>  [0,0]', () => {
    expect(List.cast([0,0]).derivate()).toEqual(List.cast([0,0]));
  });

  it('derivate of [-1,-3,-6] =>  [-1,-2,-3]', () => {
    expect(List.cast([-1,-3,-6]).derivate()).toEqual(List.cast([-1,-2,-3]));
  });

  it('derivate should not "work" with letters', () => {
    expect(List.cast(['a','b','c']).derivate()).toEqual(List.cast([NaN, NaN, NaN]));
  });

  it('derivate should allow replace NaN by values', () => {
    expect(List.cast([10,'b', 5]).derivate(0)).toEqual(List.cast([10, -10, 5]));
  });
});
