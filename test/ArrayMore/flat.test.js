const List = require('../../index');
describe('flat', () => {

  it('flat of [[1],[2],[3],[4],[5]] => [1,2,3,4,5]', () => {
    expect(List.cast([[1],[2],[3],[4],[5]]).flat()).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('flat of [1,2,3,4,5]  => [1,2,3,4,5]', () => {
    expect(List.cast([1,2,3,4,5]).flat()).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('flat of [1,2,3,4,5]  => [1,2,3,4,5]', () => {
    expect(List.cast([1,2,3,4,x => x.length]).flat()).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('flat of [[1],[2],[3],[4],[[5]]] 2 => [1,2,3,4,5]', () => {
    expect(List.cast([[1],[2],[3],[4],[[5]]]).flat()).toEqual([ 1, 2, 3, 4, [5]]);
  });

  it('flat deep of [[1],[2],[3],[4],[[5]]] 2 => [1,2,3,4,5]', () => {
    expect(List.cast([[1],[[2]],[[[3]]],[[[[4]]]],[[[[[5]]]]]]).flat(true)).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('flat deep of [[1],[2],[3],[4],[[5]]] 2 => [1,2,3,4,5]', () => {
    expect(List.cast([[1],[[2]],[[[3]]],[[[[4]]]],[[[[[x=>x.length]]]]]]).flat(true)).toEqual([ 1, 2, 3, 4, 5]);
  });

  it('flat of [] =>  []', () => {
    expect(List.cast([]).flat()).toEqual([]);
  });

  it('flat deep of [x=>x.length,[x=>x.length],[[x=>x.length]]] =>  [3,3,3]', () => {
    expect(List.cast([x=>x.length,[x=>x.length],[[x=>x.length]]]).flat(true)).toEqual([3,3,3]);
  });

  it('flat of [1,l => l.length] =>  [1,2]', () => {
    expect(List.cast([1,l => l.length]).flat()).toEqual([1,2]);
  });

  it('flat of [1,[[l => l.length]]] =>  [1,2]', () => {
    expect(List.cast([1,[[l => l.length]]]).flat(true)).toEqual([1,2]);
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
