const List = require('../index');
describe('get', () => {

  it('get(1) of [0,1,2,3] => 1', () => {
    expect(List.cast([0,1,2,3]).get(1)).toEqual(1);
    expect(List.cast([0,1,2,3]).get(2)).toEqual(2);
    expect(List.cast([0,1,2,3]).get(3)).toEqual(3);
    expect(List.cast([0,1,2,3]).get(4)).toEqual(null);
    expect(List.cast([0,1,2,3]).getRotate(4)).toEqual(0);
    expect(List.cast([0,1,2,3]).getRotate(5)).toEqual(1);
    expect(List.cast([0,1,2,3]).getRotate(6)).toEqual(2);
    expect(List.cast([0,1,2,3]).getRotate(7)).toEqual(3);
  });

  it('get(1,-1) of [0,undefined,2,3] => -1', () => {
    expect(List.cast([0,undefined,2,3]).get(1)).toEqual(null);
    expect(List.cast([0,undefined,2,3]).get(1,-1)).toEqual(-1);
    expect(List.cast([0,undefined,2,3]).getRotate(5,null)).toEqual(null);
    expect(List.cast([0,undefined,2,3]).getRotate(5,-1)).toEqual(-1);
  });
});
