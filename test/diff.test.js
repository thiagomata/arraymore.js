const List = require('../index');
describe('diff', () => {

  it('diff should be zeros to identical lists', () => {
    let from = new List(1,2,5,3,7,3,1,7,4,2,6,4);
    let to   = from.copy();
    expect(from.diff(to).equals(new List(from.length).fill(0))).toBe(true);
  });

  it('diff should be the calculated diff', () => {
    let from = new List(1,2,5,3,7,3,1,7,4,2,6,4);
    let to   = new List(1,1,1,1,1,1,1,1,1,1,1,1);
    var result = new List();
    for( var i = 0; i < from.length; i++ ) {
      var x = from[i];
      var y = to[i];
      var v = x - y;
      result.push( v );
    }
    expect(from.diff(to).equals(List.cast(result))).toBe(true);
  });

  it('diff assumes the other list value to missing values (1)', () => {
    let from  = new List(3,3,3,3);
    let to    = new List(1,1);

    expect(
      from.diff( to ).equals(
        List.cast( [2, 2, 3, 3] )
      )
    ).toBe(
      true
    );
  });

  it('diff assumes the other list value to missing values (2)', () => {
    let to      = new List(3,3,3,3);
    let from    = new List(1,1);

    expect(
        from.diff( to ).equals(
          List.cast([-2, -2, 3, 3])
      )
    ).toBe(
      true
    );
  });
});
