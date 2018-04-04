const List = require('../../index');
describe('sortByValue', () => {

  var arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(10,5,6,10,8,9,10)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv flip().getvalues() =  arrKv getKeys()', () => {
    expect(
      arrKv.flip().getValues()
    ).toEqual(arrKv.getKeys());
  });

  it('arrKv flip().getKeys() =  arrKv getValues()', () => {
    expect(
      arrKv.flip().getKeys()
    ).toEqual(arrKv.getValues());
  });

});
