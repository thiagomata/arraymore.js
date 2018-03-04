const List = require('../arraylist');
describe('take', () => {

  it('should take the first element of two numbers', () => {
    expect(new List(1, 2).take(1)).toEqual(List.cast([1]));
  });

  it('should take the as string element of two numbers', () => {
    expect(new List(1, 2).take('1')).toEqual(List.cast([1]));
  });

  it('should take all elements of the List', () => {
    expect(new List(1, 6, 5, 4, 3, 2).take(100)).toEqual(new List(1, 6, 5, 4, 3, 2));
  });

  it('should take the last elements of the List', () => {
    expect(new List(1, 2, 3, 4, 5, 6).take(-2)).toEqual(new List(5, 6));
  });

  it('should take letters', () => {
    expect(new List('h','e','l','l','o','w','o','r','l','d').take(4).join('')).toEqual("hell");
  });

  it('should take 100 of empty return empty List', () => {
    expect(new List().take(100)).toEqual(new List());
  });

  it('should take -100 of empty return empty List', () => {
    expect(new List().take(-100)).toEqual(new List());
  });
});
