const List = require('../../index');
describe('has', () => {

  it('should has be true when search have regular values', () => {
    expect(new List(1, 2).has(1)).toEqual(true);
  });

  it('should has be true when search does not have regular values', () => {
    expect(new List(1, 2).has(3)).toEqual(false);
  });

  it('should has be true when search have properly function values', () => {
    expect(new List(1, 2).has(x => x > 1)).toEqual(true);
  });

  it('should has be false when search have no values', () => {
    expect(new List(1, 2).has(x => x > 2)).toEqual(false);
  });

  it('should has be false when search on empty', () => {
    expect(new List().has(x => x == x)).toEqual(false);
  });
});
