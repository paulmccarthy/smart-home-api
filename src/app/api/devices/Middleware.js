const rateLimiter = require('express-rate-limit');

module.exports = (store, config, logger) => ({
    async checkApiKey(req, res, next) {
        try {
            const storedKey = await store.getApiKey();
            const userKey = req.body.apiKey;

            if (storedKey && storedKey === userKey) {
                next();
            } else {
                logger.warn(`Bad API key received from ${req.ip}: ${userKey}`);
                res.status(200).json({});
            }
        } catch (err) {
            logger.error(`Error checking API Key ${err.message}`);
            logger.error(err.stack);
            res.status(200).json({});
        }
    },
    rateLimit: rateLimiter(config.rateLimiting)
}
);
