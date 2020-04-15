const { URL } = require('url');

const str = 'http://www.gazeta.ru';

const u = new URL(str);

console.log(u.host);
