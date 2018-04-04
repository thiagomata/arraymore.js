const List = require('../../index');
describe('asKV', () => {

  it('[1,2,3] asKV => [{key:0,value:1...}]', () => {
    expect(
      new List(1,2,3).asKV().similar(
        [
          {key:0,value:1},
          {key:1,value:2},
          {key:2,value:3},
        ]
      )
    ).toEqual(true);
  });

  it('[1,2,3] asKV [4,5,6 ] value * 100  => [{key:4,value:100},{key:5,value:200},{key:6,value:300}]', () => {
    expect(
      new List(1,2,3).asKV(
        new List(4,5,6),
        value => value * 100
      )
    ).toEqual([
      {key:4,value:100},
      {key:5,value:200},
      {key:6,value:300}
    ]);
  });

  it('[1,2,3] asKV value * 100 [4,5,6 ]=> [{key:100,value:4},{key:200,value:5},{key:300,value:6}]', () => {
    expect(
      new List(1,2,3).asKV(
        value => value * 100,
        new List(4,5,6)
      )
    ).toEqual([
      {key:100,value:4},
      {key:200,value:5},
      {key:300,value:6}
    ]);
  });

  it('[1,2,3] asKV [ 4,5 ] value => [{key:4,value:1},{key:5,value:2},{key:null,value:3}]', () => {
    expect(
      new List(1,2,3).asKV(
        new List(4,5),
        value => value
      )
    ).toEqual([
      {key:4,value:1},
      {key:5,value:2},
      {key:null,value:3}
    ]);
  });

  it('[1,2,3] asKV value * 10 [ 4,5 ] => [{key:10,value:4},{key:20,value:5},{key:30,value:null}]', () => {
    expect(
      new List(1,2,3).asKV(
        value => value * 10,
        new List(4,5)
      )
    ).toEqual([
      {key:10,value:4},
      {key:20,value:5},
      {key:30,value:null}
    ]);
  });

  it('[1,2,3] asKV [ 4,5 ] value * 100  => [{key:4,value:100},{key:5,value:200},{key:-1,value:300}]', () => {
    expect(
      new List(1,2,3).asKV(
        new List(4,5),
        value => value * 100,
        false,
        -1
      )
    ).toEqual([
      {key:4,value:100},
      {key:5,value:200},
      {key:-1,value:300}
    ]);
  });

  it('[1,2,3] asKV value * 100 [ 4,5 ] rotate => [{key:100,value:4},{key:200,value:5},{key:300,value:-1}]', () => {
    expect(
      new List(1,2,3).asKV(
        value => value * 100,
        new List(4,5),
        false,
        -1
      )
    ).toEqual([
      {key:100,value:4},
      {key:200,value:5},
      {key:300,value:-1}
    ]);
  });

  it('[1,2,3] asKV [ 4,5 ] value * 100 rotate => [{key:4,value:100},{key:5,value:200},{key:4,value:300}]', () => {
    expect(
      new List(1,2,3).asKV(
        new List(4,5),
        value => value * 100,
        true
      )
    ).toEqual([
      {key:4,value:100},
      {key:5,value:200},
      {key:4,value:300}
    ]);
  });

  it('[1,2,3] asKV value * 100 [ 4,5 ] rotate => [{key:100,value:4},{key:200,value:5},{key:300,value:4}]', () => {
    expect(
      new List(1,2,3).asKV(
        value => value * 100,
        new List(4,5),
        true
      )
    ).toEqual([
      {key:100,value:4},
      {key:200,value:5},
      {key:300,value:4}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] asKV node.a => [{key:1,value:{a:1,b:10}},{key:2,value:{a:2,b:20}},{key:3,value:{a:3,b:30}}]', () => {
    expect(
      new List({a:1,b:10},{a:2,b:20},{a:3,b:30}).asKV(
        node => node.a,
        node => node.b
      )
    ).toEqual([
      {key:1,value:10},
      {key:2,value:20},
      {key:3,value:30}
    ]);
  });

  it('asKV of [] =>  []', () => {
    expect(List.cast([]).asKV()).toEqual([]);
  });

  it('asKV of new List(10) => [{k:null,v:null}x10]', () => {
    expect(new List(10).asKV()).toEqual(
      new Array(10).fill({key:null,value:null})
    );
  });
});
