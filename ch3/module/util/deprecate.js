/*
--상황 예시--
oldFunction을 export 하던 모듈이 util.deprecate() 한 deprecatedFunction 을 export 하면
이 모듈을 가져다 사용하는 곳에서는 코드 변화 없이 deprecated 된 함수를 사용하게 되어 메세지를 확인 가능
*/

const util = require('util');

const oldFunction = (x,y) => {
    console.log(x+y);
}

const deprecatedFunction = util.deprecate(oldFunction,'deprecated 되었으니 사용하지 마세요');

export default deprecatedFunction;