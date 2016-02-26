'use strict';

describe('test env.json', function() {
    var test;

    beforeEach(function() {
        test = true;
    });

    afterEach(function() {
        test = undefined;
    });

    it('require(env.json) works', function() {
        expect(test).toBeDefined();
        expect(test).toBe(true);
    });
});
