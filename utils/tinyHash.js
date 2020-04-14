var shortHash = require("short-hash");

module.exports = (url) => {
    return shortHash(url);
};
