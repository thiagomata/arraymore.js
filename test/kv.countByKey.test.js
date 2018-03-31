const List = require('../index');
describe('countRowsByKey', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  var emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv countRowsByKey().findRowByKey(10) =  [ 1, 1, 2 ]', () => {
    expect(
      arrKv.countRowsByKey().findRowByKey(10).value
    ).toEqual(3);
  });

  it('arrKv countRowsByKey().findRowByKey(10) =  3', () => {
    expect(
      arrKv.countRowsByKey().findRowByKey(10).value
    ).toEqual(3);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.countRowsByKey()
    ).toEqual([]);
  });
});
