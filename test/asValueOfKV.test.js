const List = require('../index');
describe('asValueOfKV', () => {

  it('[1,2,3] asValueOfKV => [{key:1,value:1},{key:2,value:2},{key:3,value:3}]', () => {
    expect(
      new List(1,2,3).asValueOfKV()
    ).toEqual([
      {key:1,value:1},
      {key:2,value:2},
      {key:3,value:3}
    ]);
  });

  it('[1,2,3] asValueOfKV [4,5,6 ]=> [{key:4,value:1},{key:5,value:2},{key:6,value:3}]', () => {
    expect(
      new List(1,2,3).asValueOfKV(
        new List(4,5,6)
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:6,value:3}
    ]);
  });

  it('[1,2,3] asValueOfKV [ 4,5 ]=> [{key:4,value:1},{key:5,value:2},{key:null,value:3}]', () => {
    expect(
      new List(1,2,3).asValueOfKV(
        new List(4,5)
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:null,value:3}
    ]);
  });

  it('[1,2,3] asValueOfKV [ 4,5 ]=> [{key:4,value:1},{key:5,value:2},{key:-1,value:3}]', () => {
    expect(
      new List(1,2,3).asValueOfKV(
        new List(4,5),
        false,
        -1
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:-1,value:3}
    ]);
  });

  it('[1,2,3] asValueOfKV [ 4,5 ] rotate => [{key:4,value:1},{key:5,value:2},{key:4,value:3}]', () => {
    expect(
      new List(1,2,3).asValueOfKV(
        new List(4,5),
        true
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:4,value:3}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] asValueOfKV node.a => [{key:1,value:{a:1,b:10}},{key:2,value:{a:2,b:20}},{key:3,value:{a:3,b:30}}]ll', () => {
    expect(
      new List({a:1,b:10},{a:2,b:20},{a:3,b:30}).asValueOfKV(
        ( list ) => list.map( node => node.a )
      )
    ).toEqual([
      {key:1,value:{a:1,b:10}},
      {key:2,value:{a:2,b:20}},
      {key:3,value:{a:3,b:30}}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] asValueOfKV node.a => [{key:1,value:{a:1,b:10}},{key:2,value:{a:2,b:200}},{key:3,value:{a:3,b:300}}]', () => {
    expect(
      new List({a:1,b:10},{a:2,b:20},{a:3,b:30}).asValueOfKV(
        ( list ) => list.map( node => node.a )
      )
    ).toEqual([
      {key:1,value:{a:1,b:10}},
      {key:2,value:{a:2,b:20}},
      {key:3,value:{a:3,b:30}}
    ]);
  });

  it('asValueOfKV of [] =>  []', () => {
    expect(List.cast([]).asValueOfKV()).toEqual([]);
  });

  it('asValueOfKV of new List(10) => [10x {key:null,value:null}]', () => {
    expect(new List(10).asValueOfKV()).toEqual(
      new Array(10).fill(
        {key:null,value:null}
      )
    );
  });
});
