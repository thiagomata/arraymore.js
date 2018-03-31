const List = require('../index');
describe('findRowByValue', () => {

  const arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(4,5,6,7,8,9,10)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv findRowByValue 6 = {key:3,value:6} ', () => {
    expect(
      arrKv.findRowByValue(6)
    ).toEqual({key:3,value:6});
  });

  it('arrKv findRowByValue 100 = undefined ', () => {
    expect(
      arrKv.findRowByValue(100)
    ).toEqual(undefined);
  });

  it('emptyArrKv findRowByValue 1 = undefined ', () => {
    expect(
      emptyArrKv.findRowByValue(1)
    ).toEqual(undefined);
  });
});
