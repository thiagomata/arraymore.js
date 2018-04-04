const List = require('../../index');
describe('sortByValue', () => {

  var arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(10,5,6,10,8,9,10)
  )

  const emptyArrKv = new List().asContextOfKV([]);

  it('arrKv sortByValue().getvalues() =  [ 5, 6, 8, 9, 10, 10, 10 ]', () => {
    expect(
      arrKv.sortByValue().getValues()
    ).toEqual([ 5, 6, 8, 9, 10, 10, 10 ]);
  });

  it('arrKv sortByValue(ASC).getvalues() =  [ 5, 6, 8, 9, 10, 10, 10 ]', () => {
    expect(
      arrKv.sortByValue("ASC").getValues()
    ).toEqual([ 5, 6, 8, 9, 10, 10, 10 ]);
  });

  it('arrKv sortByValue( (a,b) => b - a ).getValues() =  [ 10, 10, 10, 9, 8, 6, 5 ]', () => {
    expect(
      arrKv.sortByValue( (a,b) => b - a ).getValues()
    ).toEqual([ 10, 10, 10, 9, 8, 6, 5 ]);
  });

  it('arrKv sortByValue( DESc ).getValues() =  [ 10, 10, 10, 9, 8, 6, 5 ]', () => {
    expect(
      arrKv.sortByValue( "DESC" ).getValues()
    ).toEqual([ 10, 10, 10, 9, 8, 6, 5 ]);
  });

  it('emptyArrKv sortByValue = [] ', () => {
    expect(
      emptyArrKv.sortByValue()
    ).toEqual([]);
  });
});
