import axios from 'axios';

export class VideoAttachment {
  constructor(private readonly raw: VideoAttachmentType) {}

  public get url() {
    return this.raw.url;
  }

  public get tk() {
    return this.raw.tk;
  }

  public get cs() {
    return this.raw.cs;
  }

  public get s() {
    return this.raw.s;
  }

  public get d() {
    return this.raw.d;
  }

  public get w() {
    return this.raw.w;
  }

  public get h() {
    return this.raw.h;
  }

  public get cmt() {
    return this.raw.cmt;
  }

  public async getVideo() {
    const { data }: { data: ArrayBuffer } = await axios.get(this.url, {
      responseType: 'arraybuffer',
    });
    return data;
  }
}

export interface VideoAttachmentType {
  url: string;
  tk: string;
  cs: string;
  s: number;
  d: number;
  w: number;
  h: number;
  cmt: string;
}
