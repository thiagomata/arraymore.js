const List = require('../index');
describe('asKeyValueOfKV', () => {

  it('[1,2,3] asKeyValueOfKV => [{key:null,value:null}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV()
    ).toEqual([]);
  });

  it('[1,2,3] asKeyValueOfKV [4,5,6 ] l => [{key:4,value:1},{key:5,value:2},{key:6,value:3}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        new List(4,5,6),
        l => l
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:6,value:3}
    ]);
  });

  it('[1,2,3] asKeyValueOfKV l [4,5,6 ]=> [{key:1,value:4},{key:2,value:5},{key:3,value:6}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        l => l,
        new List(4,5,6)
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:6}
    ]);
  });

  it('[1,2,3] asKeyValueOfKV [ 4,5 ] l => [{key:4,value:1},{key:5,value:2},{key:null,value:3}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        new List(4,5),
        l => l
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:null,value:3}
    ]);
  });

  it('[1,2,3] asKeyValueOfKV l [ 4,5 ] => [{key:1,value:4},{key:2,value:5},{key:n3,value:null}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        l => l,
        new List(4,5)
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:null}
    ]);
  });

  it('[1,2,3] asKeyValueOfKV [ 4,5 ] l => [{key:4,value:1},{key:5,value:2},{key:-1,value:3}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        new List(4,5),
        l => l,
        false,
        -1
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:-1,value:3}
    ]);
  });

  it('[1,2,3] asKeyValueOfKV l [ 4,5 ] rotate => [{key:1,value:4},{key:2,value:5},{key:3,value:-1}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        l => l,
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

  it('[1,2,3] asKeyValueOfKV [ 4,5 ] l rotate => [{key:4,value:1},{key:5,value:2},{key:4,value:3}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        new List(4,5),
        l => l,
        true
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:4,value:3}
    ]);
  });

  it('[1,2,3] asKeyValueOfKV l [ 4,5 ] rotate => [{key:1,value:4},{key:2,value:5},{key:3,value:4}]', () => {
    expect(
      new List(1,2,3).asKeyValueOfKV(
        l => l,
        new List(4,5),
        true
      )
    ).toEqual([
      {key:1,value:4},
      {key:2,value:5},
      {key:3,value:4}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] asKeyValueOfKV node.a => [{key:1,value:{a:1,b:10}},{key:2,value:{a:2,b:20}},{key:3,value:{a:3,b:30}}]', () => {
    expect(
      new List({a:1,b:10},{a:2,b:20},{a:3,b:30}).asKeyValueOfKV(
        ( list ) => list.map( node => node.a ),
        ( list ) => list.map( node => node.b )
      )
    ).toEqual([
      {key:1,value:10},
      {key:2,value:20},
      {key:3,value:30}
    ]);
  });

  it('asKeyValueOfKV of [] =>  []', () => {
    expect(List.cast([]).asKeyValueOfKV()).toEqual([]);
  });

  it('asKeyValueOfKV of new List(10) => []', () => {
    expect(new List(10).asKeyValueOfKV()).toEqual(
      new Array()
    );
  });
});
