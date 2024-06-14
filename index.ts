import { LogLevel, KakaoDB, Events } from './src';
import { User } from './src/classes';

const listener = new KakaoDB({
  mine: false,
  path: '/home/ubuntu/redroid/redroid/data/com.kakao.talk/',
  port: 3000,
  ip: '127.0.0.1',
  logLevel: LogLevel.DEBUG,
  ignoreError: false,
});

listener.on(Events.messageCreate, async (data) => {
  await data.channel.send('hello world!');

  // 파일 가져오기
  if (data.chat.isFile()) {
    const file = await data.chat.file.getFile();
  }

  // 음성 가져오기
  if (data.chat.isAudio()) {
    const audio = await data.chat.audio.getAudio();
  }

  // 답장 가져오기
  if (data.chat.isReply()) {
    const reply = data.chat.reply;
    const chat = await data.chat.reply.getChat();
    const user = await data.chat.reply.getUser();
  }
});

listener.on(Events.messageDelete, async (data) => {
  const deletedMessage = await data.chat.getOriginalMessage();
  await data.channel.send('메시지 삭제됨!');
});

listener.on(Events.messageHide, async (data) => {
  await data.channel.send('메시지 가려짐!');
});

listener.on(Events.userJoin, async (data) => {
  const users = await data.chat.getAllJoinUsers();
  await data.channel.send('유저가 들어왔어요!');
});

listener.on(Events.userLeave, async (data) => {
  const user = await data.chat.getUser();
  await data.channel.send('유저가 나갔어요!');
});

listener.on(Events.userKick, async (data) => {
  const user = await data.chat.getKickUser();
  await data.channel.send('유저가 추방당했습니다.');
});

listener.on(Events.openManage, async (data) => {
  if (data.chat.isGrant()) {
    const grantedUser = (await data.chat.getGrantUser()) as User;
    await data.channel.send(`${grantedUser?.name}님이 부방장이 되었어요.`);
  }
  if (data.chat.isRevoke()) {
    const revokeUser = (await data.chat.getRevokeUser()) as User;
    await data.channel.send(`${revokeUser?.name}님이 부방장에서 해제되었어요.`);
  }
  if (data.chat.isHandOver()) {
    const newHost = (await data.chat.getNewHost()) as User;
    const prevHost = (await data.chat.getPrevHost()) as User;
    await data.channel.send(
      `${prevHost?.name}님이 ${newHost?.name}님에게 방장을 넘겼어요.`,
    );
  }
});

listener.start();
