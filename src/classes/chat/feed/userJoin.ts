import { BaseChat } from '../base';
import { ChatLogsType } from '../../../db';
import { BaseFeed } from '../type';
import { DBUtil } from '../../../utils';
import { logger } from '../../../logger';
import { Events } from '../../../types';

export class UserJoinFeed extends BaseChat<UserJoinFeedType> {
  constructor(raws: ChatLogsType) {
    super(raws);
    this.eventType = Events.userJoin;
  }

  public async getJoinUserAt(at: number = 0) {
    //TODO: If user joined, db2.friends is not updated immediately. So, add some sleep?
    logger.warn(
      '⚠️ We recommend not to use this function. Because db2.friends is not updated immediately if user joined. It will be patched soon',
    );
    if (this.joinUserCount < at) {
      throw new Error(`too high`);
    }
    if (!this.cached[`joinUser_${at}`]) {
      this.cached[`joinUser_${at}`] = DBUtil.getUserByUserId(
        this.message.members[at].userId,
      );
    }
    return this.cached[`joinUser_${at}`];
  }

  public async getAllJoinUsers() {
    //TODO: If user joined, db2.friends is not updated immediately. So, add some sleep?
    logger.warn(
      '⚠️ We recommend not to use this function. Because db2.friends is not updated immediately if user joined. It will be patched soon',
    );
    if (!this.cached.joinUsers) {
      this.cached.joinUsers = this.message.members.map(
        async (v) => await DBUtil.getUserByUserId(v.userId),
      );
    }
    return this.cached.joinUsers;
  }

  public get joinUserNames() {
    return this.message.members.map((v) => v.nickName);
  }

  public get joinUserIds() {
    return this.message.members.map((v) => v.userId);
  }

  public get joinUserCount() {
    return this.message.members.length;
  }
}

export interface UserJoinFeedType extends BaseFeed {
  members: {
    userId: number | bigint;
    nickName: string;
  }[];
}
