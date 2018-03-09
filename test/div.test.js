const List = require('../index');
describe('div', () => {

  it('div of [2,4,6,8,10] 2 => [1,2,3,4,5]', () => {
    expect(List.cast([ 2, 4, 6, 8, 10 ]).div(2)).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('div of [1,2,3,4,5] => [1,2,3,4,5]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).div()).toEqual([ 1, 2, 3, 4, 5 ]);
  });

  it('div of [10,20,30,40,50] 10  => [1,2,3,4,5]', () => {
    expect(List.cast([10, 20, 30, 40, 50]).div(10)).toEqual([1, 2, 3, 4, 5]);
  });

  it('div of [] =>  []', () => {
    expect(List.cast([]).div(10)).toEqual([]);
  });

  it('div of new List => []', () => {
    expect(new List().div()).toEqual([]);
  });

  it('div(1,"empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).div(1,"empty-list-value")).toEqual("empty-list-value");
  });

  it('div should "work" with letters', () => {
    expect(List.cast(['a','b','c']).div(10,[],10)).toEqual([1,1,1]);
  });
});
