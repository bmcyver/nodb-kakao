# Nodejs KakaoTalk Database Listener
Node.js 기반 카카오 디비 리스너

## 설치
 - [리드로이드](https://github.com/remote-android/redroid-doc)
   - 설치방법은 [여기](docs/redroid.md)를 참고하세요.
   - 파일만 접근 가능하고, nodejs가 돌아가는 환경이라면 리드로이드 외에도 사용 가능합니다.
 - 메신저봇
   - 설치방법은 [여기](/docs/msgbot.md)를 참고하세요.

## 라이센스
 - MIT 라이센스

## 사용 방법


### typescript
먼저 아래 코드를 실행시켜주세요.
```bash
npm install
```
[index.ts](/index.ts) 파일에 원하시는 코드를 작성해주세요.
```typescript
import { LogLevel, KakaoDB, Events } from './src';

const listener = new KakaoDB({
  debug: false,
  path: 'path/to/data/com.kakao.talk/',
  port: 3000,
  ip: '127.0.0.1',
  logLevel: LogLevel.DEBUG, 
  ignoreError: false,
});

listener.on(Events.messageCreate, async (data) => {});
listener.on(Events.messageDelete, async (data) => {});
listener.on(Events.messageHide, async (data) => {});
listener.on(Events.userJoin, async (data) => {});
listener.on(Events.userLeave, async (data) => {});
listener.on(Events.userKick, async (data) => {});
listener.on(Events.openManage, async (data) => {});

listener.start();
```
이후 아래 코드를 실행시켜 주세요.
```bash
npm build
npm start
```
또는
``` bash
npm dev
```


### javascript
아래 명령어를 먼저 실행해주세요.
```bash
npm install
npm run build
```
이후 index.js를 만드신 후, 아래와 같은 형식으로 작성해주세요.
```javascript
const { LogLevel, KakaoDB, Events } = require('./dist/src');

const listener = new KakaoDB({
  mine: false,
  path: 'path/to/data/com.kakao.talk/',
  port: 3000,
  ip: '127.0.0.1',
  logLevel: LogLevel.DEBUG,
  ignoreError: false,
});

listener.on(Events.messageCreate, async (data) => {});
listener.on(Events.messageDelete, async (data) => {});
listener.on(Events.messageHide, async (data) => {});
listener.on(Events.userJoin, async (data) => {});
listener.on(Events.userLeave, async (data) => {});
listener.on(Events.userKick, async (data) => {});
listener.on(Events.openManage, async (data) => {});

listener.start();
```

## 예제
[index.ts](/index.ts) 파일을 참고하세요.

pr과 issue는 매우 환영합니다 :D