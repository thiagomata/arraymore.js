const List = require('../index');
describe('listComparable', () => {

  it('should listComparable empty array with empty list', () => {
    expect(List.cast([]).listComparable(new List())).toEqual(true);
  });

  it('should listComparable consider equals empty list and empty array', () => {
    expect(List.cast([]).listComparable([])).toEqual(true);
  });

  it('should listComparable empty array fail with list with value', () => {
    expect(List.cast([]).listComparable(List.cast([1]))).toEqual(false);
  });

  it('should listComparable empty array fail with list with empty value', () => {
    expect(List.cast([]).listComparable(new List(1))).toEqual(false);
  });

  it('should listComparable empty array fail with array with no value', () => {
    expect(List.cast([]).listComparable(new Array(1))).toEqual(false);
  });

  it('should listComparable empty array fail with array with value', () => {
    expect(List.cast([]).listComparable([1])).toEqual(false);
  });

  it('should listComparable be true to the same list with values', () => {
    expect(List.cast([1,2,3]).listComparable(new List(1,2,3))).toEqual(true);
  });

  it('should listComparable ignore elements order by default', () => {
    expect(List.cast([1,2,3]).listComparable(new List(1,3,2))).toEqual(true);
  });

  it('should listComparable not cast elements type by default', () => {
    expect(List.cast([1,2,3]).listComparable(new List(1,'2',3))).toEqual(false);
  });

  it('should listComparable ignore elements order by explicity set', () => {
    expect(List.cast([1,2,3]).listComparable(new List(1,2,3),false,false)).toEqual(true);
  });

  it('should listComparable not ignore elements order by explicity set', () => {
    expect(List.cast([1,2,3]).listComparable(new List(1,3,2),false,false)).toEqual(false);
  });

  it('should listComparable not cast elements by explicity set', () => {
    expect(List.cast([1,'2',3]).listComparable(new List(1,2,3),false,false)).toEqual(false);
  });

  it('should listComparable cast elements by explicity set', () => {
    expect(List.cast([1,'2',3]).listComparable(new List(1,2,3),true ,false)).toEqual(true);
  });
});
