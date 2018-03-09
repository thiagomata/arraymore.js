const List = require('../index');
describe('round', () => {

  it('round of [1.1,2.2,3.3, 3.7, 4.8] => [1, 2, 3, 4, 5]', () => {
    expect(List.cast([ 1.1, 2.2, 3.3, 3.7, 4.8]).round()).toEqual([ 1, 2, 3, 4, 5 ]);
  });

  it('round of [] =>  []', () => {
    expect(List.cast([]).round()).toEqual([]);
  });

  it('round of new List => []', () => {
    expect(new List().round()).toEqual([]);
  });

  it('round("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).round("empty-list-value")).toEqual("empty-list-value");
  });

  it('round should replace letters', () => {
    expect(List.cast(['a','b','c']).round([],123)).toEqual([123,123,123]);
  });
});
