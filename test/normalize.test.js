const List = require('../index');
describe('normalize', () => {

  it('sum normalize of [10,20,30,40,50] = 1', () => {
    expect(List.cast([10,20,30,40,50]).normalize().sum()).toEqual(1);
  });

  it('normalize should respect proportions', () => {
    expect(List.cast([10,10,20,40]).normalize()).toEqual( [ 1/8, 1/8, 1/4, 1/2 ] );
  });

  it('normalize of [10,20,30,40,50] * (10+20+30+40+50) = [10,20,30,40,50]', () => {
    expect(List.cast([10,20,30,40,50]).normalize().times(10+20+30+40+50)).toEqual(List.cast([10,20,30,40,50]));
  });

  it('normalize of [] =>  []', () => {
    expect(List.cast([]).normalize()).toEqual([]);
  });

  it('override empty answer', () => {
    expect(List.cast([]).normalize([1])).toEqual([1]);
  });

  it('normalize of new List =>  []', () => {
    expect(new List().normalize()).toEqual(new List());
  });

  it('normalize("trash") =>  NaN', () => {
    expect(List.cast(["trash"]).normalize()).toEqual([NaN]);
  });

  it('replace NaN by 0', () => {
    expect(List.cast([ "trash", 1, 1, 2, 4 ], false ).normalize(0,0)).toEqual([ 0, 0.125, 0.125, 0.25, 0.5 ]);
  });

  it('replace NaN by 1', () => {
    expect(List.cast([ "trash", 1, 2, 4 ], false ).normalize(0,1)).toEqual([ 0.125, 0.125, 0.25, 0.5 ]);
  });

  it('replace NaN by trash should throw error', () => {
    expect( () => {
      List.cast([ "trash", 1, 2, 4 ], false ).normalize(0,"other-trash")
    }).toThrow();
  });

  it('normalize should not "work" with letters', () => {
    expect(List.cast([1, 'a','b','c']).normalize()).toEqual([NaN,NaN,NaN,NaN]);
  });

  it('normalize should allow replace letters, forcing to 0', () => {
    expect(List.cast([1, 'a','b','c']).normalize(0,0)).toEqual([1,0,0,0]);
  });

});
