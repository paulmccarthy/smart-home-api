const router = require('express').Router();
const inspect = require('util').inspect;

module.exports = (store, middleware, logger) => {
    const { checkApiKey, validateGetState, validateSetState } = middleware;

    router.post('/get-state', checkApiKey, validateGetState, async (req, res, next) => {
        logger.info(`/get-state called with ${inspect(req.body)}`);
        try {
            const result = await store.getState(req.body.deviceName);
            res.status(200).json(result);
        } catch (err) {
            logger.error(`Error handling get-state: ${err.message}`);
            next(err);
        }
    });

    router.post('/set-state', checkApiKey, validateSetState, async (req, res, next) => {
        logger.info(`/set-state called with ${inspect(req.body)}`);
        try {
            const storedState = await store.setState(req.body.deviceName, req.body.state);
            res.status(200).json(storedState);
        } catch (err) {
            logger.error(`Error handling set-state: ${err.message}`);
            next(err);
        }
    });

    return router;
};
