const List = require('../index');
describe('flat', () => {

  it('flat of [[1],[2],[3],[4],[5]] => [1,2,3,4,5]', () => {
    expect(List.cast([[1],[2],[3],[4],[5]]).flat()).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('flat of [1,2,3,4,5]  => [1,2,3,4,5]', () => {
    expect(List.cast([1,2,3,4,5]).flat()).toEqual([ 1, 2, 3, 4, 5]);
  });
  it('flat of [[1],[2],[3],[4],[[5]]] 2 => [1,2,3,4,5]', () => {
    expect(List.cast([[1],[2],[3],[4],[[5]]]).flat()).toEqual([ 1, 2, 3, 4, [5]]);
  });

  it('flat of [] =>  []', () => {
    expect(List.cast([]).flat()).toEqual([]);
  });

  it('flat of new List => []', () => {
    expect(new List().flat()).toEqual([]);
  });

  it('flat(1,"empty-list-value") of [] =>  "empty-list-value"', () => {
    expect(List.cast([]).flat()).toEqual([]);
  });

  it('flat should "work" with letters', () => {
    expect(List.cast(['a',['b'],['c']]).flat()).toEqual(['a','b','c']);
  });
});
