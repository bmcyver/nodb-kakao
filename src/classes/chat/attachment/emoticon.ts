export class EmoticonAttachment {
  constructor(private readonly raw: EmoticonAttachmentType) {}

  public get path() {
    return this.raw.path;
  }

  public get name() {
    return this.raw.name;
  }

  public get type() {
    return this.raw.type;
  }

  public get alt() {
    return this.raw.alt;
  }

  public get s() {
    return this.raw.s;
  }

  public get sound() {
    return this.raw.sound;
  }

  public get width() {
    return this.raw.width;
  }

  public get height() {
    return this.raw.height;
  }

  public get xConVersion() {
    return this.raw.xconVersion;
  }
}

export interface EmoticonAttachmentType {
  path: string;
  name: string;
  type: string;
  alt: string;
  s?: number;
  sound?: string;
  width?: number;
  height?: number;
  xconVersion?: number;
}
