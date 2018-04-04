const List = require('../../index');
describe('avg', () => {

  it('avg of [1,1,1,1,1] => 1', () => {
    expect(List.cast([1,1,1,1,1]).avg()).toEqual(1);
  });

  it('avg of [5,4,3,2,1] => 15', () => {
    expect(List.cast([5,4,3,2,1]).avg()).toEqual(3);
  });

  it('avg of [] =>  null', () => {
    expect(List.cast([]).avg()).toEqual(null);
  });

  it('avg of new List =>  null', () => {
    expect(new List().avg()).toEqual(null);
  });

  it('avg("empty-list-value") of [] =>  123', () => {
    expect(List.cast([]).avg("empty-list-value")).toEqual("empty-list-value");
  });

  it('avg should not "work" with letters', () => {
    expect(List.cast(['a','b','c']).avg()).toEqual(NaN);
  });
});
