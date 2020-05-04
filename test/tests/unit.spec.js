/* eslint-disable prefer-arrow-callback */
const expect = require('chai').expect;
const request = require('request-promise');
const config = require('config');

// Mocks
const MockStore = require('../mocks/MockStore');
const logger = require('../mocks/mockLogger');

// Module under test
const App = require('../../src/App');

let mockStore;
let app;
let server;
const apiKey = 'abc1234';
const appConfig = config.get('app');
const baseUrl = `http://${appConfig.host}:${appConfig.port}/api/devices`;

describe('Unit tests for the API endpoints', function () {
    describe('/set-state', function () {
        beforeEach('Test setup', async function () {
            mockStore = await new MockStore(apiKey);
            app = App(mockStore, config, logger);
            server = await app.start();
        });

        this.afterEach('Teardown', async function () {
            await server.close();
            mockStore = null;
            server = null;
            app = null;
        });

        it('should save the object when parameters are correct', async function () {
            const body = {
                deviceName: 'test-device',
                state: 1,
                apiKey
            };

            const result = await request({
                method: 'POST',
                uri: `${baseUrl}/set-state`,
                body,
                json: true,
                resolveWithFullResponse: true
            });

            expect(result.statusCode).to.be.equal(200);
            expect(result.body).to.be.an('object');
            expect(result.body.deviceName).to.equal(body.deviceName);
            expect(result.body.state).to.equal(body.state);
            expect(result.body.modifiedTime).to.be.a('number');
        });

        it('should return an empty object when parameters are missing', async function () {
            const body = {
                state: 1,
                apiKey
            };

            const result = await request({
                method: 'POST',
                uri: `${baseUrl}/set-state`,
                body,
                json: true,
                resolveWithFullResponse: true
            });

            expect(result.statusCode).to.be.equal(200);
            expect(result.body).to.be.an('object');
            expect(result.body).to.deep.equal({});
        });
    });
});
