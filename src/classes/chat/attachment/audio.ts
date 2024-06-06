import axios from 'axios';

export class AudioAttachment {
  constructor(private readonly raw: AudioAttachmentType) {}

  public get url() {
    return this.raw.url;
  }

  public get d() {
    return this.raw.d;
  }

  public get k() {
    return this.raw.k;
  }

  public async getAudio() {
    const { data }: { data: ArrayBuffer } = await axios.get(this.url, {
      responseType: 'arraybuffer',
    });
    return data;
  }
}

export interface AudioAttachmentType {
  url: string;
  d: string;
  k: string;
}
