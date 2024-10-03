const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1',()=>{
    console.log('이벤트1')
})


myEvent.on('event2',()=>{
    console.log('이벤트 2');
})

myEvent.on('event2',()=>{
    console.log('이벤트2 추가');
})

myEvent.addListener('event1',()=>{
    console.log('addEventListener 에도 동일하게 콜백이 추가 되는지 확인하기 위한 이벤트 추가');
})

myEvent.once('event3',()=>{ // 한번만 실행되는 이벤트 트리거
    console.log('이벤트 3. 한번만 실행됨');
})

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.emit('event3'); // 최초 1회 실행
myEvent.emit('event3'); // 실행 되지 않음

myEvent.on('event4',()=>{
    console.log('이벤트 4');
})

myEvent.on('event4',()=>{
    console.log('removeAllListeners와 removeListener 를 비교하기 위해 이벤트 리스너 2개 등록');
})

myEvent.removeAllListeners('event4'); // event4 이벤트 전체 삭제

myEvent.emit('event4');

const callback1 = (stream) =>{
    console.log('이벤트5');
}

const callback2 = (stream) =>{
    console.log('removeListener 테스트용');
}

myEvent.on('event5',callback1)
myEvent.on('event5',callback2)


myEvent.removeListener('event5',callback1); // callback1 은 삭제되고 callback2 만 남음

myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));