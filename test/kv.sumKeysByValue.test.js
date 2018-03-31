const List = require('../index');
describe('sumKeysByValue', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv sumKeysByValue() ', () => {
    expect(
      arrKv.sumKeysByValue().similar(
        [
          {key:1,value: ( arrKv.filter( row => row.value == 1 ).getKeys().sum() )},
          {key:2,value: ( arrKv.filter( row => row.value == 2 ).getKeys().sum() )},
          {key:3,value: ( arrKv.filter( row => row.value == 3 ).getKeys().sum() )}
        ]
      )
    ).toEqual(
      true
    );
  });
});
