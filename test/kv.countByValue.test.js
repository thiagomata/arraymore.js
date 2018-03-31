const List = require('../index');
describe('countRowsByValue', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv countRowsByValue().findRowByKey(1) =  3', () => {
    expect(
      arrKv.countRowsByValue().findRowByKey(1).value
    ).toEqual(3);
  });

  it('arrKv countRowsByValue().findRowByKey(2) =  3', () => {
    expect(
      arrKv.countRowsByValue().findRowByKey(2).value
    ).toEqual(3);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.getKeys()
    ).toEqual([]);
  });
});
