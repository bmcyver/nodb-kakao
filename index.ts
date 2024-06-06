import { LogLevel, KakaoDB, Events } from './src';

const listener = new KakaoDB({
  debug: false,
  path: '/home/ubuntu/redroid/redroid/data/com.kakao.talk/',
  port: 3000,
  ip: '127.0.0.1',
  logLevel: LogLevel.DEBUG,
});

listener.on(Events.messageCreate, async (data) => {});
listener.on(Events.messageDelete, async (data) => {});
listener.on(Events.messageHide, async (data) => {});
listener.on(Events.userJoin, async (data) => {});
listener.on(Events.userLeave, async (data) => {});
listener.on(Events.userKick, async (data) => {});
listener.on(Events.openManage, async (data) => {});

listener.start();
