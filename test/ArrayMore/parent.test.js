const List = require('../../index');
describe('accumulate', () => {

  it('parent test concat', () => {
    expect(new List(1,2,3).parent().concat.name).toEqual("bound concat");
  });
  it('parent test copyWithin', () => {
    expect(new List(1,2,3).parent().copyWithin.name).toEqual("bound copyWithin");
  });
  it('parent test entries', () => {
    expect(new List(1,2,3).parent().entries.name).toEqual("bound entries");
  });
  it('parent test every', () => {
    expect(new List(1,2,3).parent().every.name).toEqual("bound every");
  });
  it('parent test fill', () => {
    expect(new List(1,2,3).parent().fill.name).toEqual("bound fill");
  });
  it('parent test filter', () => {
    expect(new List(1,2,3).parent().filter.name).toEqual("bound filter");
  });
  it('parent test find', () => {
    expect(new List(1,2,3).parent().find.name).toEqual("bound find");
  });
  it('parent test findIndex', () => {
    expect(new List(1,2,3).parent().findIndex.name).toEqual("bound findIndex");
  });
  it('parent test forEach', () => {
    expect(new List(1,2,3).parent().forEach.name).toEqual("bound forEach");
  });
  it('parent test includes', () => {
    expect(new List(1,2,3).parent().includes.name).toEqual("bound includes");
  });
  it('parent test indexOf', () => {
    expect(new List(1,2,3).parent().indexOf.name).toEqual("bound indexOf");
  });
  it('parent test join', () => {
    expect(new List(1,2,3).parent().join.name).toEqual("bound join");
  });
  it('parent test keys', () => {
    expect(new List(1,2,3).parent().keys.name).toEqual("bound keys");
  });
  it('parent test lastIndexOf', () => {
    expect(new List(1,2,3).parent().lastIndexOf.name).toEqual("bound lastIndexOf");
  });
  it('parent test map', () => {
    expect(new List(1,2,3).parent().map.name).toEqual("bound map");
  });
  it('parent test pop', () => {
    expect(new List(1,2,3).parent().pop.name).toEqual("bound pop");
  });
  it('parent test push', () => {
    expect(new List(1,2,3).parent().push.name).toEqual("bound push");
  });
  it('parent test reduce', () => {
    expect(new List(1,2,3).parent().reduce.name).toEqual("bound reduce");
  });
  it('parent test reduceRight', () => {
    expect(new List(1,2,3).parent().reduceRight.name).toEqual("bound reduceRight");
  });
  it('parent test reverse', () => {
    expect(new List(1,2,3).parent().reverse.name).toEqual("bound reverse");
  });
  it('parent test shift', () => {
    expect(new List(1,2,3).parent().shift.name).toEqual("bound shift");
  });
  it('parent test slice', () => {
    expect(new List(1,2,3).parent().slice.name).toEqual("bound slice");
  });
  it('parent test some', () => {
    expect(new List(1,2,3).parent().some.name).toEqual("bound some");
  });
  it('parent test sort', () => {
    expect(new List(1,2,3).parent().sort.name).toEqual("bound sort");
  });
  it('parent test splice', () => {
    expect(new List(1,2,3).parent().splice.name).toEqual("bound splice");
  });
  it('parent test unshift', () => {
    expect(new List(1,2,3).parent().unshift.name).toEqual("bound unshift");
  });
});
