import { BaseChat } from '../base';
import { ChatLogsType } from '../../../db';
import { BaseFeed } from '../type';
import { DBUtil } from '../../../utils';
import { Events } from '../../../types';
import { User } from '../../user';

export class UserKickFeed extends BaseChat<UserKickFeedType> {
  constructor(raws: ChatLogsType) {
    super(raws);
    this.eventType = Events.userKick;
  }

  public get kickUserId() {
    return this.message.member.userId;
  }

  public get kickUserNickName() {
    return this.message.member.nickName;
  }

  public async getKickUser(): Promise<User> {
    if (!this.cached.kickUser) {
      this.cached.kickUser = await DBUtil.getUserByUserId(
        this.message.member.userId,
      );
    }
    return this.cached.kickUser;
  }
}

export interface UserKickFeedType extends BaseFeed {
  member: {
    userId: number | bigint;
    nickName: string;
  };
}
