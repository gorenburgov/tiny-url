const validUrl = require('valid-url');

module.exports = (req, res, next) => {
    const sourceUrl = req.body.sourceUrl;
    if (!sourceUrl) {
        res.status(400).send({
            error: 'The source url should be provided!',
        });
        return;
    }

    if (!validUrl.isUri(sourceUrl)) {
        res.status(400).send({
            error: 'The source url is invalid!',
        });
        return;
    }
    next();
};
