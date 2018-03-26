const List = require('../index');
describe('countByFunc', () => {

  it('[{a:1,b:10},{a:2,b:20},{a:3,b:30}] countByFunc node.a => [{key:{a:1,b:10},value:1},{key:{a:2,b:200},value:2},{key:{a:3,b:300},value:3}]', () => {

    const extractKey = ( node ) => node.a;
    const extractValue = ( node ) => node.b;
    const combineValues = (a, b) => a * b;

    expect(
      new List(
          {a:1,b:10},{a:2,b:20},{a:3,b:30},
          {a:1,b:100},{a:2,b:200},{a:3,b:300}
      ).countByFunc(
        extractKey,
        extractValue,
        combineValues
      )
    ).toEqual([
      {key:1,value:(10 * 100)},
      {key:2,value:(20 * 200)},
      {key:3,value:(30 * 300)}
    ]);
  });

});
