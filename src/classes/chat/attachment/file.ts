import axios from 'axios';

export class FileAttachment {
  constructor(private readonly raw: FileAttachmentType) {}

  public get name() {
    return this.raw.name;
  }

  public get url() {
    return this.raw.url;
  }

  public get cs() {
    return this.raw.cs;
  }

  public get s() {
    return this.raw.s;
  }

  public get k() {
    return this.raw.k;
  }

  public get size() {
    return this.raw.size;
  }

  public get expire() {
    return new Date(this.raw.expire);
  }

  public async getFile() {
    const { data }: { data: ArrayBuffer } = await axios.get(this.url, {
      responseType: 'arraybuffer',
    });
    return data;
  }
}

export interface FileAttachmentType {
  name: string;
  url: string;
  k: string;
  size: number;
  s: number;
  expire: number;
  cs: null | string;
}
