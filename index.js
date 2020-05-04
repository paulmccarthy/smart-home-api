const config = require('config');
const Store = require('./src/Store');
const logger = require('./src/Logger');
const App = require('./src/App');

const storeConfig = config.get('store');
const appConfig = config.get('app');

const store = Store(storeConfig, logger);
const app = App(store, appConfig, logger);

app.start();
