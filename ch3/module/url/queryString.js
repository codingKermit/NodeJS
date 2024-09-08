const url = require('url');
const queryString = require('querystring');

const parsedURL = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=node&category=javascript');
const query = queryString.parse(parsedURL.query);
console.log('queryString.parse() : ',query);
console.log('queryString.stringfy() : ' , queryString.stringify(query));
