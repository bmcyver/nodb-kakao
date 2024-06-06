import axios from 'axios';

export class ContactAttachment {
  constructor(private readonly raw: ContactAttachmentType) {}

  public get nickName() {
    return this.raw.nickName;
  }

  public get url() {
    return this.raw.nickName;
  }

  public async getContactFile() {
    const { data }: { data: ArrayBuffer } = await axios.get(this.url, {
      responseType: 'arraybuffer',
    });
    return data;
  }
}

export interface ContactAttachmentType {
  nickName: string;
  url: string;
}
