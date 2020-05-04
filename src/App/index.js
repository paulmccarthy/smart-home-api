const express = require('express');
const inspect = require('util').inspect;

const DevicesMiddleware = require('./api/devices/Middleware');
const DevicesRoutes = require('./api/devices/Routes');

module.exports = (store, config, logger) => {
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
        logger.error(`Error: ${err.message}`);
        logger.error(`Body: ${inspect(req.body)}`);
        logger.error(`Params: ${inspect(req.params)}`);
        logger.error(`Stack: ${err.stack}`);
        res.status(200).json({});
    });

    const port = config.app.port;
    const host = config.app.host;

    return {
        start: () => app.listen(port, host, () => {
            logger.info(`Server started listening on ${host}:${port}`);
        }),
        stop: (server) => server.close()
    };
};
