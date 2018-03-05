const List = require('../index');
describe('head', () => {

  it('should head the first element of two numbers', () => {
    expect(new List(1, 2).head(1)).toEqual(List.cast([1]));
  });

  it('should head the as string element of two numbers', () => {
    expect(new List(1, 2).head('1')).toEqual(List.cast([1]));
  });

  it('should head all elements of the List', () => {
    expect(new List(1, 6, 5, 4, 3, 2).head(100)).toEqual(new List(1, 6, 5, 4, 3, 2));
  });

  it('should head the last elements of the List', () => {
    expect(new List(1, 2, 3, 4, 5, 6).head(-2)).toEqual(new List(3, 4, 5, 6));
  });

  it('should head negative more positive equals full list', () => {
    let l = new List(1, 2, 3, 4, 5, 6);
    expect( l.head(5).concat( l.head(-5) ) ).toEqual(l);
  });

  it('should head letters', () => {
    expect(new List('h','e','l','l','o','w','o','r','l','d').head(4).join('')).toEqual("hell");
  });

  it('should head 100 of empty return empty List', () => {
    expect(new List().head(100)).toEqual(new List());
  });

  it('should head -100 of empty return empty List', () => {
    expect(new List().head(-100)).toEqual(new List());
  });
});
