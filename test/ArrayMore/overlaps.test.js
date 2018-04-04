const List = require('../../index');
describe('overlaps', () => {

  it('create the overlaps from data object', () => {
    var years = [1,2,3,4,5,6,7];
    var data = [];
    data[3] = 3;
    data[5] = 5;
    var expected = [null,null,3,null,5,null,null]

    // expect( List.cast(data).overlaps(
    //   years
    // ).equals(expected)).toEqual(true);
    expect( List.cast(data).overlaps(
      years
    )).toEqual(expected);
  });

  it('create the overlaps from data object', () => {
    var years = [1,2,3,4,5,6,7];
    var data = [{x:10,y:100},{x:3,y:30},{x:5,y:50},{x:11,y:110}]
    var expected = [0,0,300,0,500,0,0]
    expect(List.cast(data).overlaps(
      years,
      (node,year) => node.x == year,
      (node) => node.y * 10,
      0
    ).equals(expected)).toEqual(true);
  });

});
