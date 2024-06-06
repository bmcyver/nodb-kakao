import { BaseChat } from '../base';
import { ChatLogsType } from '../../../db';
import { BaseFeed } from '../type';
import { DBUtil } from '../../../utils';
import { Events } from '../../../types';

export class UserKickFeed extends BaseChat<UserKickFeedType> {
  constructor(raws: ChatLogsType) {
    super(raws);
    this.eventType = Events.userKick;
  }

  public async getKickUser() {
    if (!this.cached.kickUser) {
      this.cached.kickUser = await DBUtil.getUserByUserId(
        this.message.member.userId,
      );
    }
    return this.cached.kickUser;
  }

  public get kickUserId() {
    return this.message.member.userId;
  }

  public get kickUserNickName() {
    return this.message.member.nickName;
  }
}

export interface UserKickFeedType extends BaseFeed {
  member: {
    userId: number | bigint;
    nickName: string;
  };
}
