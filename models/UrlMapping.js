const mongoose = require('mongoose');
const { Schema } = mongoose;

const UrlMapping = new Schema({
    hash: String,
    sourceUrl: String,
});

mongoose.model('urlMappings', UrlMapping);
