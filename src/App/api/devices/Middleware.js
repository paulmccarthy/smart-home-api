const rateLimiter = require('express-rate-limit');
const { validateGetState, validateSetState } = require('./validation');

module.exports = (store, config, logger) => ({
    async checkApiKey(req, res, next) {
        try {
            const storedKey = await store.getApiKey();
            const userKey = req.body.apiKey;

            if (storedKey && storedKey === userKey) {
                next();
            } else {
                const err = new Error(`Bad API key received from ${req.ip}: ${userKey}`);
                next(err);
            }
        } catch (err) {
            logger.error(`Error checking API Key ${err.message}`);
            next(err);
        }
    },
    rateLimit: rateLimiter(config.rateLimiting),
    validateGetState,
    validateSetState
});
