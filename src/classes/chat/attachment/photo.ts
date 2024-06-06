import axios from 'axios';

export class PhotoAttachment {
  constructor(private readonly raw: PhotoAttachmentType) {}

  public get thumbnailUrl() {
    return this.raw.thumbnailUrl;
  }

  public get thumbnailHeight() {
    return this.raw.thumbnailHeight;
  }

  public get thumbnailWidth() {
    return this.raw.thumbnailWidth;
  }

  public get url() {
    return this.raw.url;
  }

  public get k() {
    return this.raw.k;
  }

  public get cs() {
    return this.raw.cs;
  }

  public get s() {
    return this.raw.s;
  }

  public get w() {
    return this.raw.w;
  }

  public get h() {
    return this.raw.h;
  }

  public get mt() {
    return this.raw.mt;
  }

  public get cmt() {
    return this.raw.cmt;
  }

  public async getThumbnailImage() {
    const { data }: { data: ArrayBuffer } = await axios.get(this.thumbnailUrl, {
      responseType: 'arraybuffer',
    });
    return data;
  }

  public async getOriginalImage() {
    const { data }: { data: ArrayBuffer } = await axios.get(this.url, {
      responseType: 'arraybuffer',
    });
    return data;
  }
}

export interface PhotoAttachmentType {
  thumbnailUrl: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  url: string;
  k: string;
  cs: string;
  s: number;
  w: number;
  h: number;
  mt: string;
  cmt: string;
}
