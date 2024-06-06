import { openLink } from '../../db';

export class OpenLinkChannel {
  constructor(private readonly raw: typeof openLink.$inferSelect) {}

  get id() {
    return this.raw.id;
  }

  get userId() {
    return this.raw.userId;
  }

  get token() {
    return this.raw.token;
  }

  get name() {
    return this.raw.name;
  }

  get url() {
    return this.raw.url;
  }

  get imageUrl() {
    return this.raw.imageUrl;
  }

  get type() {
    return this.raw.type;
  }

  get memberLimit() {
    return this.raw.memberLimit;
  }

  get directChatLimit() {
    return this.raw.directChatLimit;
  }

  get active() {
    return this.raw.active;
  }

  get expired() {
    return this.raw.expired;
  }

  get createdAt() {
    return this.raw.createdAt;
  }

  get viewType() {
    return this.raw.viewType;
  }

  get pushAlert() {
    return this.raw.pushAlert;
  }

  get iconUrl() {
    return this.raw.iconUrl;
  }

  get v() {
    return this.raw.v;
  }

  get searchable() {
    return this.raw.searchable;
  }

  get description() {
    return this.raw.description;
  }
}
