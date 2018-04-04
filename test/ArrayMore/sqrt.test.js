const List = require('../../index');
describe('sqrt', () => {

  it('sqrt of [4,16,64] => [2,4,8]', () => {
    expect(List.cast([ 4, 16, 64 ]).sqrt()).toEqual([ 2, 4, 8 ]);
  });

  it('sqrt of [] =>  []', () => {
    expect(List.cast([]).sqrt()).toEqual([]);
  });

  it('sqrt of new List => []', () => {
    expect(new List().sqrt()).toEqual([]);
  });

  it('sqrt("empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).sqrt("empty-list-value")).toEqual("empty-list-value");
  });

  it('sqrt should replace letters', () => {
    expect(List.cast(['a','b','c']).sqrt([],16)).toEqual([4,4,4]);
  });
});
