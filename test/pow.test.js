const List = require('../index');
describe('pow', () => {

  it('pow of [2,4,8] => [4,16,64]', () => {
    expect(List.cast([2,4,8]).pow()).toEqual([ 4, 16, 64 ]);
  });

  it('pow of [1,2,3] => [1,8,27]', () => {
    expect(List.cast([1,2,3]).pow(3)).toEqual([ 1, 8, 27 ]);
  });

  it('pow of [] =>  []', () => {
    expect(List.cast([]).pow()).toEqual([]);
  });

  it('pow of new List => []', () => {
    expect(new List().pow()).toEqual([]);
  });

  it('pow("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).pow(2,"empty-list-value")).toEqual("empty-list-value");
  });

  it('pow should replace letters', () => {
    expect(List.cast(['a','b','c']).pow(2,[],3)).toEqual([9,9,9]);
  });
});
