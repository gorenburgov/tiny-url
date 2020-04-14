const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/UrlMapping');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('mongoURI', keys.mongoURI);
console.log(keys);
console.log(process.env.MONGO_URI);
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

require('./routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
