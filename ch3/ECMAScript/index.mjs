// named export 문법. 정해진 이름으로 export 했기 때문에 받을 때도 정해진 이름으로 사용
import { odd, even } from "./var.mjs"; 

// default export 문법. 해당 파일에서 default로 export 했기 때문에 import 시에 이름은 무관
import checkNum from "./func.mjs"; 

function checkStringOddOrEven(str){
    if(str.length % 2 ){
        return odd;
    } else {
        return even;
    }
}

console.log(checkNum(10));
console.log(checkStringOddOrEven("ECMAScript!"));