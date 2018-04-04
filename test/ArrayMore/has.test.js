const List = require('../../index');
describe('has', () => {

  it('should return the properly position when search have regular values', () => {
    expect(new List(1, 2).hasIndex(1)).toEqual(0);
    expect(new List(1, 2).hasIndex(2)).toEqual(1);
  });

  it('should return -1 when search does not have regular values', () => {
    expect(new List(1, 2).hasIndex(3)).toEqual(-1);
  });

  it('should return the propery position when search have properly function values', () => {
    expect(new List(1, 2).hasIndex(x => x > 1)).toEqual(1);
  });

  it('should return -1 when search have no values', () => {
    expect(new List(1, 2).hasIndex(x => x > 2)).toEqual(-1);
  });

  it('should return -1 when search on empty', () => {
    expect(new List().hasIndex(x => x == x)).toEqual(-1);
  });
});
