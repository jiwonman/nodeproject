# 1. Nodejs에 관하여

## 1.1 NodejS란?
<hr>

- 구글이 만든 V8엔진을 Javascript엔진으로 사용한다.
- event-driven 이라고 하는 Javascript 개발 방식
- non-blocking IO 라고 하는 컴퓨터의 입출력을 처리하는 방식

이 3가지 방식을 결합한 것이 NodeJs의 시작이다.

- 웹 브라우저에서 동작하는 Javascript가 서버 쪽에서도 동작하는 Javascript로 확장

## 1.2 Javascript 웹 브라우저 vs Nodejs
<hr>

- Javascript라는 기술을 얘기할 때 Nodejs는 Runtime에 해당되고, Web Browser는 language에 해당된다.
- Nodejs와 Web Browser는 서로 다른 영역에서 동작하는 기술이고, 서로가 협력적인 관계에 있는 기술이다.

## 1.3 Nodejs의 장점
<hr>

- 굉장히 속도가 좋은 V8엔진을 사용하기 때문에 성능이 좋다.
- event-driven, non-blocking IO 패러다임을 사용하기 때문에 이러한 것들이 적합한 경우에는 굉장히 적합한 퍼포먼스를 발휘하여 굉장히 성능이 좋은 애플리케이션을 만들 수 있다.
- 웹 브라우저에서도 자바 스크립트를 쓰고, 서버쪽에서도 자바 스크립트를 사용하여 하나의 완결된 애플리케이션을 만들 수 있다.

=> 하나의 언어로 애플리케이션을 구현할 수 있다는 것은 굉장히 매력적인 일이다.

# 2. Nodejs 설치
- https://nodejs.org/ko/ 사이트에 접속하여 다운로드 

### console.log 사용법
```
console.log('Hello World'); //Hello World
console.log('1+1'); //2
```
-  터미널에 현재 디렉토리 확인 dir
- 터미널에 node hello.js(해당 파일) 입력하면 console창에 Hello World와 2가 나오는 것을 볼 수 있다.

### localhost:3000 포트에 hello world 띄우기
```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
- require('http') : Nodejs에서 제공하는 http라는 모듈이 필요하다.
- createServer((req, res)) : Server를 만든다.
- listen(port, hostname) : 서버가 3000이라는 port와 '127.0.0.1'이라는 서버 이름을 읽는다.
- res.end() : 'Hello World'라는 응답 결과를 준다.
- http라는 모듈에 createServer라는 함수를 호출하면 Server라고 하는 객체를 return하는데 그 객체는 listen이라는 메소드를 가지고 있기 때문에 호출할 수 있다.
```
Server running at http://127.0.0.1:3000/
```


# 3. 인터넷의 동작 방법
- 컴퓨터와 컴퓨터가 인터넷을 통해 여러 협력적인 작업을 처리할 수 있게 되었다.

### 3.1 인터넷과 관련된 시스템
1. Client(고객)
- <strong>웹 브라우저</strong>에 설치되어있는 컴퓨터(요청하는 쪽)

2. Server(고객이 요청하는 것에 대한 무언가를 제공하는 쪽)
- 요청한 정보를 클라이언트에게 보내 주는 것 (응답하는 쪽) 

=>  클라이언트와 고객은 갑을관계

#### domain : 이름, IP : 실제 접속 주소

<hr>

### 3.2 결론
- Nodejs가 신경쓰고 있는 분야는 서버쪽에 위치하면서 빠르고 편리하게 Server로 들어오는 요청을 응답하는 어떤 애플리케이션을 만들 수 있는 기반 시스템을 제공한다.

# 4. 모듈
- 부품, 모델이라고 생각하면 된다.
- require('http') : Nodejs에서 제공하는 http라는 모듈이 필요하다.
- const : 값이 한 번 할당되면 할당된 값을 바꿀 수 없는 상수이다.(private)
- 부품을 가져다 쓰고 싶을 때는 require()이라는 함수를 사용한다.

#### os.platform()
- 자신의 os를 확인하는 모듈

### 위의 모듈들은 Javascript가 제공하는 모듈들이었다.(기본적인 명령, 기능들)

# 5. NPM(Node Package Manager)
- Node계의 앱스토어
- 어떤 모듈을 설치, 삭제, 업그레이드, 의존성 관리를 해주는 모듈

npm install uglify-js -g (전역적으로 설치 할 수 있는 독립적인 소프트웨어 설치)
npm install uglify-js (현재 npm이 실행되는 프로젝트의 부품으로 사용)

### npm init
- npm상에서 현재 디렉토리를 패키지로 지정하는 명령
- name : 이 프로젝트의 이름 지정하는 것. ()안에 있는 값을 그대로 엔터치면 그대로 괄호 안의 값을 지정
- description : 직접 쓰는 것을 권장 (tutorials)
- entrypoint : 만든 패키지 안의 여러 개의 자바스크립트 중에 패키지를 구동하는 자바스크립트를 지정
- test command : 이 패키지 안에서 어떤 명령을 실행하면 테스트를 실행시킬 수 있는가
- git repository : git에 올라가게 된다면 git의 주소를 적어라

=> package.json이라는 파일을 생성해주는 역할을 한다.


### npm install underscore --save
```
 "dependencies": {
    "uglify-js": "^3.14.5",
    "underscore": "^1.13.2"
  }
```
- 새로운 폴더에 프로젝트를 다시 시작하더라도 underscore, uglify-js 라는 패키지를 쉽게 가져올 수 있다.
- node 5.0.0 버전 이상부터는 --save가 default모드이기 때문에 npm install (패키지 이름) 으로 실행한다.

### 정리
- npm install uglify-js -g (전역적으로 설치 할 수 있는 독립적인 소프트웨어 설치)
- npm install uglify-js (현재 npm이 실행되는 프로젝트의 부품으로 사용)
- node 5.0.0 버전 이상부터는 --save가 default모드이기 때문에 npm install (패키지 이름) 으로 실행한다.
- npm init -> npm상에서 현재 디렉토리를 패키지로 지정하는 명령





