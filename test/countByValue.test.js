const List = require('../index');
describe('countByValue', () => {

  it('["a","b","b","c","c","c"] countByValue => [{key:"a",value:1},{key:"b",value:2},{key:"c",value:3}]', () => {
    expect(
      new List("a","b","b","c","c","c").countByValue()
    ).toEqual([
      {key:"a",value:1},
      {key:"b",value:2},
      {key:"c",value:3}
    ]);
  });

  it('[1,2,3,null] countByValue => [{key:1,value:1},{key:2,value:1},{key:3,value:1},{key:null,value:1}]', () => {
    expect(
      new List(1,2,3,null).countByValue()
    ).toEqual([
      {key:1,value:1},
      {key:2,value:1},
      {key:3,value:1},
      {key:null,value:1}
    ]);
  });

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] countByValue node.a => [{key:{a:1,b:10},value:1},{key:{a:2,b:200},value:2},{key:{a:3,b:300},value:3}]', () => {

    const extractKey = ( node ) => node.a;
    const extractValue = ( node ) => node.b;

    expect(
      new List(
          {a:1,b:10},{a:2,b:20},{a:3,b:30},
          {a:1,b:100},{a:2,b:200},{a:3,b:300}
      ).countByValue(
        extractKey,
        extractValue
      )
    ).toEqual([
      {key:1,value:(10 + 100)},
      {key:2,value:(20 + 200)},
      {key:3,value:(30 + 300)}
    ]);
  });

});
