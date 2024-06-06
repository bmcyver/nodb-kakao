import { ChatRoomsType, OpenLinkType, WarehouseInfoType } from '../../db';
import { DBUtil } from '../../utils';
import { OpenLinkChannel } from './openLink';
import { WarehouseChannel } from './warehouse';
import { ChannelType } from '../../socket';
import { logger } from '../../logger';

export class Channel {
  private cached: Record<string, any> = {};

  constructor(
    private readonly raw: ChatRoomsType,
    private readonly open?: OpenLinkType | null,
    private readonly team?: WarehouseInfoType | null,
  ) {}

  get _id() {
    return this.raw._id;
  }

  get id() {
    return this.raw.id;
  }

  get type() {
    return this.raw.type;
  }

  get members() {
    if (!this.cached.members) {
      this.cached.members = DBUtil.parse(
        this.raw.members ?? ([] as unknown as string),
      );
    }
    return this.cached.members;
  }

  get activeMemberIds() {
    if (!this.cached.activeMemberIds) {
      this.cached.activeMemberIds = DBUtil.parse(
        this.raw.activeMemberIds ?? ([] as unknown as string),
      );
    }
    return this.cached.activeMemberIds;
  }

  get lastLogId() {
    return this.raw.lastLogId;
  }

  get lastMessage() {
    return this.raw.lastMessage;
  }

  get lastUpdatedAt() {
    return this.raw.lastUpdatedAt;
  }

  get unreadCount() {
    return this.raw.unreadCount;
  }

  get watermarks() {
    if (!this.cached.watermarks) {
      this.cached.watermarks = DBUtil.parse(
        this.raw.watermarks ?? ([] as unknown as string),
      );
    }
    return this.cached.watermarks;
  }

  get temporaryMessage() {
    return this.raw.temporaryMessage;
  }

  get v() {
    return this.raw.v;
  }

  get ext() {
    return this.raw.ext;
  }

  get lastReadLogId() {
    return this.raw.lastReadLogId;
  }

  get lastUpdateSeenId() {
    return this.raw.lastUpdateSeenId;
  }

  get activeMembersCount() {
    return this.raw.activeMembersCount;
  }

  get meta() {
    return this.raw.meta;
  }

  get isHint() {
    return this.raw.isHint;
  }

  get privateMeta() {
    return this.raw.privateMeta;
  }

  get lastChatLogType() {
    return this.raw.lastChatLogType;
  }

  get schatToken() {
    return this.raw.schatToken;
  }

  get lastSkeyToken() {
    return this.raw.lastSkeyToken;
  }

  get lastPkTokens() {
    return this.raw.lastPkTokens;
  }

  get linkId() {
    return this.raw.linkId;
  }

  get moimMeta() {
    return this.raw.moimMeta;
  }

  get inviteInfo() {
    return this.raw.inviteInfo;
  }

  get blindedMemberIds() {
    if (!this.cached.blindedMemberIds) {
      this.cached.blindedMemberIds = DBUtil.parse(
        this.raw.blindedMemberIds as unknown as string,
      );
    }
    return this.cached.blindedMemberIds;
  }

  get muteUntilAt() {
    return this.raw.muteUntilAt;
  }

  get lastJoinedLogId() {
    return this.raw.lastJoinedLogId;
  }

  public get openLink(): OpenLinkChannel | undefined {
    if (!this.isOpenLinkChannel() || !this.open) {
      logger.warn('⚠️ Use isOpenLinkChannel() before accessing openLink');
      return undefined;
    }
    if (!this.cached.open) {
      this.cached.open = new OpenLinkChannel(this.open);
    }
    return this.cached.open;
  }

  public get warehouse(): WarehouseChannel | undefined {
    if (!this.isWarehouseChannel() || !this.team) {
      logger.warn('⚠️ Use isOpenLinkChannel() before accessing openLink');
      return undefined;
    }
    if (!this.cached.warehouse) {
      this.cached.warehouse = new WarehouseChannel(this.team);
    }
    return this.cached.warehouse;
  }

  public async send(text: string, channelId?: ChannelType) {
    return DBUtil.getSocket().send(text, channelId ?? this.id);
  }

  public async read(channelId?: ChannelType) {
    return DBUtil.getSocket().read(channelId ?? this.id);
  }

  public async ping(channelId?: ChannelType) {
    return DBUtil.getSocket().ping(channelId ?? this.id);
  }

  public isOpenLinkChannel(): this is Channel & { openLink: OpenLinkChannel } {
    return !!this.open;
  }

  public isWarehouseChannel(): this is Channel & {
    warehouse: WarehouseChannel;
  } {
    return !!this.team;
  }
}
