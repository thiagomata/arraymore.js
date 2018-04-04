const List = require('../../index');
describe('sumValuesByKey', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv aggregate [{k:10,v:100}] getKey 10 = [1,100] ', () => {

    let arrAdd = List.cast([10]).asKeyOfKV([100]);

    expect(
      arrKv.aggregate( arrAdd ).findRowByKey(10).value
    ).toEqual(
      101
    );
  });

  it('arrKv aggregate [{k:10,v:100}] (a,b) = ( a + b ) / 2 getKey 10 = 101/2 ', () => {

    let arrAdd = List.cast([10]).asKeyOfKV([100]);

    expect(
      arrKv.aggregate( arrAdd, (a,b) => (a+b)/2 , 0 ).findRowByKey(10).value
    ).toEqual(
      101/2
    );
  });

  it('arrKv aggregate test not found ', () => {

    let arr123 = List.cast([123]).asKeyOfKV([0]);

    expect(
      arrKv.aggregate( arr123, (a,b) => (a+b) , -1 ).findRowByKey(123).value
    ).toEqual(
      -1
    );
  });
});
