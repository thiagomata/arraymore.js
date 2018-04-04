const List = require('../../index');
describe('more', () => {

  it('more of [1,2,3,4,5] 100 => [101,102,103,104,105]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).more(100)).toEqual([ 101, 102, 103, 104, 105 ]);
  });

  it('more of [1,2,3,4,5] => [2,3,4,5,6]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).more()).toEqual([ 2, 3, 4, 5, 6 ]);
  });

  it('more of [101,102,103,104,105] -100 => [1,2,3,4,5]', () => {
    expect(List.cast([101, 102, 103, 104, 105]).more(-100)).toEqual([1, 2, 3, 4, 5]);
  });

  it('more of [] =>  []', () => {
    expect(List.cast([]).more(10)).toEqual([]);
  });

  it('more of new List =>  []', () => {
    expect(new List().more()).toEqual([]);
  });

  it('more(1,"empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).more(1,"empty-list-value")).toEqual("empty-list-value");
  });

  it('more should "work" with letters', () => {
    expect(List.cast(['a','b','c']).more("...")).toEqual(['a...','b...','c...']);
  });
});
