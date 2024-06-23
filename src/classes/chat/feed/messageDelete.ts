import { DBUtil } from '../../../utils';
import { BaseChat } from '../base';
import { FeedType } from '../type';
import { ChatLogsType } from '../../../db';
import { Events } from '../../../types';
import { CommonChat } from '../common';

export class MessageDeleteFeed extends BaseChat<MessageDeleteFeedType> {
  constructor(raw: ChatLogsType) {
    super(raw);
    this.eventType = Events.messageDelete;
  }

  public get feedType() {
    return this.message.feedType;
  }

  public get logId() {
    return this.message.logId;
  }

  public async getOriginalMessage(): Promise<CommonChat> {
    if (!this.cached.originalMessage) {
      this.cached.orignalMessage = await DBUtil.getChatByLogId(
        this.message.logId,
      );
    }
    return this.cached.orignalMessage;
  }

  public async getOriginalUser() {
    if (!this.cached.originalUser) {
      const msg = await this.getOriginalMessage();
      this.cached.originalUser = await DBUtil.getUserByUserId(msg.userId);
    }
    return this.cached.originalUser;
  }

  public isHidden() {
    return this.message.hidden;
  }
}

export interface MessageDeleteFeedType {
  feedType: FeedType;
  logId: bigint;
  hidden: boolean;
}
