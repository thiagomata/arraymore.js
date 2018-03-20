const List = require('../index');
describe('map', () => {

  it('map of [ 1, 2, 3, 4, 5] + 1 => [ 2, 3, 4, 5, 6]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).map( x => x + 1 )).toEqual([ 2, 3, 4, 5, 6 ]);
  });

  it('map of [] =>  []', () => {
    expect(List.cast([]).map( x => x + 1 )).toEqual([]);
  });

  it('map of new List => []', () => {
    expect(new List().map( x => x + 1 )).toEqual([]);
  });

  it('map of [ 1, 2, 3, 4, 5] + 1 => [ 2, 3, 4, 5, 6]', () => {
    expect(List.cast([ 1, 2, 3, 4, 5]).map( function(v) { return this.a + v + 1}, {a:10} )).toEqual([ 12, 13, 14, 15, 16 ]);
  });


});
