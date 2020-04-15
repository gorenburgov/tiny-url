const mongoose = require('mongoose');
const { Schema } = mongoose;

const UrlMapping = new Schema({
    hash: String,
    sourceUrl: String,
    created: Number,
});

mongoose.model('urlMappings', UrlMapping);
