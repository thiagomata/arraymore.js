const List = require('../../index');
describe('countRowsByFunc', () => {

  var arrKv = new List(10,5,6,10,8,9,10).asKeyOfKV(
    new List(1,2,3,1,1,2,2)
  )

  var emptyArrKv = new List().asContextOfKV([]);

  it('arrKv countRowsByFunc() equals countRowsByKey', () => {
    expect(
      arrKv.countRowsByFunc()
    ).toEqual(arrKv.countRowsByKey());
  });

  it('arrKv countRowsByFunc(  node.value % 2 ).findRowByKey(1) =  4', () => {
    expect(
      arrKv.countRowsByFunc( node => node.value % 2 ).findRowByKey(1).value
    ).toEqual(4);
  });

  it('arrKv countRowsByFunc( node.value % 2, node.value ) = [{k:1,v:6},{k:0,v:6}]', () => {
    expect(
      arrKv.countRowsByFunc(
        node => node.value % 2,
        node => node.value
      ).similar([{key:1,value:6},{key:0,value:6}])
    ).toEqual(true);
  });

  it('arrKv countRowsByFunc( node.value % 2, node.value, (a,b) => node.value + node.key ) = [{k:1,v:6},{k:0,v:6}]', () => {
    expect(
      arrKv.countRowsByFunc(
        node => node.value % 2,
        node => { return { totalValue: node.value, totalKey: node.key, totalCount: 1 }; },
        (a,b) => {
          return {
            totalValue: ( a.totalValue + b.totalValue ),
            totalKey:   ( a.totalKey   + b.totalKey   ),
            totalCount: ( a.totalCount + b.totalCount )
          }
        }
      ).similar([
        {key:1,value:{totalValue:6,totalKey:34,totalCount:4}},
        {key:0,value:{totalValue:6,totalKey:24,totalCount:3}}
      ])
    ).toEqual(true);
  });

});
