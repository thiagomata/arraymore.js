const List = require('../../index');
describe('replaceNaN', () => {

  it('replaceNaN of [0,null,NaN,undefined] 100 => [0,null,100,100]', () => {
    expect(List.cast([0,null,NaN,undefined]).replaceNaN(100)).toEqual([0,null,100,100]);
  });

  it('replaceNaN of [5,4,3,2,1] => [5,4,3,2,1]', () => {
    expect(List.cast([5,4,3,2,1]).replaceNaN(100)).toEqual([5,4,3,2,1]);
  });

  it('replaceNaN of [] =>  []', () => {
    expect(List.cast([]).replaceNaN()).toEqual([]);
  });

  it('replaceNaN of new List =>  []', () => {
    expect(new List().replaceNaN()).toEqual([]);
  });
});
