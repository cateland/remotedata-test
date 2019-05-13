import * as RemoteData from './remotedata';

describe('append', () => {
  it('return Failure if any of the RemodeData Failed', () => {
    expect(RemoteData.append(RemoteData.success('data'), RemoteData.failure('error')))
    .toEqual(RemoteData.failure('error'));
    expect(RemoteData.append(RemoteData.failure('error'), RemoteData.success('data')))
    .toEqual(RemoteData.failure('error'));

    expect(RemoteData.append(RemoteData.loading(), RemoteData.failure('error')))
    .toEqual(RemoteData.failure('error'));
    expect(RemoteData.append(RemoteData.failure('error'), RemoteData.loading()))
    .toEqual(RemoteData.failure('error'));

    expect(RemoteData.append(RemoteData.notAsked(), RemoteData.failure('error')))
    .toEqual(RemoteData.failure('error'));
    expect(RemoteData.append(RemoteData.failure('error'), RemoteData.notAsked()))
    .toEqual(RemoteData.failure('error'));
  });

  it('return Loading if one of the RemoteData is Success and the other loading', () => {
    expect(RemoteData.append(RemoteData.success('data'), RemoteData.loading()))
    .toEqual(RemoteData.loading());
    expect(RemoteData.append(RemoteData.loading(), RemoteData.success('data')))
    .toEqual(RemoteData.loading());
  });

  it('return NotAsked if one the RemoteData is NotAsked and none other are Failed', () => {
    expect(RemoteData.append(RemoteData.success('data'), RemoteData.notAsked()))
    .toEqual(RemoteData.notAsked());
    expect(RemoteData.append(RemoteData.loading(), RemoteData.notAsked()))
    .toEqual(RemoteData.notAsked());
  });

  it('return left failure if two RemoteData are failed', ()=> {
    expect(RemoteData.append(RemoteData.failure('error1'), RemoteData.failure('error2')))
    .toEqual(RemoteData.failure('error1'));
  });

  it('return a RemoteData with a tuple of values from two succesfull RemoteData', () => {
    expect(RemoteData.append(RemoteData.success('data1'), RemoteData.success('data2')))
    .toEqual(RemoteData.success(['data1', 'data2']));
  });
});

describe('map2', () => {
  const testfunc = (a) => (b) => ({a,b});
  it('return Failure if any of the RemodeData Failed', () => {
    expect(RemoteData.map2(RemoteData.success('data'), RemoteData.failure('error'), testfunc))
    .toEqual(RemoteData.failure('error'));
    expect(RemoteData.map2(RemoteData.failure('error'), RemoteData.success('data'), testfunc))
    .toEqual(RemoteData.failure('error'));

    expect(RemoteData.map2(RemoteData.loading(), RemoteData.failure('error'), testfunc))
    .toEqual(RemoteData.failure('error'));
    expect(RemoteData.map2(RemoteData.failure('error'), RemoteData.loading(), testfunc))
    .toEqual(RemoteData.failure('error'));

    expect(RemoteData.map2(RemoteData.notAsked(), RemoteData.failure('error'), testfunc))
    .toEqual(RemoteData.failure('error'));
    expect(RemoteData.map2(RemoteData.failure('error'), RemoteData.notAsked(), testfunc))
    .toEqual(RemoteData.failure('error'));
  });

  it('return Loading if one of the RemoteData is Success and the other loading', () => {
    expect(RemoteData.map2(RemoteData.success('data'), RemoteData.loading(), testfunc))
    .toEqual(RemoteData.loading());
    expect(RemoteData.map2(RemoteData.loading(), RemoteData.success('data'), testfunc))
    .toEqual(RemoteData.loading());
  });

  it('return NotAsked if one the RemoteData is NotAsked and none other are Failed', () => {
    expect(RemoteData.map2(RemoteData.success('data'), RemoteData.notAsked(), testfunc))
    .toEqual(RemoteData.notAsked());
    expect(RemoteData.map2(RemoteData.loading(), RemoteData.notAsked(), testfunc))
    .toEqual(RemoteData.notAsked());
  });

  it('return left failure if two RemoteData are failed', ()=> {
    expect(RemoteData.map2(RemoteData.failure('error1'), RemoteData.failure('error2'), testfunc))
    .toEqual(RemoteData.failure('error1'));
  });

  it('return a RemoteData with an object of values from two succesfull RemoteData', () => {
    expect(RemoteData.map2(RemoteData.success('data1'), RemoteData.success('data2'), testfunc))
    .toEqual(RemoteData.success({a:'data1', b:'data2'}));
  });
});

describe('chain',() => {
  it('chain Success', () => {
    expect(RemoteData.chain(RemoteData.of('test'), a => RemoteData.of(a))).toEqual(RemoteData.of('test'))
  });

  it('chain other status', () => {
    expect(RemoteData.chain(RemoteData.loading(),  a => RemoteData.of(a))).toEqual(RemoteData.loading())
  });
});

// TODO https://github.com/fantasyland/fantasy-land#extend
// describe('extend',() => {
//   it('extend Success', () => {
//     expect(RemoteData.extend(RemoteData.of('test'), a => RemoteData.of(a))).toEqual(RemoteData.of('test'))
//   });

//   it('extend other status', () => {
//     expect(RemoteData.extend(RemoteData.loading(),  a => RemoteData.of(a))).toEqual(RemoteData.loading())
//   });
// });
