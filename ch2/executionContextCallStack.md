## 실행 컨텍스트(Execution Context)
자바스크립트의 코드가 실행될 때 마다 생성되는 환경을 얘기합니다. 여기에는 `this` 등이 포함됩니다.  그리고 실행 컨텍스트는 아래의 두 가지로 구분할 수 있습니다.
- 전역 컨텍스트(Global Execution Context)
- 함수 컨텍스트(Function Execution Context)

실행 컨텍스트의 구조에는 다음의 세 가지 요소가 포함됩니다.
1. Variable Object(VO / 변수객체)
2. Scope Chain(SC)
3. this value

### 전역 컨텍스트(Global Execution Context)
함수 내에서 실행되지 않는 모든 코드는 전역 컨텍스트 내에서 실행됩니다.  자바스크립트 코드가 실행되면서 생성되는 컨텍스트 이며 여기서 `this`는 window를 가리킵니다. 예외적으로 Node.js에서는 `global`을 의미합니다

### 함수 컨텍스트(Function Execution Context)
함수 내에서 수행되는 코드는 함수 컨텍스트에서 실행됩니다.  여기서의 `this`는 호출 방법에 따라 달라질 수 있습니다.

## 호출 스택(Call Stack)
실행 컨텍스트는 스택 구조로 관리되며 이러한 데이터 구조를 호출 스택이라고 부릅니다.  
호출 스택은 LIFO(후입선출) 방식으로 관리되며 마지막에 들어온 것이 먼저 나가는 구조입니다.  
브라우저 환경 기준으로 호출 스택의 초기에는 `anonymous` 스택이 존재합니다. 이 `anonymous`는 일반적으로 전역 컨텍스트를 의미합니다.


---
참조 : [https://techwell.wooritech.com/docs/languages/javascript/execution-context/](https://techwell.wooritech.com/docs/languages/javascript/execution-context/)  
참조 : [https://developer.mozilla.org/ko/docs/Glossary/Call_stack](https://developer.mozilla.org/ko/docs/Glossary/Call_stack)  