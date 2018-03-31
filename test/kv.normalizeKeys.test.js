const List = require('../index');
describe('normalizeKeys', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv normalizeKeys( 100 ).getKeys() == arrKv.getKeys().normalize(100) ', () => {
    expect(
      arrKv.normalizeKeys( 100 ).getKeys().equals(
        arrKv.getKeys().normalize(100)
      )
    ).toEqual(
      true
    );
  });

  it('arrKv normalizeKeys().getKeys() == arrKv.getKeys.normalize() ', () => {
    expect(
      arrKv.normalizeKeys().getKeys().equals(
        arrKv.getKeys().normalize()
      )
    ).toEqual(
      true
    );
  });
});
