const mongoose = require('mongoose');
const { Path } = require('path-parser');
const { URL } = require('url');
const UrlMapping = mongoose.model('urlMappings');
const tinyHash = require('./utils/tinyHash');
const requireValidSourceUrl = require('./middlewares/requireValidSourceUrl');

module.exports = (app) => {
    app.get('/tiny/:hash', (req, res) => {
        const hash = req.params.hash;
        UrlMapping.findOne({ hash }).then((mapping) => {
            if (!mapping) {
                res.status(404).send({
                    error: "We havn't mapping for provided tinyUrl",
                });
                return;
            }
            res.redirect(mapping.sourceUrl);
        });
    });

    app.post('/tiny', requireValidSourceUrl, async (req, res) => {
        const sourceUrl = req.body.sourceUrl;
        let hash, mapping;

        try {
            mapping = await UrlMapping.findOne({ sourceUrl });
            if (!mapping) {
                // loop for avoiding hash collisions
                do {
                    hash = tinyHash(sourceUrl + Math.random());
                    mapping = await UrlMapping.findOne({ hash });
                } while (!!mapping);
                mapping = new UrlMapping({ hash, sourceUrl });
                await mapping.save();
            } else {
                hash = mapping.hash;
            }
            console.log('mapping', mapping);
            const host = 'http://' + req.get('host');
            res.send({ tinyUrl: `${host}/tiny/${hash}` });
        } catch (err) {
            res.status(500).send({ error: 'Internal server error' });
        }
    });

    app.post('/source', async (req, res) => {
        const tinyUrl = req.body.tinyUrl;
        const p = new Path('/tiny/:hash');
        const match = p.test(new URL(tinyUrl).pathname);

        if (!match) {
            res.status(400).send({
                error: `The invalid URL!`,
            });
            return;
        }

        const hash = match.hash;
        try {
            const mapping = await UrlMapping.findOne({ hash });
            res.send(
                !!mapping
                    ? { sourceUrl: mapping.sourceUrl }
                    : { error: 'This tinyUrl is not in use currrently.' }
            );
        } catch (e) {
            res.status(500).send({ error: 'Internal server error' });
        }
    });
};
