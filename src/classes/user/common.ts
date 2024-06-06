import { FriendsType } from '../../db';
import { DBUtil } from '../../utils';

export class User {
  private cached: Record<string, any> = {};

  constructor(private readonly raw: FriendsType) {}

  get _id() {
    return this.raw._id;
  }

  get contactId() {
    return this.raw.contactId;
  }

  get id() {
    return this.raw.id;
  }

  get uuid() {
    return this.raw.uuid;
  }

  get phoneNumber() {
    return this.raw.phoneNumber;
  }

  get rawPhoneNumber() {
    return this.raw.rawPhoneNumber;
  }

  get name() {
    if (!this.cached.name) {
      this.cached.name = DBUtil.decrypt(
        this.raw.name,
        DBUtil.getUserId(),
        this.raw.enc ?? undefined,
      );
    }
    return this.cached.name;
  }

  get phoneticName() {
    return this.raw.phoneticName;
  }

  get profileImageUrl() {
    if (!this.cached.profileImageUrl && this.raw.profileImageUrl) {
      this.cached.profileImageUrl = DBUtil.decrypt(
        this.raw.profileImageUrl,
        DBUtil.getUserId(),
        this.raw.enc ?? undefined,
      );
    }
    return this.cached.profileImageUrl;
  }

  get fullProfileImageUrl() {
    if (!this.cached.fullProfileImageUrl && this.raw.fullProfileImageUrl) {
      this.cached.fullProfileImageUrl = DBUtil.decrypt(
        this.raw.fullProfileImageUrl,
        DBUtil.getUserId(),
        this.raw.enc ?? undefined,
      );
    }
    return this.cached.fullProfileImageUrl;
  }

  get originalProfileImageUrl() {
    if (
      !this.cached.originalProfileImageUrl &&
      this.raw.originalProfileImageUrl
    ) {
      this.cached.originalProfileImageUrl = DBUtil.decrypt(
        this.raw.originalProfileImageUrl,
        DBUtil.getUserId(),
        this.raw.enc ?? undefined,
      );
    }
    return this.cached.originalProfileImageUrl;
  }

  get statusMessage() {
    return this.raw.statusMessage;
  }

  get chatId() {
    return this.raw.chatId;
  }

  get brandNew() {
    return this.raw.brandNew;
  }

  get blocked() {
    return this.raw.blocked;
  }

  get favorite() {
    return this.raw.favorite;
  }

  get position() {
    return this.raw.position;
  }

  get v() {
    return this.raw.v;
  }

  get boardV() {
    return this.raw.boardV;
  }

  get ext() {
    return this.raw.ext;
  }

  get nickName() {
    return this.raw.nickName;
  }

  get userType() {
    return this.raw.userType;
  }

  get storyUserId() {
    return this.raw.storyUserId;
  }

  get accountId() {
    return this.raw.accountId;
  }

  get linkedServices() {
    return this.raw.linkedServices;
  }

  get hidden() {
    return this.raw.hidden;
  }

  get purged() {
    return this.raw.purged;
  }

  get suspended() {
    return this.raw.suspended;
  }

  get memberType() {
    return this.raw.memberType;
  }

  get involvedChatIds() {
    return this.raw.involvedChatIds;
  }

  get contactName() {
    return this.raw.contactName;
  }

  get enc() {
    return this.raw.enc;
  }

  get createdAt() {
    return this.raw.createdAt;
  }

  get newBadgeUpdatedAt() {
    return this.raw.newBadgeUpdatedAt;
  }

  get newBadgeSeenAt() {
    return this.raw.newBadgeSeenAt;
  }

  get statusActionToken() {
    return this.raw.statusActionToken;
  }
}
