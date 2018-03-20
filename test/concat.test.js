const List = require('../index');
describe('concat', () => {

  it('simple concat [1] + [2] = [1,2] ', () => {
    expect(List.cast(1).concat(List.cast(2))).toEqual(new List(1,2));
  });

  it('simple concat [1] + 2 = [1,2] ', () => {
    expect(List.cast(1).concat(2)).toEqual(new List(1,2));
  });

  it('concat [1,2,3] + [] = [1,2,3]', () => {
    expect(List.cast([1,2,3]).concat(List.cast([]))).toEqual(new List(1,2,3));
  });

  it('concat [1,2,3] + ([]) = [1,2,3]', () => {
    expect(List.cast([1,2,3]).concat(new List())).toEqual(new List(1,2,3));
  });

  it('concat [1,2,3] + reverse = [1,2,3,3,2,1]', () => {
    expect(List.cast([1,2,3]).concat( l => l.reverse() ) ).toEqual(new List(1,2,3,3,2,1));
  });

  it('concat [1,2,3] + -list = [1,2,3,-1,-2,-3]', () => {
    expect(List.cast([1,2,3]).concat( l => l.times(-1) ) ).toEqual(new List(1,2,3,-1,-2,-3));
  });

  it('empty concat [1,2,3].concat() = [1,2,3]', () => {
    expect(List.cast([1,2,3]).concat()).toEqual(new List(1,2,3));
  });

  it('repeat value [1,2,3] + [1,2,3] = [1,2,3,1,2,3]', () => {
    expect(List.cast([1,2,3]).concat([1,2,3])).toEqual(List.cast([1,2,3,1,2,3]));
  });

  it('repeat value as element ([1,2,3]) + ([1,2,3]) = [([1,2,3]),([1,2,3])]', () => {
    expect(List.cast([[1,2,3]]).concat([[1,2,3]])).toEqual(List.cast([[1,2,3],[1,2,3]]));
  });

  it('null concat [1,2,3] + null = [1,2,3,null]', () => {
    expect(List.cast([1,2,3]).concat(null)).toEqual(List.cast([1,2,3,null]));
  });

  it('null concat [1,2,3] + undefined = [1,2,3]', () => {
    expect(List.cast(new Array([1,2,3])).concat(undefined)).toEqual(new List([1,2,3]));
  });

  it('null concat [1,2,3] + NaN = [1,2,3,NaN]', () => {
    expect(List.cast(new Array(1,2,3)).concat(NaN)).toEqual(new List(1,2,3,NaN));
  });

  it('null on trees', () => {
    expect(List.cast([1,[2],[[3],4]]).concat([[[5]]])).toEqual(new List(1,[2],[[3],4],[[5]]));
  });
});
