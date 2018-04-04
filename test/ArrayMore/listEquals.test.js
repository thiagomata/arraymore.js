const List = require('../../index');
describe('listEquals', () => {

  it('should listEquals empty array with empty listList.listEquals(', () => {
    expect(List.listEquals(List.cast([]),new List())).toEqual(true);
  });

  it('should listEquals consider equals empty list and empty arrayList.listEquals(', () => {
    expect(List.listEquals(List.cast([]),[])).toEqual(true);
  });

  it('should listEquals empty array fail with list with valueList.listEquals(', () => {
    expect(List.listEquals(List.cast([]),List.cast([1]))).toEqual(false);
  });

  it('should listEquals empty array fail with list with empty valueList.listEquals(', () => {
    expect(List.listEquals(List.cast([]),new List(1))).toEqual(false);
  });

  it('should listEquals empty array fail with array with no valueList.listEquals(', () => {
    expect(List.listEquals(List.cast([]),new Array(1))).toEqual(false);
  });

  it('should listEquals empty array fail with array with valueList.listEquals(', () => {
    expect(List.listEquals(List.cast([]),[1])).toEqual(false);
  });

  it('should listEquals be true to the same list with values', () => {
    expect(List.listEquals(List.cast([1,2,3]),new List(1,2,3))).toEqual(true);
  });

  it('should listEquals ignore elements order by default', () => {
    expect(List.listEquals(List.cast([1,2,3]),new List(1,3,2))).toEqual(true);
  });

  it('should listEquals not cast elements type by default', () => {
    expect(List.listEquals(List.cast([1,2,3]),new List(1,'2',3))).toEqual(false);
  });

  it('should listEquals ignore elements order by explicity set', () => {
    expect(List.listEquals(List.cast([1,2,3]),new List(1,2,3),false,false)).toEqual(true);
  });

  it('should listEquals not ignore elements order by explicity set', () => {
    expect(List.listEquals(List.cast([1,2,3]),new List(1,3,2),false,false)).toEqual(false);
  });

  it('should listEquals not cast elements by explicity set', () => {
    expect(List.listEquals(List.cast([1,'2',3]),new List(1,2,3),false,false)).toEqual(false);
  });

  it('should listEquals cast elements by explicity set', () => {
    expect(List.listEquals(List.cast([1,'2',3]),new List(1,2,3),true ,false)).toEqual(true);
  });
});
