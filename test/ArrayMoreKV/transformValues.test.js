const List = require('../../index');
describe('transformValues', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv transformValues( + 100 ).getValues() == arrKv.getValues.sum(100) ', () => {
    expect(
      arrKv.transformValues( value => value + 100 ).getValues().equals(
        arrKv.getValues().more(100)
      )
    ).toEqual(
      true
    );
  });

  it('arrKv transformValues().getValues() == arrKv.getValues ', () => {
    expect(
      arrKv.transformValues().getValues().equals(
        arrKv.getValues()
      )
    ).toEqual(
      true
    );
  });
});
