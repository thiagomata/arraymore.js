const List = require('../index');
describe('normalizeValues', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv normalizeValues( 100 ).getValues() == arrKv.getValues().normalize(100) ', () => {
    expect(
      arrKv.normalizeValues( 100 ).getValues().equals(
        arrKv.getValues().normalize(100)
      )
    ).toEqual(
      true
    );
  });

  it('arrKv normalizeValues().getValues() == arrKv.getValues.normalize() ', () => {
    expect(
      arrKv.normalizeValues().getValues().equals(
        arrKv.getValues().normalize()
      )
    ).toEqual(
      true
    );
  });
});
