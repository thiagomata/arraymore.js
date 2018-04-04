const List = require('../../index');
describe('sum', () => {

  it('sum of [1,1,1,1,1] => 5', () => {
    expect(List.cast([1,1,1,1,1]).sum()).toEqual(5);
  });

  it('sum of [5,4,3,2,1] => 15', () => {
    expect(List.cast([5,4,3,2,1]).sum()).toEqual(15);
  });

  it('sum of [] =>  null', () => {
    expect(List.cast([]).sum()).toEqual(0);
  });

  it('sum of new List =>  0', () => {
    expect(new List().sum()).toEqual(0);
  });

  it('sum of new List null =>  null', () => {
    expect(new List().sum(null)).toEqual(null);
  });

  it('sum("empty-list-value") of [] =>  123', () => {
    expect(List.cast([]).sum("empty-list-value")).toEqual("empty-list-value");
  });

  it('sum should "work" with letters', () => {
    expect(List.cast(['a','b','c']).sum('')).toEqual("abc");
  });

});
