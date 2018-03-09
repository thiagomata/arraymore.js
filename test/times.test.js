const List = require('../index');
describe('times', () => {

  it('times of [1,2,3,4,5] 2 => [2,4,6,8,10]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).times(2)).toEqual([ 2, 4, 6, 8, 10 ]);
  });

  it('times of [1,2,3,4,5] => [1,2,3,4,5]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).times()).toEqual([ 1, 2, 3, 4, 5 ]);
  });

  it('times of [10,20,30,40,50] 1/10  => [1,2,3,4,5]', () => {
    expect(List.cast([10, 20, 30, 40, 50]).times(1/10)).toEqual([1, 2, 3, 4, 5]);
  });

  it('times of [] =>  []', () => {
    expect(List.cast([]).times(10)).toEqual([]);
  });

  it('times of new List => []', () => {
    expect(new List().times()).toEqual([]);
  });

  it('times(1,"empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).times(1,"empty-list-value")).toEqual("empty-list-value");
  });

  it('times should "work" with letters', () => {
    expect(List.cast(['a','b','c']).times(10,[],10)).toEqual([100,100,100]);
  });
});
