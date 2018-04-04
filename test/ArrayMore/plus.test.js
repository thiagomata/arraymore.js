const List = require('../../index');
describe('plus', () => {

  it('plus of [1,2,3,4,5] 100 => [101,102,103,104,105]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).plus(100)).toEqual([ 101, 102, 103, 104, 105 ]);
  });

  it('plus of [1,2,3,4,5] => [2,3,4,5,6]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).plus()).toEqual([ 2, 3, 4, 5, 6 ]);
  });

  it('plus of [101,102,103,104,105] -100 => [1,2,3,4,5]', () => {
    expect(List.cast([101, 102, 103, 104, 105]).plus(-100)).toEqual([1, 2, 3, 4, 5]);
  });

  it('plus of [] =>  []', () => {
    expect(List.cast([]).plus(10)).toEqual([]);
  });

  it('plus of new List =>  []', () => {
    expect(new List().plus()).toEqual([]);
  });

  it('plus(1,"empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).plus(1,"empty-list-value")).toEqual("empty-list-value");
  });

  it('plus should "work" with letters', () => {
    expect(List.cast(['a','b','c']).plus("...")).toEqual(['a...','b...','c...']);
  });
});
