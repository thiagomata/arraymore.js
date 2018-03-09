const List = require('../index');
describe('first', () => {

  it('first of [1,2,3,4,5] => 1', () => {
    expect(List.cast([1,2,3,4,5]).first()).toEqual(1);
  });

  it('first of [5,4,3,2,1] => 5', () => {
    expect(List.cast([5,4,3,2,1]).first()).toEqual(5);
  });

  it('first of [] =>  null', () => {
    expect(List.cast([]).first()).toEqual(null);
  });

  it('first of new List =>  null', () => {
    expect(new List().first()).toEqual(null);
  });

  it('first("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).first("empty-list-value")).toEqual("empty-list-value");
  });

  it('first should "work" with letters', () => {
    expect(List.cast(['a','b','c']).first()).toEqual('a');
  });
});
