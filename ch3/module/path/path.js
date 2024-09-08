const path = require('path');

console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// Returns: 'quux.html'

console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
// Returns: 'quux'

console.log(path.dirname('/foo/bar/baz/asdf/quux.html'));

console.log(path.join(__dirname, '..', '/var.js'));

console.log(path.resolve(__dirname, '..', '/var.js'));

console.log(path.sep); // 윈도우 운영체제에서는 \ 

console.log('/foo/bar/baz/asdf/quux'.split(path.sep)); // 윈도우 운영체제의 경로 구분자는 \ 이기 때문에 문자열 전체가 반환

console.log('foo\\bar\\baz\\asdf\\quux'.split(path.sep)); 

console.log(path.extname('/foo/bar/baz/asdf/quux.html'));