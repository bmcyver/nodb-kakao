export class MapAttachment {
  constructor(private readonly raw: MapAttachmentType) {}

  get lat() {
    return this.raw.lat;
  }

  get lng() {
    return this.raw.lng;
  }

  get a() {
    return this.raw.a;
  }

  get t() {
    return this.raw.t;
  }

  get c() {
    return this.raw.c;
  }
}

export interface MapAttachmentType {
  lat: number;
  lng: number;
  a: string;
  t: string;
  c: boolean;
}
