const List = require('../index');
describe('tail', () => {

  it('should tail the last element of two numbers', () => {
    expect(new List(1, 2).tail(1)).toEqual(List.cast([2]));
  });

  it('should tail the as string element of two numbers', () => {
    expect(new List(1, 2).tail('1')).toEqual(List.cast([2]));
  });

  it('should tail all elements of the List', () => {
    expect(new List(1, 6, 5, 4, 3, 2).tail(100)).toEqual(new List(1, 6, 5, 4, 3, 2));
  });

  it('should tail return the head elements of the List', () => {
    expect(new List(1, 2, 3, 4, 5, 6).tail(-2)).toEqual(new List(1,2,3,4));
  });

  it('should tail  negative more positive equals full list', () => {
    let l = new List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    expect( l.tail(-5).concat( l.tail(5) ) ).toEqual(l);
  });

  it('should tail letters', () => {
    expect(new List('h','e','l','l','o','w','o','r','l','d').tail(5).join('')).toEqual("world");
  });

  it('should tail 100 of empty return empty List', () => {
    expect(new List().tail(100)).toEqual(new List());
  });

  it('should tail -100 of empty return empty List', () => {
    expect(new List().tail(-100)).toEqual(new List());
  });
});
