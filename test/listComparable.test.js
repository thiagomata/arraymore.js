const List = require('../index');
describe('listComparable', () => {

  it('should listComparable empty array with empty listList.listComparable(', () => {
    expect(List.listComparable(List.cast([]),new List())).toEqual(true);
  });

  it('should listComparable consider equals empty list and empty arrayList.listComparable(', () => {
    expect(List.listComparable(List.cast([]),[])).toEqual(true);
  });

  it('should listComparable empty array fail with list with valueList.listComparable(', () => {
    expect(List.listComparable(List.cast([]),List.cast([1]))).toEqual(false);
  });

  it('should listComparable empty array fail with list with empty valueList.listComparable(', () => {
    expect(List.listComparable(List.cast([]),new List(1))).toEqual(false);
  });

  it('should listComparable empty array fail with array with no valueList.listComparable(', () => {
    expect(List.listComparable(List.cast([]),new Array(1))).toEqual(false);
  });

  it('should listComparable empty array fail with array with valueList.listComparable(', () => {
    expect(List.listComparable(List.cast([]),[1])).toEqual(false);
  });

  it('should listComparable be true to the same list with values', () => {
    expect(List.listComparable(List.cast([1,2,3]),new List(1,2,3))).toEqual(true);
  });

  it('should listComparable ignore elements order by default', () => {
    expect(List.listComparable(List.cast([1,2,3]),new List(1,3,2))).toEqual(true);
  });

  it('should listComparable not cast elements type by default', () => {
    expect(List.listComparable(List.cast([1,2,3]),new List(1,'2',3))).toEqual(false);
  });

  it('should listComparable ignore elements order by explicity set', () => {
    expect(List.listComparable(List.cast([1,2,3]),new List(1,2,3),false,false)).toEqual(true);
  });

  it('should listComparable not ignore elements order by explicity set', () => {
    expect(List.listComparable(List.cast([1,2,3]),new List(1,3,2),false,false)).toEqual(false);
  });

  it('should listComparable not cast elements by explicity set', () => {
    expect(List.listComparable(List.cast([1,'2',3]),new List(1,2,3),false,false)).toEqual(false);
  });

  it('should listComparable cast elements by explicity set', () => {
    expect(List.listComparable(List.cast([1,'2',3]),new List(1,2,3),true ,false)).toEqual(true);
  });
});
