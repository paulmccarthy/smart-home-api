/* eslint-disable */
// noop the logger so it doesn't interfere with test output
// probably better ways to achieve this, eslint certainly thinks it's not a good idea.

const noop = () => Function();
module.exports = {
    info: noop,
    error: noop,
    warn: noop,
    debug: noop,
    log: noop
};
