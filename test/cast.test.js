const List = require('../index');
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
    expect(List.cast(undefined)).toEqual(List.cast([null]));
  });

  it('Casting NaN shoud create [null]', () => {
    expect(List.cast(NaN)).toEqual(List.cast([null]));
  });

});