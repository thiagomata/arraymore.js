const List = require('../../index');
describe('groupKeysByValue', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv groupKeysByValue().findRowByKey(1) =  [ 10, 10, 8 ]', () => {
    expect(
      arrKv.groupKeysByValue().findRowByKey(1).value
    ).toEqual([ 10, 10, 8 ]);
  });

  it('arrKv countRowsByValue().findRowByKey(1) =  3', () => {
    expect(
      arrKv.countRowsByValue().findRowByKey(1).value
    ).toEqual(3);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.getKeys()
    ).toEqual([]);
  });
});
