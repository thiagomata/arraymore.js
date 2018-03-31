const List = require('../index');
describe('groupRowsByKey', () => {

  const arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv groupRowsByKey().findRowByKey(10) =  [ 1, 1, 2 ]', () => {
    expect(
      arrKv.groupRowsByKey().findRowByKey(10).value
    ).toEqual([ 1, 1, 2 ]);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.groupRowsByKey()
    ).toEqual([]);
  });
});
