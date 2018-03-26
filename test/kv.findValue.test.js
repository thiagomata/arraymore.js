const List = require('../index');
describe('findValue', () => {

  const arrKv = new List(1,2,3,1,1,2,2).asKeyOfKV(
    new List(4,5,6,7,8,9,10)
  )

  const emptyArrKv = new List().asKeyValueOfKV([]);

  it('arrKv findValue 6 = {key:3,value:6} ', () => {
    expect(
      arrKv.findValue(6)
    ).toEqual({key:3,value:6});
  });

  it('arrKv findValue 100 = undefined ', () => {
    expect(
      arrKv.findValue(100)
    ).toEqual(undefined);
  });

  it('emptyArrKv findValue 1 = undefined ', () => {
    expect(
      emptyArrKv.findValue(1)
    ).toEqual(undefined);
  });
});
