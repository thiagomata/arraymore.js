const List = require('../../index');
describe('integrate', () => {

  it('integrate of [1,1,1,1,1] => [1,2,3,4,5]', () => {
    expect(List.cast([1,1,1,1,1]).integrate()).toEqual(List.cast([1,2,3,4,5]));
  });

  it('integrate of [5,4,3,2,1] => [5,9,12,14,15]', () => {
    expect(List.cast([5,4,3,2,1]).integrate()).toEqual(List.cast([5,9,12,14,15]));
  });

  it('integrate of [] =>  []', () => {
    expect(List.cast([]).integrate()).toEqual(List.cast([]));
  });

  it('integrate of [0,0] =>  [0,0]', () => {
    expect(List.cast([0,0]).integrate()).toEqual(List.cast([0,0]));
  });

  it('integrate of [-1,-2,-3] =>  [-1,-3,-6]', () => {
    expect(List.cast([-1,-2,-3]).integrate()).toEqual(List.cast([-1,-3,-6]));
  });
});
