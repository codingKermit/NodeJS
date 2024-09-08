const url = require('url');

const {URL} = url;

const myURL = new URL('htt://www.github.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

console.log('new URL : ', myURL);
console.log('url.format() : ', url.format(myURL));