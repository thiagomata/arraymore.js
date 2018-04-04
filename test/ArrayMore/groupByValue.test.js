const List = require('../../index');
describe('groupByValue', () => {

  it('["a","b","b","c","c","c"] groupByValue [{key:"a",value:["a"]},{key:"b",value:["b","b"]},{key:"c",value:["c","c","c"]}]', () => {
    expect(
      new List("a","b","b","c","c","c").groupByValue()
    ).toEqual([
      {key:"a",value:["a"]},
      {key:"b",value:["b","b"]},
      {key:"c",value:["c","c","c"]}
    ]);
  });

  it('[1,2,3,null] groupByValue => [{key:1,value:[1]},{key:2,value:[2]},{key:3,value:[3]},{key:null,value:[null]}]', () => {
    expect(
      new List(1,2,3,null).groupByValue()
    ).toEqual([
      {key:1,value:[1]},
      {key:2,value:[2]},
      {key:3,value:[3]},
      {key:null,value:[null]}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] groupByValue node.a node.b => [{key:1,value:[10,100]},{key:2,value:[20,200]},{key:3,value:[30,300]}]', () => {

    const extractKey = ( node ) => node.a;
    const extractValue = ( node ) => [node.b];

    expect(
      new List(
          {a:1,b:10},{a:2,b:20},{a:3,b:30},
          {a:1,b:100},{a:2,b:200},{a:3,b:300}
      ).groupByValue(
        extractKey,
        extractValue
      )
    ).toEqual([
      {key:1,value:[10,100]},
      {key:2,value:[20,200]},
      {key:3,value:[30,300]}
    ]);
  });

});
