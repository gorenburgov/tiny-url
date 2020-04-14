const crypto = require("crypto");
var shortHash = require("short-hash");
const start = Date.now();
const str = "Man oh man do I love ide";

const h = crypto.createHash("md5").update(str).digest("base64");

console.log(h);
console.log(Date.now() - start);

const start0 = Date.now();

let data = shortHash("str");
console.log(data);
console.log(Date.now() - start0);
let buff = new Buffer(data);
let base64data = buff.toString("base64");
console.log(base64data);

console.log(Date.now() - start0);

/*const start2 = Date.now();
let i = 0;
while (Date.now() - start2 < 4) {
    i++;
    let a = "sgfjdhfdf";
    a = a + Math.random().toString();
}
console.log(i);*/
