import { sanitizer } from './index';

describe("sanitizer", () => {
    it("simple santitze" , () => {
        const data = { 'one_key': 'foo', 'two_key': 'foo' };
        const expectedData = { oneKey: 'foo', twoKey: 'foo', };
        expect(sanitizer(data)).toStrictEqual(expectedData);
    });

    it("level one ", () => {
        const data = {
            'one_key': 'foo',
            'two_key': 'foo',
            'third_key': { 'one_key': 'foo', 'two_key': 'foo' },
        };
        const expectedData = {
            oneKey: 'foo',
            twoKey: 'foo',
            thirdKey: {
                oneKey: 'foo',
                twoKey: 'foo'
            },
        };
        expect(sanitizer(data, { deep: 1 })).toStrictEqual(expectedData);
    });

    it("level 0 ", () => {
        const data = {
            'one_key': 'foo',
            'two_key': 'foo',
            'third_key': { 'one_key': 'foo', 'two_key': 'foo' }
        };
        const expectedData = {
            oneKey: 'foo',
            twoKey: 'foo',
            thirdKey: {
                'one_key':'foo',
                'two_key': 'foo'
            },
        };
        expect(sanitizer(data, { deep: 0 })).toStrictEqual(expectedData);
    });

    it("level 2", () => {
        const data = {
            'one_key': 'foo',
            'two_key': 'foo',
            'third_key': {
                'one_keyth': 'foo',
                'two_keyth': 'foo',
                'forth_key': {
                    'one_keyft': 'foo',
                    'two_keyft': 'foo',
                    'fifth_key': {
                        'one_keyff': 'foo',
                        'two_keyff': 'foo',   
                    },
                },
            },
        };
        const expectedData = {
            oneKey: 'foo',
            twoKey: 'foo',
            thirdKey: {
                oneKeyth:'foo',
                twoKeyth: 'foo',
                forthKey: {
                    oneKeyft:'foo',
                    twoKeyft: 'foo',
                    fifthKey: {
                        'one_keyff': 'foo',
                        'two_keyff': 'foo',   
                    },
                },
            },
        };
        expect(sanitizer(data, { deep: 2 })).toStrictEqual(expectedData);
    });

    it("array data ", () => {
        const data = [{
            'one_key': 'foo',
            'two_key': 'foo',
            'third_key': { 'one_key': 'foo', 'two_key': 'foo' }
            },
            {
                'ff_key': 'foo',
            }
        ];
        const expectedData = [{
            oneKey: 'foo',
            twoKey: 'foo',
                thirdKey: {
                    oneKey: 'foo',
                    twoKey: 'foo'
                },
            },
            {
                ffKey: 'foo',
            },
        ];
        expect(sanitizer(data, { deep: 1 })).toStrictEqual(expectedData);
    });

    it("data has array of objects", () => {
        const data = {
            'one_key': 'foo',
            'two_key': 'foo',
            'third_key': [{ 'one_key': 'foo', 'two_key': 'foo' }],
        };
        const expectedData = {
            oneKey: 'foo',
            twoKey: 'foo',
            thirdKey: [{
                oneKey:'foo',
                twoKey: 'foo'
            }],
        };
        expect(sanitizer(data, { deep: 1, convertArray: true })).toStrictEqual(expectedData);
    });

    it("data has array of objects but array should not to convert", () => {
        const data = {
            'one_key': 'foo',
            'two_key': 'foo',
            'third_key': [{ 'one_key': 'foo', 'two_key': 'foo' }],
        };
        const expectedData = {
            oneKey: 'foo',
            twoKey: 'foo',
            thirdKey: [{
                'one_key':'foo',
                'two_key': 'foo'
            }],
        };
        expect(sanitizer(data, { deep: 1, convertArray: false })).toStrictEqual(expectedData);
    });
});