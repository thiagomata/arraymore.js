const List = require('../../index');
describe('sortByKey', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv sortByKey().getKeys() =  [ 5, 6, 8, 9, 10, 10, 10 ]', () => {
    expect(
      arrKv.sortByKey().getKeys()
    ).toEqual([ 5, 6, 8, 9, 10, 10, 10 ]);
  });

  it('arrKv sortByKey(ASC).getKeys() =  [ 5, 6, 8, 9, 10, 10, 10 ]', () => {
    expect(
      arrKv.sortByKey("ASC").getKeys()
    ).toEqual([ 5, 6, 8, 9, 10, 10, 10 ]);
  });

  it('arrKv sortByKey( (a,b) => b - a ).getKeys() =  [ 10, 10, 10, 9, 8, 6, 5 ]', () => {
    expect(
      arrKv.sortByKey( (a,b) => b - a ).getKeys()
    ).toEqual([ 10, 10, 10, 9, 8, 6, 5 ]);
  });

  it('arrKv sortByKey( DESC ).getKeys() =  [ 10, 10, 10, 9, 8, 6, 5 ]', () => {
    expect(
      arrKv.sortByKey( "DESC" ).getKeys()
    ).toEqual([ 10, 10, 10, 9, 8, 6, 5 ]);
  });

  it('emptyArrKv getKeys = [] ', () => {
    expect(
      emptyArrKv.getKeys()
    ).toEqual([]);
  });
});
