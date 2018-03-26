const List = require('../index');
describe('findIndexValue', () => {

  const arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(4,5,6,7,8,9,10)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv findIndexValue 6 = 2 ', () => {
    expect(
      arrKv.findIndexValue(6)
    ).toEqual(2);
  });

  it('arrKv findIndexValue 100 = -1 ', () => {
    expect(
      arrKv.findIndexValue(undefined)
    ).toEqual(-1);
  });

  it('emptyArrKv findIndexValue 1 = -1 ', () => {
    expect(
      emptyArrKv.findIndexValue(1)
    ).toEqual(-1);
  });
});
