'use strict';

describe('test env.json', function() {
    var env;

    beforeEach(function() {
        env = require('../../env.json');
    });

    afterEach(function() {
        env = undefined;
    });

    it('require(env.json) works', function() {
        expect(env).toBeDefined();
    });

    it('it has development env', function() {
        expect(env.development).toBeDefined();
    });

    it('it has development env with NODE_END defined', function() {
        expect(env.development.NODE_ENV).toBe('development');
    });

    it('it has development env with PORT defined', function() {
        expect(typeof env.development.PORT).toBe('number');
    });

    it('it has staging env', function() {
        expect(env.staging).toBeDefined();
    });

    it('it has staging env with NODE_END defined', function() {
        expect(env.staging.NODE_ENV).toBe('staging');
    });

    it('it has staging env with PORT defined', function() {
        expect(typeof env.staging.PORT).toBe('number');
    });

    it('it has production env', function() {
        expect(env.production).toBeDefined();
    });

    it('it has production env with NODE_END defined', function() {
        expect(env.production.NODE_ENV).toBe('production');
    });

    it('it has production env with PORT defined', function() {
        expect(typeof env.production.PORT).toBe('number');
    });
});
