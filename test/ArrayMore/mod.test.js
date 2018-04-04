const List = require('../../index');
describe('mod', () => {

  it('mod of [1,2,3,4] => [1,0,1,0]', () => {
    expect(List.cast([1,2,3,4]).mod()).toEqual([ 1,0,1,0 ]);
  });

  it('mod of [1,2,3,4] 3 => [1,2,0,1]', () => {
    expect(List.cast([1,2,3,4]).mod(3)).toEqual([ 1, 2, 0, 1 ]);
  });

  it('mod of [] =>  []', () => {
    expect(List.cast([]).mod()).toEqual([]);
  });

  it('mod of new List => []', () => {
    expect(new List().mod()).toEqual([]);
  });

  it('mod("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).mod(2,"empty-list-value")).toEqual("empty-list-value");
  });

  it('mod should replace letters', () => {
    expect(List.cast(['a','b','c']).mod(2,[],3)).toEqual([1,1,1]);
  });
});
