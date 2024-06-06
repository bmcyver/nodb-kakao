import { ChatLogsType } from '../db';
import { BaseFeed, ChatType, FeedType } from '../classes/chat/type';
import { CommonChat } from '../classes/chat/common';

import { DBUtil } from './DBUtil';
import {
  MessageDeleteFeed,
  MessageHideFeed,
  OpenLinkManageFeed,
  UserJoinFeed,
  UserKickFeed,
  UserLeaveFeed,
} from '../classes/chat/feed';

export function chatMapper(raw: ChatLogsType) {
  if (raw.type === ChatType.FEED) {
    const message = DBUtil.parse<BaseFeed>(
      DBUtil.decrypt(raw.message ?? '', DBUtil.userId, DBUtil.parse(raw.v)),
    );
    switch (message.feedType) {
      case FeedType.LEAVE:
      case FeedType.SECRET_LEAVE:
      case FeedType.OPENLINK_DELETE_LINK:
        return new UserLeaveFeed(raw);
      case FeedType.INVITE:
      case FeedType.OPENLINK_JOIN:
        return new UserJoinFeed(raw);
      case FeedType.OPENLINK_KICKED:
        return new UserKickFeed(raw);
      case FeedType.OPENLINK_STAFF_ON:
      case FeedType.OPENLINK_STAFF_OFF:
      case FeedType.OPENLINK_HAND_OVER_HOST:
        return new OpenLinkManageFeed(raw);
      case FeedType.DELETE_TO_ALL:
        return new MessageDeleteFeed(raw);
      case FeedType.OPENLINK_REWRITE_FEED:
        return new MessageHideFeed(raw);
      default:
        return new CommonChat(raw);
    }
  } else {
    return new CommonChat(raw);
  }
}
