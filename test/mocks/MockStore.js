class MockStore {
    constructor(apiKey) {
        this.internal = {
            apiKey
        };
    }

    async getState(key) {
        return JSON.parse(this.internal[key]);
    }

    async setState(key, state) {
        const value = {
            deviceName: key,
            state,
            modifiedTime: new Date().valueOf()
        };

        this.internal[key] = JSON.stringify(value);

        return value;
    }

    getApiKey() {
        return this.internal.apiKey;
    }
}

module.exports = MockStore;
