const List = require('../../index');
describe('append', () => {

  it('[ 1, 2, 3, 4 ] + 5 => [1, 2, 3, 4, 5]', () => {
    expect(List.cast([ 1, 2, 3, 4 ]).append(5)).toEqual([ 1, 2, 3, 4, 5 ]);
  });

  it('[] + 1  =>  [1]', () => {
    expect(List.cast([]).append(1)).toEqual([1]);
  });

  it('[] + [1]  =>  [[1]]', () => {
    expect(List.cast([]).append([1])).toEqual([[1]]);
  });

  it('[] + List[1]  =>  [[1]]', () => {
    expect(List.cast([]).append(List.cast([1]))).toEqual([[1]]);
  });

  it('[] + NaN => [NaN]', () => {
    expect(new List().append(NaN)).toEqual([NaN]);
  });

  it('[] + null => [null]', () => {
    expect(new List().append(null)).toEqual([null]);
  });

  it('[] + [null] => [[null]]', () => {
    expect(new List().append([null])).toEqual([[null]]);
  });

});
