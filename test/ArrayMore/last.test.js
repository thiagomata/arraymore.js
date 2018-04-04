const List = require('../../index');
describe('last', () => {

  it('last of [1,2,3,4,5] => 5', () => {
    expect(List.cast([1,2,3,4,5]).last()).toEqual(5);
  });

  it('last of [5,4,3,2,1] => 1', () => {
    expect(List.cast([5,4,3,2,1]).last()).toEqual(1);
  });

  it('last of [] =>  null', () => {
    expect(List.cast([]).last()).toEqual(null);
  });

  it('last of new List =>  null', () => {
    expect(new List().last()).toEqual(null);
  });

  it('last("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).last("empty-list-value")).toEqual("empty-list-value");
  });

  it('last should "work" with letters', () => {
    expect(List.cast(['a','b','c']).last()).toEqual('c');
  });
});
