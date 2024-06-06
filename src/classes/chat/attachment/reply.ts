import { MentionsAttachment, MentionsAttachmentT } from './mentions';
import { DBUtil } from '../../../utils';
import { User } from '../../user/common';
import { CommonChat } from '../common';

export class ReplyAttachment {
  private readonly cached: Record<string, unknown> = {};

  constructor(private readonly raw: ReplyAttachmentType) {}

  public get logId() {
    return this.raw.src_logId;
  }

  public get userId() {
    return this.raw.src_userId;
  }

  public get linkId() {
    return this.raw.src_linkId;
  }

  public get type() {
    return this.raw.src_type;
  }

  public get message() {
    return this.raw.src_message;
  }

  public get mentions(): MentionsAttachment | undefined {
    if (this.hasMentions() && this.raw.src_mentions) {
      if (!this.cached.mentions) {
        this.cached.mentions = new MentionsAttachment({
          mentions: this.raw.src_mentions,
        });
      }
      return this.cached.mentions as MentionsAttachment;
    }
  }

  public async getChat(): Promise<CommonChat> {
    if (!this.cached.chat) {
      this.cached.chat = await DBUtil.getChatById(this.logId);
    }
    return this.cached.chat as CommonChat;
  }

  public async getUser(): Promise<User> {
    if (!this.cached.user) {
      this.cached.user = DBUtil.getUserByUserId(this.raw.src_userId);
    }
    return this.cached.user as User;
  }

  public hasMentions(): this is ReplyAttachment & {
    mentions: MentionsAttachment;
  } {
    return !!(this.raw.src_mentions && this.raw.src_mentions.length > 0);
  }
}

export interface ReplyAttachmentType {
  src_logId: bigint | number;
  src_userId: bigint | number;
  src_linkId: number;
  src_type: number;
  src_message: string;
  src_mentions?: MentionsAttachmentT[];
}
