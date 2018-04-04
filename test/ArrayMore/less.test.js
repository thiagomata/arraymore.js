const List = require('../../index');
describe('less', () => {

  it('less of [101,102,103,104,105] 100 => [1,2,3,4,5]', () => {
    expect(List.cast([101, 102, 103, 104, 105]).less(100)).toEqual([1, 2, 3, 4, 5]);
  });

  it('less of [1,2,3,4,5] -100 => [101,102,103,104,105]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).less(-100)).toEqual([ 101, 102, 103, 104, 105 ]);
  });

  it('less of [1,2,3,4,5] => [0,1,2,3,4]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).less()).toEqual([ 0, 1, 2, 3, 4 ]);
  });

  it('less of [] =>  []', () => {
    expect(List.cast([]).less(10)).toEqual([]);
  });

  it('less of new List =>  null', () => {
    expect(new List().less()).toEqual([]);
  });

  it('less(1,"empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).less(1,"empty-list-value")).toEqual("empty-list-value");
  });

  it('less should cast letters', () => {
    expect(List.cast(['a','b','c']).less(1,[],10)).toEqual([9,9,9]);
  });
});
