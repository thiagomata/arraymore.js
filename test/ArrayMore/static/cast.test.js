const List = require('../../../index');
describe('cast', () => {

  it('should cast empty array', () => {
    expect(List.cast([])).toEqual(new List());
  });

  it('should cast value array', () => {
    expect(List.cast([1,2,3])).toEqual(new List(1,2,3));
  });

  it('should cast value with empty items', () => {
    expect(List.cast(new Array(10))).toEqual(new List(10));
  });

  it('should cast array of array', () => {
    expect(List.cast(new Array([1,2,3]))).toEqual(new List([1,2,3]));
  });

  it('should cast tree', () => {
    expect(List.cast([1,[2],[[3],4]])).toEqual(new List(1,[2],[[3],4]));
  });

  it('should cast simple values', () => {
    expect(List.cast(1)).toEqual(List.cast([1]));
  });

  it('Casting null shoud create [null]', () => {
    expect(List.cast(null)).toEqual(List.cast([null]));
  });

  it('Casting undefined shoud create [null]', () => {
    expect(List.cast(undefined,true)).toEqual(List.cast([null]));
  });

  it('Casting undefined shoud not create [null] if flag', () => {
    expect(List.cast(undefined,false)).not.toEqual(List.cast([null], false ));
  });

  it('Casting NaN shoud create [null]', () => {
    expect(List.cast(NaN,true)).toEqual(List.cast([null]));
  });

  it('Casting NaN shoud not create [null] if flag', () => {
    expect(List.cast(NaN,false)).not.toEqual(List.cast([null],false));
  });

  it('Casting array with values keep holes', () => {
    let arr = [1,2,3].concat(new Array(3)).concat([7,8,9]);
    let list = List.cast(arr,false,true);
    expect(list.length).toEqual(9);
    // map do not iterates holes
    expect(list.map(x=>1).sum()).toEqual(6);
  });

  it('Casting empty array keep holes', () => {
    let arr = new Array(3).concat(new Array(4));
    let list = List.cast(arr,false,true);
    expect(list.length).toEqual(7);
    // map do not iterates holes
    expect(list.map(x=>1).sum()).toEqual(0);
  });
});
