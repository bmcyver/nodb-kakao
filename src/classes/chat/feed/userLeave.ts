import { BaseChat } from '../base';
import { ChatLogsType } from '../../../db';
import { BaseFeed } from '../type';
import { DBUtil } from '../../../utils';
import { Events } from '../../../types';
import { User } from '../../user';

export class UserLeaveFeed extends BaseChat<UserLeaveFeedType> {
  constructor(raws: ChatLogsType) {
    super(raws);
    this.eventType = Events.userLeave;
  }

  public get nickName() {
    return this.message.member.nickName;
  }

  public async getUser(): Promise<User> {
    if (!this.cached.leftUser) {
      this.cached.leftUser = await DBUtil.getUserByUserId(
        this.message.member.userId,
      );
    }
    return this.cached.leftUser;
  }
}

export interface UserLeaveFeedType extends BaseFeed {
  member: {
    userId: number | bigint;
    nickName: string;
  };
}
