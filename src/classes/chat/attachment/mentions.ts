import { User } from '../../user';
import { DBUtil } from '../../../utils';

export class MentionsAttachment {
  private readonly cached: Record<string, any> = {};

  constructor(private readonly raw: MentionsAttachmentType) {}

  public get length() {
    return this.raw.mentions.length;
  }

  public async getUsers() {
    if (!this.cached.users) {
      const temp: Array<User> = [];
      for (const mention of this.raw.mentions) {
        temp.push(await DBUtil.getUserByUserId(mention.user_id));
      }
      this.cached.user = temp;
    }
    return this.cached.user;
  }
}

export interface MentionsAttachmentType {
  mentions: Array<MentionsAttachmentT>;
}

export interface MentionsAttachmentT {
  at: Array<number>;
  len: number;
  user_id: number | bigint;
}
