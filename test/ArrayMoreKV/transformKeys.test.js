const List = require('../../index');
describe('transformKeys', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv transformKeys( + 100 ).getKeys == arrKv.getKeys.sum(100) ', () => {
    expect(
      arrKv.transformKeys( key => key + 100 ).getKeys().equals(
        arrKv.getKeys().more(100)
      )
    ).toEqual(
      true
    );
  });

  it('arrKv transformKeys().getKeys == arrKv.getKeys ', () => {
    expect(
      arrKv.transformKeys().getKeys().equals(
        arrKv.getKeys()
      )
    ).toEqual(
      true
    );
  });
});
