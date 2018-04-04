const List = require('../../index');
describe('resize', () => {

  it('resize [1, 2, 3] to 6 => [1, 2, 3, 1, 2, 3]', () => {
    expect(List.cast([ 1, 2, 3 ]).resize(6)).toEqual([ 1, 2, 3, 1, 2, 3 ]);
  });

  it('resize [1, 2, 3] to 6 rotate as false => [1, 2, 3, null, null, null]', () => {
    expect(List.cast([ 1, 2, 3 ]).resize(6,false)).toEqual([ 1, 2, 3, null, null, null ]);
  });

  it('resize [1, 2, 3] to 6 rotate as false and missing as -1 => [1, 2, 3, -1, -1, -1]', () => {
    expect(List.cast([ 1, 2, 3 ]).resize(6,false,-1)).toEqual([ 1, 2, 3, -1, -1, -1 ]);
  });

  it('resize [] =>  []', () => {
    expect(List.cast([]).resize(3)).toEqual([null,null,null]);
  });

  it('resize new List => []', () => {
    expect(new List().resize(3)).toEqual([null,null,null]);
  });

  it('resize new List => [] rotate as false and missing as -1', () => {
    expect(new List().resize(3,false,-1)).toEqual([-1,-1,-1]);
  });
});
