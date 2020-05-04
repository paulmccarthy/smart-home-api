const Redis = require('ioredis');

let instance = null;

class Store {
    constructor(config, logger) {
        this.redis = new Redis(config);
        this.logger = logger;

        const apiKeyConfig = Object.assign(...config);
        apiKeyConfig.db = config.db + 1;

        this.keyStore = new Redis(apiKeyConfig);
    }

    async getState(deviceName) {
        try {
            if (deviceName && deviceName.toLowerCase && deviceName.toLowerCase() !== 'apikey') {
                const redisValue = await this.redis.get(deviceName);
                return JSON.parse(redisValue);
            }

            return {};
        } catch (err) {
            this.logger.error(`Error getting ${deviceName} from redis: ${err.message}`);
            return {};
        }
    }

    async setState(deviceName, state) {
        try {
            if (deviceName && deviceName.toLowerCase && deviceName.toLowerCase() !== 'apikey') {
                const value = {
                    deviceName,
                    modifiedTime: new Date().valueOf(),
                    state
                };

                await this.redis.set(deviceName, JSON.stringify(value));
                return value;
            }

            return {};
        } catch (err) {
            return {};
        }
    }

    async getApiKey() {
        try {
            return await this.keyStore.get('apiKey');
        } catch (err) {
            return null;
        }
    }
}

module.exports = (config) => {
    if (instance == null) {
        instance = new Store(config);
    }

    return instance;
};
