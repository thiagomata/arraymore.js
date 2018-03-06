const List = require('../index');
describe('unique', () => {

  it('should unique of an empty array be an empty array', () => {
    expect(List.cast([]).unique()).toEqual(new List());
  });

  it('should unique value array equals to the array', () => {
    expect(List.cast([1,2,3,1,2,3]).unique()).toEqual(new List(1,2,3));
  });

  it('should unique value array equals to the array', () => {
    expect(List.cast([1,1,1,1,2,2,3]).unique()).toEqual(new List(1,2,3));
  });

  it('should unique value with empty items', () => {
    expect(List.cast(new Array(10)).unique()).toEqual(List.cast([undefined]));
  });

  it('should unique work on tree', () => {
    expect(List.cast([1,[2],[2],[[3],4]]).unique()).toEqual(new List(1,[2],[[3],4]));
  });

  it('should unique simple values', () => {
    expect(List.cast(1).unique()).toEqual(List.cast([1]));
  });

  it('Unique null shoud create [null]', () => {
    expect(List.cast(null).unique()).toEqual(List.cast([null]));
  });

  it('Unique undefined list shoud create [null]', () => {
    expect(List.cast(undefined).unique()).toEqual(List.cast([null]));
  });

  it('Casting NaN shoud create [null]', () => {
    expect(List.cast(NaN).unique()).toEqual(List.cast([null]));
  });

});
