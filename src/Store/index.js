const Redis = require('ioredis');

let instance = null;

class Store {
    constructor(config, logger) {
        this.redis = new Redis(config);
        this.logger = logger;
    }

    async getState(key) {
        try {
            const redisValue = await this.redis.get(key);
            return JSON.parse(redisValue);
        } catch (err) {
            this.logger.error(`Error getting ${key} from redis: ${err.message}`);
            return {};
        }
    }

    async setState(deviceName, state) {
        try {
            const value = {
                deviceName,
                modifiedTime: new Date().valueOf(),
                state
            };

            await this.redis.set(deviceName, JSON.stringify(value));
            return value;
        } catch (err) {
            return {};
        }
    }

    async getApiKey() {
        try {
            return await this.redis.get('apiKey');
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
