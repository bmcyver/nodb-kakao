import { ChatLogsType } from '../../db';
import { DBUtil } from '../../utils';
import { ChatType } from './type';
import { Events } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BaseChat<MessageType = string> {
  protected cached: Record<string, any> = {};
  protected eventType: Events = Events.messageCreate;

  constructor(private readonly raw: ChatLogsType) {}

  public get _id() {
    return this.raw._id;
  }

  public get id() {
    return this.raw.id;
  }

  public get type() {
    return this.raw.type;
  }

  public get chatId() {
    return this.raw.chatId;
  }

  public get userId() {
    return this.raw.userId;
  }

  public get message(): MessageType {
    if (!this.cached.message) {
      this.cached.message = DBUtil.decrypt(
        this.raw.message ?? '',
        this.userId?.toString(),
        this.v.enc,
      );
      if (this.type === ChatType.FEED) {
        this.cached.message = DBUtil.parse(this.cached.message);
      }
    }
    return this.cached.message;
  }

  public get attachment() {
    if (!this.cached.attachment) {
      this.cached.attachment = DBUtil.decrypt(
        this.raw.attachment ?? '',
        this.userId.toString(),
        this.v.enc,
      );
    }
    return this.cached.attachment;
  }

  public get createdAt() {
    return this.raw.createdAt;
  }

  public get deletedAt() {
    return this.raw.deletedAt;
  }

  public get clientMessageId() {
    return this.raw.clientMessageId;
  }

  public get previousId() {
    return this.raw.prevId;
  }

  public get referer() {
    return this.raw.referer;
  }

  public get supplement() {
    return this.raw.supplement;
  }

  public get v() {
    if (!this.cached.v) {
      this.cached.v = JSON.parse(this.raw.v);
    }
    return this.cached.v;
  }
}
