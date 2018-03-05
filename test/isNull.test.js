const List = require('../index');
describe('isNull', () => {

  it('null array shoud be null values', () => {
    expect(new List().isNullValues() ).toEqual(true);
  });

  it('array with values shoud be not be null values', () => {
    expect(new List(1,2,3).isNullValues() ).toEqual(false);
  });

  it('array with null values shoud not be null values', () => {
    expect(new List(null,null,null).isNullValues() ).toEqual(true);
  });

  it('array with NaN values shoud not be null values', () => {
    expect(new List(NaN,NaN,NaN).isNullValues() ).toEqual(false);
  });

  it('array with undefined values shoud be null values', () => {
    expect(new List(undefined,undefined,undefined).isNullValues() ).toEqual(false);
  });

  it('array with <x empty items> shoud not be null values', () => {
    expect(new List(10).isNullValues() ).toEqual(false);
  });

  it('list with <x empty items> shoud not be null values', () => {
    expect(List.cast(new Array(10) ).isNullValues() ).toEqual(false);
  });
});
