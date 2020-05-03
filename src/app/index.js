const config = require('config');
const express = require('express');
const logger = require('./Logger');
const DevicesMiddleware = require('./api/devices/Middleware');
const DevicesRoutes = require('./api/devices/Routes');
const Store = require('../Store');

const redisConfig = config.get('redis');

const store = Store(redisConfig, logger);
const middleware = DevicesMiddleware(store, config, logger);

const deviceRoutes = DevicesRoutes(store, middleware, logger);

const app = express();

app.set('trust-proxy', true);

app.use(middleware.rateLimit);
app.use(express.json());
app.use('/api/devices', deviceRoutes);

// all errors will return 200 OK, with an empty json object - prevent information leaking
// express error handler must have 4 parameters, so ignore unused next
/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
    res.status(200).json({});
});

const port = config.get('app.port');
const host = config.get('app.host');

module.exports = {
    start: () => app.listen(port, host, () => {
        logger.info(`Server started listening on ${host}:${port}`);
    })
};
