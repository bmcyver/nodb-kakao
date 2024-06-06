export class ProfileAttachment {
  constructor(private readonly raw: ProfileAttachmentType) {}

  public get nickName() {
    return this.raw.nickName;
  }

  public get accountId() {
    return this.raw.accountId;
  }

  public get userId() {
    return this.raw.userId;
  }

  public get userType() {
    return this.raw.userType;
  }
}

export interface ProfileAttachmentType {
  nickName: string;
  accountId: number;
  userId: number;
  userType: number;
}
