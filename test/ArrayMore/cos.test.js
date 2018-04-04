const List = require('../../index');
describe('cos', () => {

  it('cos of [1] =>  [cos(1)]', () => {
    expect(List.cast([1]).cos()).toEqual([Math.cos(1)]);
  });

  it('cos of [100] =>  [cos(100)]', () => {
    expect(List.cast([100]).cos()).toEqual([Math.cos(100)]);
  });

  it('cos of [0..9] * Pi/2 => [1,0,-1,0,1,0,-1,0,-1...]', () => {
    expect(List.range(10).times(Math.PI/2).cos().round(10)).toEqual([ 1, 0, -1, -0, 1, 0, -1, -0, 1, 0 ]);
  });

  it('cos of [0..9] * Pi/2 => [0,1,0,-1,0,-1,0,-1...]', () => {
    expect(List.range(10).cos(Math.PI/2).round(10)).toEqual([ 1, 0, -1, -0, 1, 0, -1, -0, 1, 0 ]);
  });
});
