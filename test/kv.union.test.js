const List = require('../index');
describe('sumValuesByKey', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv union [{k:10,v:100}] getKey 10 = [1,100] ', () => {

    let arrAdd = List.cast([10]).asKeyOfKV([100]);

    expect(
      arrKv.union( arrAdd ).findRowByKey(10).value.equals(
        [
          1, 100
        ]
      )
    ).toEqual(
      true
    );
  });

  it('arrKv union [{k:10,v:100}] (a,b) = a + b getKey 10 = 101 ', () => {

    let arrAdd = List.cast([10]).asKeyOfKV([100]);

    expect(
      arrKv.union( arrAdd, (a,b) => a+b , 0 ).findRowByKey(10).value
    ).toEqual(
      101
    );
  });
});
