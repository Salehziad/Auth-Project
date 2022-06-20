'use strict';



const logger = require('../../src/auth/middleware/logger');

describe('logger middleware', () => {

    let consoleSpy;
    let req = {};
    let res = {};
    let next = jest.fn();

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log');
    });

    test('it is logging something or routes', () => {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    });

    test('it is calling next', () => {
        expect(next).toHaveBeenCalled();
    });
})