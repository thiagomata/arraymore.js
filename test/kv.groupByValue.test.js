const List = require('../index');
describe('groupByValue', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv groupByValue().findKey(1) =  [ 10, 10, 8 ]', () => {
    expect(
      arrKv.groupByValue().findKey(1).value
    ).toEqual([ 10, 10, 8 ]);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.getKeys()
    ).toEqual([]);
  });
});
