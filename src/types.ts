import {
  Channel,
  CommonChat,
  MessageDeleteFeed,
  MessageHideFeed,
  OpenLinkManageFeed,
  User,
  UserJoinFeed,
  UserKickFeed,
  UserLeaveFeed,
} from './classes';
import { LogLevel } from './logger';

export interface InitInterface {

  /**
   * 카카오톡 계정의 userId입니다. (없다면 자동으로 불러옵니다.)
   * @example
   * 1234567890
   */
  userId?: string | number;

  /**
   * 소켓을 전송할때 사용될 주소입니다.
   * @example
   * 127.0.0.1
   */
  ip: string;

  /**
   * 소켓을 전송할때 사용될 포트입니다.
   * @example
   * 3000
   */
  port: number;

  /**
   * 카카오톡 폴더입니다. (절대 경로를 입력해주세요.)
   * @example
   * /path/to/com.kakao.talk/
   */
  path: string;

  /**
   * 자기 자신의 메시지를 감지할지 정합니다.
   * @description
   * 자기 자신의 메시지를 감지하면 예기치 못한 결과가 발생할 수 있습니다. 프로덕션 환경에서는 false로 사용한는것을 추천합니다.
   * @example
   * false
   */
  mine: boolean;

  /**
   * 로그 레벨입니다.
   * @description
   * 개발은 DEBUG, 프로덕션은 INFO를 사용하는것을 추천합니다.
   *
   * +) 이 라이브러리는 debug, info, error를 주로 사용합니다.
   * @example
   * LogLevel.DEBUG
   */
  logLevel: LogLevel;

  /**
   * 에러를 무시할지 정합니다.
   * @description
   * 에러를 모두 무시하나, 치명적인 결과가 발생할 수 있습니다.
   * @example
   * true
   */
  ignoreError: boolean;
}

export enum Events {
  /**
   * 메시지가 생성되었을때 호출됩니다.
   */
  messageCreate = 'messageCreate',
  /**
   * 메시지가 삭제되었을때 호출됩니다.
   */
  messageDelete = 'messageDelete',
  /**
   * 메시지가 가려졌을때 호출됩니다.
   */
  messageHide = 'messageHide',
  /**
   * 유저가 채널을 나갔을때 호출됩니다.
   */
  userLeave = 'userLeave',
  /**
   * 유저가 채널에서 내보내졌을때 호출됩니다.
   */
  userKick = 'userKick',
  /**
   * 유저가 채널에 들어왔을때 호출됩니다.
   */
  userJoin = 'userJoin',
  /**
   * 오픈링크에서 관리진의 변경이 있을때 호출됩니다.
   */
  openManage = 'openManage',
}

export type MessageEvents = {
  [Events.messageCreate]: (data: messageCreateType) => void;
  [Events.messageDelete]: (data: messageDeleteType) => void;
  [Events.messageHide]: (data: messageHideType) => void;
  [Events.userLeave]: (data: userLeaveType) => void;
  [Events.userKick]: (data: userKickType) => void;
  [Events.userJoin]: (data: userJoinType) => void;
  [Events.openManage]: (data: openManageType) => void;
};

type messageCreateType = { chat: CommonChat; user: User; channel: Channel };
type messageDeleteType = {
  chat: MessageDeleteFeed;
  user: User;
  channel: Channel;
};
type messageHideType = { chat: MessageHideFeed; user: User; channel: Channel };
type userLeaveType = { chat: UserLeaveFeed; user: User; channel: Channel };
type userKickType = { chat: UserKickFeed; user: User; channel: Channel };
type userJoinType = { chat: UserJoinFeed; user: User; channel: Channel };
type openManageType = {
  chat: OpenLinkManageFeed;
  user: User;
  channel: Channel;
};
