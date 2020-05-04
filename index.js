const config = require('config');
const Store = require('./src/Store');
const logger = require('./src/Logger');
const App = require('./src/App');

const storeConfig = config.get('store');

const store = Store(storeConfig, logger);
const app = App(store, config, logger);

app.start();
