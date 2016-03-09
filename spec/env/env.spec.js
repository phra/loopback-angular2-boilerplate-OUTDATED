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

    it('it has development env with DOMAIN defined', function() {
        expect(typeof env.development.DOMAIN).toBe('string');
    });

    it('it has development env with HOST defined', function() {
        expect(typeof env.development.HOST).toBe('string');
    });

    it('it has development env with RECAPTCHA defined', function() {
        expect(typeof env.development.RECAPTCHA).toBe('boolean');
    });

    it('it has development env with MORGAN defined', function() {
        expect(typeof env.development.MORGAN).toBe('boolean');
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

    it('it has staging env with DOMAIN defined', function() {
        expect(typeof env.staging.DOMAIN).toBe('string');
    });

    it('it has staging env with HOST defined', function() {
        expect(typeof env.staging.HOST).toBe('string');
    });

    it('it has staging env with RECAPTCHA defined', function() {
        expect(typeof env.staging.RECAPTCHA).toBe('boolean');
    });

    it('it has staging env with MORGAN defined', function() {
        expect(typeof env.staging.MORGAN).toBe('boolean');
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

    it('it has production env with DOMAIN defined', function() {
        expect(typeof env.production.DOMAIN).toBe('string');
    });

    it('it has production env with HOST defined', function() {
        expect(typeof env.production.HOST).toBe('string');
    });

    it('it has production env with RECAPTCHA defined', function() {
        expect(typeof env.production.RECAPTCHA).toBe('boolean');
    });

    it('it has production env with MORGAN defined', function() {
        expect(typeof env.production.MORGAN).toBe('boolean');
    });

});
