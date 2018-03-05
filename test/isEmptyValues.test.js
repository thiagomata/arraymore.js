const List = require('../index');
describe('isEmptyValues', () => {

  it('empty array shoud be empty values', () => {
    expect(new List().isEmptyValues() ).toEqual(true);
  });

  it('array with values shoud be not be empty values', () => {
    expect(new List(1,2,3).isEmptyValues() ).toEqual(false);
  });

  it('array with null values shoud be empty values', () => {
    expect(new List(null,null,null).isEmptyValues() ).toEqual(true);
  });

  it('array with NaN values shoud not be empty values', () => {
    expect(new List(NaN,NaN,NaN).isEmptyValues() ).toEqual(false);
  });

  it('array with undefined values shoud be empty values', () => {
    expect(new List(undefined,undefined,undefined).isEmptyValues() ).toEqual(true);
  });

  it('array with <x empty items> shoud be empty values', () => {
    expect(new List(10).isEmptyValues() ).toEqual(true);
  });

  it('list with <x empty items> shoud be empty values', () => {
    expect(List.cast(new Array(10) ).isEmptyValues() ).toEqual(true);
  });
});
