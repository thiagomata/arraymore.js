const List = require('../index');
describe('sin', () => {

  it('sin of [1] =>  [sin(1)]', () => {
    expect(List.cast([1]).sin()).toEqual([Math.sin(1)]);
  });

  it('sin of [100] =>  [sin(100)]', () => {
    expect(List.cast([100]).sin()).toEqual([Math.sin(100)]);
  });

  it('sin of [0..9] * Pi/2 => [0,1,0,-1,0,-1,0,-1...]', () => {
    expect(List.range(10).times(Math.PI/2).sin().round(10)).toEqual([ 0, 1, 0, -1, -0, 1, 0, -1, -0, 1 ]);
  });

  it('sin of [0..9] * Pi/2 => [0,1,0,-1,0,-1,0,-1...]', () => {
    expect(List.range(10).sin(Math.PI/2).round(10)).toEqual([ 0, 1, 0, -1, -0, 1, 0, -1, -0, 1 ]);
  });
});
