const List = require('../index');
describe('overlaps', () => {

  it('overlaps of [1,2,3,4,5,6] => [1,2,3,4,5]', () => {
    var years = [1,2,3,4,5,6,7];
    var data = [{x:10,y:100},{x:3,y:30},{x:5,y:50},{x:11,y:110}]
    var expected = [0,0,30,0,50,0,0]

    var result = List.cast(data).overlaps(
      years,
      (node,year) => node.x == year,
      (node) => node.y,
      0
    );

    expect(result.equals(expected)).toEqual(true);
  });

});
