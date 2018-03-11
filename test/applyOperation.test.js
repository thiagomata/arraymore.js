const List = require('../index');
describe('applyOperation', () => {

  it('applyOperation of [1,2,3,0,null,NaN,undefined] empty=>0 NaN=>-1 op=>identity', () => {
    expect(List.cast([1,2,3,0,null,NaN,undefined]).
      applyOperation(0,-1,(list)=>list)
    ).toEqual([1,2,3,0,null,-1,-1]);
  });

  it('applyOperation of [] empty=>100 NaN=>-1 op=>identity', () => {
    expect(List.cast([]).
      applyOperation(100,-1,(list)=>list.sum())
    ).toEqual(100);
  });
});
