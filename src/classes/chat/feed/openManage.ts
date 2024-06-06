import { BaseChat } from '../base';
import { ChatLogsType, FriendsType } from '../../../db';
import { BaseFeed, FeedType } from '../type';
import { DBUtil } from '../../../utils';
import { Events } from '../../../types';

export class OpenLinkManageFeed extends BaseChat<
  OpenLinkHandOverFeedType | OpenLinkManageFeedType
> {
  constructor(raws: ChatLogsType) {
    super(raws);
    this.eventType = Events.openManage;
  }

  public async getGrantUser(): Promise<FriendsType | undefined> {
    if (!this.cached.grantUser) {
      this.cached.grantUser = await DBUtil.getUserByUserId(
        (this.message as OpenLinkManageFeedType).member.userId,
      );
    }
    return this.cached.grantUser;
  }

  public async getRevokeUser(): Promise<FriendsType | undefined> {
    if (!this.cached.revokeUser) {
      this.cached.revokeUser = await DBUtil.getUserByUserId(
        (this.message as OpenLinkManageFeedType).member.userId,
      );
    }
    return this.cached.revokeUser;
  }

  public async getPrevHost(): Promise<FriendsType | undefined> {
    if (!this.cached.prevHost) {
      this.cached.prevHost = await DBUtil.getUserByUserId(
        (this.message as OpenLinkHandOverFeedType).prevHost.userId,
      );
    }
    return this.cached.prevHost;
  }

  public async getNewHost(): Promise<FriendsType | undefined> {
    if (!this.cached.newHost) {
      this.cached.newHost = await DBUtil.getUserByUserId(
        (this.message as OpenLinkHandOverFeedType).newHost.userId,
      );
    }
    return this.cached.newHost;
  }

  public isGrant(): this is OpenLinkManageFeed & {
    getGrantUser: () => Promise<FriendsType>;
  } {
    return this.message.feedType === FeedType.OPENLINK_STAFF_ON;
  }

  public isRevoke(): this is OpenLinkManageFeed & {
    getRevokeUser: () => Promise<FriendsType>;
  } {
    return this.message.feedType === FeedType.OPENLINK_STAFF_OFF;
  }

  public isHandOver(): this is OpenLinkManageFeed & {
    getPrevHost: () => Promise<FriendsType>;
    getNewHost: () => Promise<FriendsType>;
  } {
    return this.message.feedType === FeedType.OPENLINK_HAND_OVER_HOST;
  }
}

export interface OpenLinkHandOverFeedType extends BaseFeed {
  prevHost: { userId: bigint | number; nickName: string };
  newHost: { userId: bigint | number; nickName: string };
}

export interface OpenLinkManageFeedType extends BaseFeed {
  member: { userId: bigint | number; nickName: string };
}
