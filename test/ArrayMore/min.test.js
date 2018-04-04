const List = require('../../index');
describe('min', () => {

  it('should take the min of two numbers', () => {
    expect(new List(1, 2).min()).toBe(1);
  });

  it('should take the min of six numbers in any order', () => {
    expect(new List(1, 6, 5, 4, 3, 2).min()).toBe(1);
  });

  it('should take the min negative numbers', () => {
    expect(new List(-1, -6, -5, -4, -3, -2).min()).toBe(-6);
  });

  it('should take the min negative and positive numbers', () => {
    expect(new List(-1, -6, 7, -4, -3, -2).min()).toBe(-6);
  });

  it('should take the min of letters', () => {
    expect(new List("h","e","l","l","o","w","o","r","l","d").min()).toBe("d");
  });

  it('should take the min null of empty List', () => {
    expect(new List().min()).toBe(null);
  });

  it('should be able to redefine the min of empty List', () => {
    expect(new List().min(-1)).toBe(-1);
  });
});
