const ValidUrlRegexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

module.exports = (req, res, next) => {
    const sourceUrl = req.body.sourceUrl;
    if (!sourceUrl) {
        res.status(400).send({
            error: 'The source url should be provided!',
        });
        return;
    }

    if (!ValidUrlRegexp.test(sourceUrl)) {
        res.status(400).send({
            error: 'The source url is invalid!',
        });
        return;
    }

    if (
        sourceUrl.substr(0, 7).toLowerCase() !== 'http://' &&
        sourceUrl.substr(0, 8).toLowerCase() !== 'https://'
    ) {
        req.body.sourceUrl = 'http://' + sourceUrl;
    }

    next();
};
