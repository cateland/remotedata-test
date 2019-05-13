import { map, ap, chain, toUpper } from 'ramda';
import * as RemoteData from './remotedata';


describe('check if remoted data is compatible with fantasyland spec and ramda', () => {
    it('map', () => {
        const initial = RemoteData.of('value');
        const expected = RemoteData.success('VALUE');
        expect(map((value) => toUpper(value), initial)).toEqual(expected);
    });

    it('ap', () => {
        const fa = RemoteData.of('value');
        const fb = RemoteData.of(value => toUpper(value));
        const expected = RemoteData.success('VALUE');
        expect(ap(fa, fb)).toEqual(expected);
    })

    it('chain', () => {
        const initial = RemoteData.of('value');
        const expected = RemoteData.of('VALUE');
        expect(chain(a => RemoteData.of(toUpper(a)), initial)).toEqual(expected);
    })
});