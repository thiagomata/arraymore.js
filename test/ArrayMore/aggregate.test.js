const List = require('../../index');
describe('aggregate', () => {

  it('aggregate of [1,2,3,4,5,6,7,8] + [1,2,3]', () => {
    expect(List.cast([1,2,3,4,5,6,7,8]).aggregate([1,2,3])).toEqual([2,4,6,4,5,6,7,8]);
  });

  it('aggregate of [1,2,3] + [1,2,3,4,5,6,7,8]', () => {
    expect(List.cast([1,2,3]).aggregate([1,2,3,4,5,6,7,8])).toEqual([2,4,6,4,5,6,7,8]);
  });

  it('aggregate of [1,2,3] + [1,2,3,4,5,6,7,8]', () => {
    expect(
      List.
        cast([1,2,3]).
        aggregate(
          [1,2,3,4,5,6,7,8],
          (x,y)=>x*y)
    ).toEqual(
      [1,4,9,4,5,6,7,8]
    );
  });

  it('aggregate of [1,2,3] + [1,2,3,4,5,6,7,8,9]', () => {
    expect(
      List.
        cast([8,1,8]).
        aggregate(
          [1,2,3,4,5,6,7,8],
          (x,y)=>Math.max(x,y),
          (x)=>100
        )
    ).toEqual(
      [8,2,8,100,100,100,100,100]
    );
  });
});
