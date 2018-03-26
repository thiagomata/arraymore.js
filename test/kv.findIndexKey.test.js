const List = require('../index');
describe('findIndexKey', () => {

  const arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(4,5,6,7,8,9,10)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv findIndexKey 3 = 2 ', () => {
    expect(
      arrKv.findIndexKey(3)
    ).toEqual(2);
  });

  it('arrKv findIndexKey 100 = -1 ', () => {
    expect(
      arrKv.findIndexKey(100)
    ).toEqual(-1);
  });

  it('emptyArrKv findIndexKey 1 = -1 ', () => {
    expect(
      emptyArrKv.findIndexKey(1)
    ).toEqual(-1);
  });
});
