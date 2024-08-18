## 싱글 스레드
자바스크립트는 싱글 스레드 언어입니다. 그렇기 때문에 한번에 한 가지 일만 수행합니다.  
**❓하지만 비동기를 수행하는데?** 라는 생각이 든다면 자바스크립트 자체의 기능이 아니라 `WebAPIs`의 기능입니다. `WebAPIs`는 브라우저의 기능입니다.
**❓그럼 NodeJS는 어떻게 비동기 처리하는데?** 라는 생각이 든다면 여기서는 `libuv` 라는 라이브러리가 이를 처리해줍니다. Node.js의 기본 라이브러리 중 하나라서 따로 설치하지 않기 때문에 생소할 수 있습니다.

## 이벤트루프
이벤트루프는 자바스크립트가 비동기 작업을 처리하는 매커니즘입니다.  
자바스크립트의 이런 동작 구조를 이해하기 위해서 이벤트루프를 알아야합니다.  
다음은 이벤트루프의 시각화 자료입니다.
![이미지를 찾지 못했습니다](https://wsrv.nl/?url=https://blog.kakaocdn.net/dn/bEeJN4/btsabeBnUWX/exb9jS9LXWWW7oM1Yk832K/img.png)  
<small>출처 : https://wikidocs.net/251900</small>

위의 구조를 텍스트로 함께 적어본다면 다음의 순서를 가집니다. 
1. 함수가 호출되면 `Call stack`에 쌓이고 실행이 끝나면 빠져나옵니다.
2. 비동기 작업은 `WebAPIs`로 전달합니다. 
3. `WebAPIs`는 비동기 처리 완료 후 `Callback Queue`로 전달합니다.
4. `Call stack`이 비어 있다면 `Callback Queue`는 작업을 `Call stack`으로 전달합니다.
5. `Call stack`은 `Callback Queue`에서 받은 작업을 순차적으로 수행합니다.

여기서 놓칠 수 있을만한 부분은 아래 세 가지라 생각합니다. 
1. 비동기 작업은 정해진 종류의 작업만이 비동기 작업으로 수행될 수 있다는 점
2. `Callback Queue`는 `Call stack`이 비어있어야 작업을 전달한다는 점
3. `WebAPIs`에서 `Callback Queue`로 전달되는 순서는 알 수 없음. 작업이 끝나는 순서대로 전달됨.
4. `Callback Queue`에서는 작업의 우선순위가 있다는 점.

## Callback Queue
Callback Queue는 다음의 두 큐로 구성되어 있습니다.
- `Task Queue`
- `Microtask Queue`
위의 두 큐를 합쳐서 `Callback Queue` 라 부릅니다.  그리고 `Microtask Queue`는 `Task Queue`보다 우선순위를 가집니다.
Callback Queue를 Task Queue 라 부르기도 하는데 이 때에는 위의 두 큐를 합쳐서 부르는 경우가 일반적입니다.  

### Task Queue ( Macrotask Queue )
`Task Queue`는 `Microtask Queue`와 구분하기 위해 `Macrotask Queue` 라는 이름으로 부르기도 합니다. 여기에는 `setTimeout`, `setInterval` 등이 있습니다.
### Microtask Queue
`Microtask Queue`는 `Task Queue`보다 우선 순위를 가집니다.  
`Promise` 의 `then()`, `catch()` , `finally()` 등이 이에 속합니다.
위의 시각화 자료에서는 `Callback Queue` 라는 하나의 큐로 표현되어 혼동될 수 있지만 `Task Queue`와는 다른 큐입니다.  
만약 `Task Queue`에 5개의 작업이 있고 `Microtask Queue`에 3개의 작업이 있다면 `Microtask Queue`의 3개의 작업이 먼저 동작하고 `Task Queue`의 작업이 수행됩니다.

---
참조 : [https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop](https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop)  
참조 : [https://wikidocs.net/251900](https://wikidocs.net/251900)  