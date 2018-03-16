const List = require('../index');
describe('round', () => {

  it('round of [1.1,2.2,3.3, 3.7, 4.8] => [1, 2, 3, 4, 5]', () => {
    expect(List.cast([ 1.1, 2.2, 3.3, 3.7, 4.8]).round()).toEqual([ 1, 2, 3, 4, 5 ]);
  });

  it('round of [1.11,2.22,3.333, 3.77, 4.89] => [1.1, 2.2, 3.3, 3.8, 4.9]', () => {
    expect(List.cast([1.11,2.22,3.33, 3.77, 4.89]).round(1)).toEqual([1.1, 2.2, 3.3, 3.8, 4.9]);
  });

  it('round of [] =>  []', () => {
    expect(List.cast([]).round()).toEqual([]);
  });

  it('round of new List => []', () => {
    expect(new List().round()).toEqual([]);
  });

  it('round("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).round(0,"empty-list-value")).toEqual("empty-list-value");
  });

  it('round should replace letters', () => {
    expect(List.cast(['a','b','c']).round(0,[],123)).toEqual([123,123,123]);
  });
});
