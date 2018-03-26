const List = require('../index');
describe('groupByFunc', () => {

  it('["a","b","b","c","c","c"] groupByFunc [{key:"a",value:["a"]},{key:"b",value:["b","b"]},{key:"c",value:["c","c","c"]}]', () => {
    expect(
      new List("a","b","b","c","c","c").groupByFunc()
    ).toEqual([
      {key:"a",value:["a"]},
      {key:"b",value:["b","b"]},
      {key:"c",value:["c","c","c"]}
    ]);
  });

  it('[1,2,3,null] groupByFunc => [{key:1,value:[1]},{key:2,value:[2]},{key:3,value:[3]},{key:null,value:[null]}]', () => {
    expect(
      new List(1,2,3,null).groupByFunc()
    ).toEqual([
      {key:1,value:[1]},
      {key:2,value:[2]},
      {key:3,value:[3]},
      {key:null,value:[null]}
    ]);
  });

  it('[{a:1,b:"x"},{a:2,b:"y"},{a:3,b:"z"}] groupByFunc node.a node.b', () => {

    const extractKey = ( node ) => node.a;
    const extractValue = ( node ) => node.b;
    const combine = (a,b) => a + "-" + b;

    expect(
      new List(
          {a:1,b:"x"},{a:2,b:"y"},{a:3,b:"z"},
          {a:1,b:"x"},{a:2,b:"y"},{a:3,b:"z"}
      ).groupByFunc(
        extractKey,
        extractValue,
        combine
      )
    ).toEqual([
      {key:1,value:"x-x"},
      {key:2,value:"y-y"},
      {key:3,value:"z-z"}
    ]);
  });
});
