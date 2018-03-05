const List = require('../index');
describe('copy', () => {

  it('remove should not change the copy', () => {
    var l = new List(1,2,3);
    var c = l.copy();
    c.pop(1 );
    expect(l).toEqual(new List(1,2,3));
    expect(c).toEqual(new List(1,2));
  });

  it('append should not change the copy', () => {
    var l = new List(1,2,3);
    var c = l.copy();
    c.push(4);
    expect(l).toEqual(new List(1,2,3));
    expect(c).toEqual(new List(1,2,3,4));
  });

  it('change in key shoud not change the copy', () => {
    var l = new List(1,2,3);
    var c = l.copy();
    c[0] = 10;
    expect(l).toEqual(new List(1,2,3));
    expect(c).toEqual(new List(10,2,3));
  });

});
