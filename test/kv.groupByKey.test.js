const List = require('../index');
describe('groupRowsByKey', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  var emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv groupRowsByKey().findRowByKey(1) =  [ 10, 10, 8 ]', () => {
    expect(
      arrKv.groupRowsByKey().findRowByKey(1).value
    ).toEqual([ 10, 10, 8 ]);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.groupRowsByKey()
    ).toEqual([]);
  });
});
