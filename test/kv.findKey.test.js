const List = require('../index');
describe('findKey', () => {

  const arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(4,5,6,7,8,9,10)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv findKey 3 = {key:3,value:6} ', () => {
    expect(
      arrKv.findKey(3)
    ).toEqual({key:3,value:6});
  });

  it('arrKv findKey 100 = undefined ', () => {
    expect(
      arrKv.findKey(100)
    ).toEqual(undefined);
  });

  it('emptyArrKv findKey 1 = undefined ', () => {
    expect(
      emptyArrKv.findKey(1)
    ).toEqual(undefined);
  });
});
