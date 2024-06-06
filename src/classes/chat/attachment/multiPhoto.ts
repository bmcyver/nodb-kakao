import axios from 'axios';

export class MultiPhotoAttachment {
  constructor(private readonly raw: MultiPhotoAttachmentType) {}

  public get thumbnailUrls() {
    return this.raw.thumbnailUrls;
  }

  public get thumbnailHeights() {
    return this.raw.thumbnailHeights;
  }

  public get thumbnailWidths() {
    return this.raw.thumbnailWidths;
  }

  public get urls() {
    return this.raw.imageUrls;
  }

  public get ks() {
    return this.raw.kl;
  }

  public get css() {
    return this.raw.csl;
  }

  public get ss() {
    return this.raw.sl;
  }

  public get ws() {
    return this.raw.wl;
  }

  public get hs() {
    return this.raw.hl;
  }

  public get mts() {
    return this.raw.mtl;
  }

  public get cmts() {
    return this.raw.cmtl;
  }

  public async getThumbnailImage(index: number) {
    if (index > this.thumbnailUrls.length - 1) {
      return null;
    }
    const { data }: { data: ArrayBuffer } = await axios.get(
      this.thumbnailUrls[index],
      {
        responseType: 'arraybuffer',
      },
    );
    return data;
  }

  public async getOriginalImage(index: number) {
    if (index > this.urls.length - 1) {
      return null;
    }
    const { data }: { data: ArrayBuffer } = await axios.get(this.urls[index], {
      responseType: 'arraybuffer',
    });
    return data;
  }
}

export interface MultiPhotoAttachmentType {
  kl: Array<string>;
  mtl: Array<string>;
  csl: Array<string>;
  wl: Array<string>;
  hl: Array<string>;
  cmtl: Array<string>;
  sl: Array<string>;
  imageUrls: Array<string>;
  thumbnailUrls: Array<string>;
  thumbnailWidths: Array<string>;
  thumbnailHeights: Array<string>;
}
