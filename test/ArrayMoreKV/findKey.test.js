const List = require('../../index');
describe('findRowByKey', () => {

  const arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(4,5,6,7,8,9,10)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv findRowByKey 3 = {key:3,value:6} ', () => {
    expect(
      arrKv.findRowByKey(3)
    ).toEqual({key:3,value:6});
  });

  it('arrKv findRowByKey 100 = undefined ', () => {
    expect(
      arrKv.findRowByKey(100)
    ).toEqual(undefined);
  });

  it('emptyArrKv findRowByKey 1 = undefined ', () => {
    expect(
      emptyArrKv.findRowByKey(1)
    ).toEqual(undefined);
  });
});
