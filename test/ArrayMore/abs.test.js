const List = require('../../index');
describe('abs', () => {

  it('abs of [-1,-2,-3, 4, 5] => [1, 2, 3, 4, 5]', () => {
    expect(List.cast([ -1, -2, -3, 4, 5]).abs()).toEqual([ 1, 2, 3, 4, 5 ]);
  });

  it('abs of [] =>  []', () => {
    expect(List.cast([]).abs()).toEqual([]);
  });

  it('abs of new List => []', () => {
    expect(new List().abs()).toEqual([]);
  });

  it('abs("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).abs("empty-list-value")).toEqual("empty-list-value");
  });

  it('abs should replace letters', () => {
    expect(List.cast(['a','b','c']).abs([],123)).toEqual([123,123,123]);
  });
});
