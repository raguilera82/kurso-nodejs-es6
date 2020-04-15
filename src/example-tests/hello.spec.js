import { Hellos } from './hello';

describe('My first test suite', () => {

    it('hello world', () => {
        expect(new Hellos().hello()).toBe('hello');
        expect([1,2,3]).toEqual([1,2,3]);
    })

})