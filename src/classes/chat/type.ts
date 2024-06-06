export enum ChatType {
  FEED = 0,
  TEXT = 1,
  PHOTO = 2,
  VIDEO = 3,
  CONTACT = 4,
  AUDIO = 5,
  DITEMEMOTICON = 6, // emoticon
  DITEMGIFT = 7,
  DITEMIMG = 8,
  KAKAOLINKV1 = 9,
  AVATAR = 11,
  STICKER = 12, // emoticon
  SCHEDULE = 13,
  VOTE = 14,
  LOTTERY = 15,
  MAP = 16,
  PROFILE = 17,
  FILE = 18,
  STICKERANI = 20,
  NUDGE = 21,
  ACTIONCON = 22,
  SEARCH = 23,
  POST = 24,
  STICKERGIF = 25,
  REPLY = 26,
  MULTIPHOTO = 27,
  VOIP = 51,
  LIVETALK = 52,
  CUSTOM = 71,
  ALIM = 72,
  PLUSFRIEND = 81,
  PLUSEVENT = 82,
  PLUSFRIENDVIRAL = 83,
  OPEN_SCHEDULE = 96,
  OPEN_VOTE = 97,
  OPEN_POST = 98,
}

export enum FeedType {
  UNDEFINED = -999999,
  LOCAL_LEAVE = 0,
  INVITE = 1, // invite
  LEAVE = 2, // leave
  SECRET_LEAVE = 3, // leave
  OPENLINK_JOIN = 4, // invite (join)
  OPENLINK_DELETE_LINK = 5, // ?
  OPENLINK_KICKED = 6, // kick
  CHAT_KICKED = 7, // ?
  CHAT_DELETED = 8, // ?
  RICH_CONTENT = 9, // ?
  OPENLINK_STAFF_ON = 10, // promote
  OPENLINK_STAFF_OFF = 11, // demote
  OPENLINK_REWRITE_FEED = 12, // hide
  DELETE_TO_ALL = 13, // delete
  OPENLINK_HAND_OVER_HOST = 14, // transfer
  DRAWER_DELETED = 15,
  WAREHOUSE_EVENT = 16,
  OPENLINK_ILLEGAL_BLIND = 17,
  TIMECHAT_SAFE_BOT_BLIND = 18,
  OPENLINK_BLIND = 19,
  CHAT_BOT_EVENT = 20,
  FEED_TYPE_SET_MSGTTL = 21,
}

export interface BaseFeed {
  feedType: number;
}
