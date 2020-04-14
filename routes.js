const mongoose = require('mongoose');
const { Path } = require('path-parser');
const { URL } = require('url');
const UrlMapping = mongoose.model('urlMappings');
const tinyHash = require('./utils/tinyHash');
const requireValidSourceUrl = require('./middlewares/requreValideSurceUrl');

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
        console.log(1111);
        // these loop is for checking hash collisions
        do {
            hash = tinyHash(req.body.sourceUrl + Math.random());
            console.log('hash', hash);
            try {
                mapping = await UrlMapping.findOne({ hash });
            } catch (e) {
                mapping = null;
            }
        } while (!!mapping && mapping.sourceUrl !== sourceUrl);
        console.log('hash', hash);
        console.log(mapping);
        if (!mapping) {
            console.log('2222');
            mapping = new UrlMapping({ hash, sourceUrl });
            mapping.save();
        }
        console.log(33333);
        const host = req.protocol + '://' + req.get('host');
        res.send({ tinyUrl: `${host}/tiny/${mapping.hash}` });
    });

    app.post('/source', async (req, res) => {
        const tinyUrl = req.body.tinyUrl;
        const p = new Path('/tiny/:hash');
        const match = p.test(new URL(tinyUrl).pathname);
        if (!match) {
            res.status(400).send({
                error: `The invalid URL!`,
            });
        }

        UrlMapping.findOne({ hash: match.hash }).then((mapping) =>
            res.send(
                mapping
                    ? { sourceUrl: mapping.sourceUrl }
                    : { error: 'This tinyUrl is not used currently.' }
            )
        );
    });
};
