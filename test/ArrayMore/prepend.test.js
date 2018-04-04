const List = require('../../index');
describe('prepend', () => {

  it('[ 1, 2, 3, 4 ] + 5 => [5, 1, 2, 3, 4]', () => {
    expect(List.cast([ 1, 2, 3, 4 ]).prepend(5)).toEqual([ 5, 1, 2, 3, 4 ]);
  });

  it('[] + 1  =>  [1]', () => {
    expect(List.cast([]).prepend(1)).toEqual([1]);
  });

  it('[] + [1]  =>  [[1]]', () => {
    expect(List.cast([]).prepend([1])).toEqual([[1]]);
  });

  it('[] + List[1]  =>  [[1]]', () => {
    expect(List.cast([]).prepend(List.cast([1]))).toEqual([[1]]);
  });

  it('[] + NaN => [NaN]', () => {
    expect(new List().prepend(NaN)).toEqual([NaN]);
  });

  it('[] + null => [null]', () => {
    expect(new List().prepend(null)).toEqual([null]);
  });

  it('[] + [null] => [[null]]', () => {
    expect(new List().prepend([null])).toEqual([[null]]);
  });

});
