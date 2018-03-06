const List = require('../index');
describe('accumulate', () => {

  it('accumulate of [1,1,1,1,1] => [0,1,2,3,4,5]', () => {
    expect(List.cast([1,1,1,1,1]).accumulate()).toEqual(List.cast([0,1,2,3,4,5]));
  });

  it('accumulate of [5,4,3,2,1] => [0,5,9,12,14,15]', () => {
    expect(List.cast([5,4,3,2,1]).accumulate()).toEqual(List.cast([0,5,9,12,14,15]));
  });

  it('accumulate of [] =>  [0]', () => {
    expect(List.cast([]).accumulate()).toEqual(List.cast([0]));
  });

  it('accumulate of [0,0,0] =>  [0,0,0,0]', () => {
    expect(List.cast([0,0,0]).accumulate()).toEqual(List.cast([0,0,0,0]));
  });

  it('accumulate of [-1,-2,-3] =>  [0,-1,-3,-6]', () => {
    expect(List.cast([-1,-2,-3]).accumulate()).toEqual(List.cast([0,-1,-3,-6]));
  });

  it('accumulate should "work" with letters', () => {
    expect(List.cast(['a','b','c']).accumulate('-')).toEqual(List.cast(['-','a-','ba-','cba-']));
  });
});
