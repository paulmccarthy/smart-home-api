const router = require('express').Router();

module.exports = (store, middleware, logger) => {
    router.post('/get-state', middleware.checkApiKey, async (req, res) => {
        try {
            const result = await store.getState(req.body.deviceName);
            res.status(200).json(result);
        } catch (err) {
            logger.error(`Error handling get-state: ${err.message}`);
            logger.error(err.stack);
            res.status(200).json({});
        }
    });

    router.post('/set-state', middleware.checkApiKey, async (req, res) => {
        try {
            await store.setState(req.body.deviceName, req.body.state);
            const newState = await store.getState(req.body.deviceName);
            newState.deviceName = req.body.deviceName;
            res.status(200).json(newState);
        } catch (err) {
            logger.error(`Error handling set-state: ${err.message}`);
            logger.error(err.stack);
            res.status(200).json({});
        }
    });

    return router;
};
