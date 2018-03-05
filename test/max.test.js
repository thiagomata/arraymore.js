const List = require('../index');
describe('max', () => {

  it('should take the max of two numbers', () => {
    expect(new List(1, 2).max()).toBe(2);
  });

  it('should take the max of six numbers in any order', () => {
    expect(new List(1, 6, 5, 4, 3, 2).max()).toBe(6);
  });

  it('should take the max negative numbers', () => {
    expect(new List(-1, -6, -5, -4, -3, -2).max()).toBe(-1);
  });

  it('should take the max negative and positive numbers', () => {
    expect(new List(-1, -6, 7, -4, -3, -2).max()).toBe(7);
  });

  it('should take the max of letters', () => {
    expect(new List("h","e","l","l","o","w","o","r","l","d").max()).toBe("w");
  });

  it('should take the max null of empty List', () => {
    expect(new List().max()).toBe(null);
  });

  it('should be able to redefine the max of empty List', () => {
    expect(new List().max(-1)).toBe(-1);
  });
});
