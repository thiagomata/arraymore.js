const List = require('../../index');
describe('asKeyOfKV', () => {

  it('[1,2,3] asKeyOfKV => [{key:1,value:1},{key:2,value:2},{key:3,value:3}]', () => {
    expect(
      new List(1,2,3).asKeyOfKV()
    ).toEqual([
      {key:1,value:1},
      {key:2,value:2},
      {key:3,value:3}
    ]);
  });

  it('[1,2,3] asKeyOfKV [4,5,6 ]=> [{key:1,value:4},{key:2,value:5},{key:3,value:6}]', () => {
    expect(
      new List(1,2,3).asKeyOfKV(
        new List(4,5,6)
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:6}
    ]);
  });

  it('[1,2,3] asKeyOfKV [ 4,5 ]=> [{key:1,value:4},{key:2,value:5},{key:3,value:null}]', () => {
    expect(
      new List(1,2,3).asKeyOfKV(
        new List(4,5)
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:null}
    ]);
  });

  it('[1,2,3] asKeyOfKV [ 4,5 ] (-1) => [{key:1,value:4},{key:2,value:5},{key:3,value:-1}]', () => {
    expect(
      new List(1,2,3).asKeyOfKV(
        new List(4,5),
        false,
        -1
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:-1}
    ]);
  });

  it('[1,2,3] asKeyOfKV [ 4,5 ] rotate => [{key:1,value:4},{key:2,value:5},{key:3,value:4}]', () => {
    expect(
      new List(1,2,3).asKeyOfKV(
        new List(4,5),
        true
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:4}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] asValueOfKV node.a => [{key:{a:1,b:10},value:1},{key:{a:2,b:200},value:2},{key:{a:3,b:300},value:3}]', () => {    
    expect(
      new List({a:1,b:10},{a:2,b:20},{a:3,b:30}).asKeyOfKV(
        ( list ) => list.map( node => node.a )
      )
    ).toEqual([
      {key:{a:1,b:10},value:1},
      {key:{a:2,b:20},value:2},
      {key:{a:3,b:30},value:3}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] asKeyOfKV node.a => [{key:1,value:{a:1,b:10}},{key:2,value:{a:2,b:200}},{key:3,value:{a:3,b:300}}]', () => {
    expect(
      new List({a:1,b:10},{a:2,b:20},{a:3,b:30}).asKeyOfKV(
        ( list ) => list.map( node => node.a )
      )
    ).toEqual([
      {key:{a:1,b:10},value:1},
      {key:{a:2,b:20},value:2},
      {key:{a:3,b:30},value:3}
    ]);
  });

  it('asKeyOfKV of [] =>  []', () => {
    expect(List.cast([]).asKeyOfKV()).toEqual([]);
  });

  it('asKeyOfKV of new List(10) => [10x {key:null,value:null}]', () => {
    expect(new List(10).asKeyOfKV()).toEqual(
      new Array(10).fill(
        {key:null,value:null}
      )
    );
  });
});
