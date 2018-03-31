const List = require('../index');
describe('sumValuesByKey', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv sumValuesByKey() ', () => {
    expect(
      arrKv.sumValuesByKey().similar(
        [
          {key:10,value:4},
          {key:5,value:2},
          {key:6,value:3},
          {key:8,value:1},
          {key:9,value:2}
        ]
      )
    ).toEqual(
      true
    );
  });
});
