import { BaseChat } from './base';
import { ChatLogsType } from '../../db';
import {
  AudioAttachment,
  ContactAttachment,
  EmoticonAttachment,
  FileAttachment,
  MapAttachment,
  MentionsAttachment,
  MentionsAttachmentType,
  MultiPhotoAttachment,
  PhotoAttachment,
  ProfileAttachment,
  ReplyAttachment,
  VideoAttachment,
} from './attachment';
import { DBUtil } from '../../utils';
import { ChatType } from './type';

export class CommonChat extends BaseChat {
  constructor(raw: ChatLogsType) {
    super(raw);
  }

  /**
   * attachments
   */
  public get mentions(): MentionsAttachment | undefined {
    if (!this.cached.mentions) {
      this.cached.mentions = new MentionsAttachment(
        DBUtil.parse(this.attachment),
      );
      return this.cached.mentions;
    }
  }

  public get photo(): PhotoAttachment | undefined {
    if (!this.cached.photo) {
      this.cached.photo = new PhotoAttachment(DBUtil.parse(this.attachment));
    }
    return this.cached.photo;
  }

  public get video(): VideoAttachment | undefined {
    if (!this.cached.video) {
      this.cached.video = new VideoAttachment(DBUtil.parse(this.attachment));
    }
    return this.cached.video;
  }

  public get contact(): ContactAttachment | undefined {
    if (!this.cached.contact) {
      this.cached.contact = new ContactAttachment(
        DBUtil.parse(this.attachment),
      );
    }
    return this.cached.contact;
  }

  public get audio(): AudioAttachment | undefined {
    if (!this.cached.audio) {
      this.cached.audio = new AudioAttachment(DBUtil.parse(this.attachment));
    }
    return this.cached.audio;
  }

  public get map(): MapAttachment | undefined {
    if (!this.cached.map) {
      this.cached.map = new MapAttachment(JSON.parse(this.attachment));
    }
    return this.cached.map;
  }

  public get profile(): ProfileAttachment | undefined {
    if (!this.cached.profile) {
      this.cached.profile = new ProfileAttachment(
        DBUtil.parse(this.attachment),
      );
    }
    return this.cached.profile;
  }

  public get file(): FileAttachment | undefined {
    if (!this.cached.file) {
      this.cached.file = new FileAttachment(DBUtil.parse(this.attachment));
    }
    return this.cached.file;
  }

  public get emoticon(): EmoticonAttachment | undefined {
    if (!this.cached.emoticon) {
      this.cached.emoticon = new EmoticonAttachment(
        DBUtil.parse(this.attachment),
      );
    }
    return this.cached.emoticon;
  }

  public get source(): ReplyAttachment | undefined {
    if (!this.cached.reply) {
      this.cached.reply = new ReplyAttachment(DBUtil.parse(this.attachment));
    }
    return this.cached.reply;
  }

  public get multiPhoto(): MultiPhotoAttachment | undefined {
    if (!this.cached.multiPhoto) {
      this.cached.multiPhoto = new MultiPhotoAttachment(
        DBUtil.parse(this.attachment),
      );
    }
    return this.cached.multiPhoto;
  }

  public isShout() {
    return !!JSON.parse(this.attachment)?.shout;
  }

  public hasMention(): this is CommonChat & { mentions: MentionsAttachment } {
    return !!DBUtil.parse<MentionsAttachmentType>(this.attachment)?.mentions
      ?.length;
  }

  public isFeed() {
    return this.type === ChatType.FEED;
  }

  public isChat(): this is CommonChat {
    return this.type === ChatType.TEXT;
  }

  public isPhoto(): this is CommonChat & { photo: PhotoAttachment } {
    return this.type === ChatType.PHOTO;
  }

  public isVideo(): this is CommonChat & { video: VideoAttachment } {
    return this.type === ChatType.VIDEO;
  }

  public isContact(): this is CommonChat & { contact: ContactAttachment } {
    return this.type === ChatType.CONTACT;
  }

  public isAudio(): this is CommonChat & { audio: AudioAttachment } {
    return this.type === ChatType.AUDIO;
  }

  public isEmoticon(): this is CommonChat & { emoticon: EmoticonAttachment } {
    return (
      this.type == ChatType.DITEMEMOTICON ||
      this.type == ChatType.STICKER ||
      this.type == ChatType.STICKERANI ||
      this.type == ChatType.STICKERGIF
    );
  }

  public isMap(): this is CommonChat & { map: MapAttachment } {
    return this.type === ChatType.MAP;
  }

  public isProfile(): this is CommonChat & { profile: ProfileAttachment } {
    return this.type === ChatType.PROFILE;
  }

  public isFile(): this is CommonChat & { file: FileAttachment } {
    return this.type === ChatType.FILE;
  }

  public isReply(): this is CommonChat & { reply: ReplyAttachment } {
    return this.type === ChatType.REPLY;
  }

  public isMultiPhoto(): this is CommonChat & {
    multiPhoto: MultiPhotoAttachment;
  } {
    return this.type === ChatType.MULTIPHOTO;
  }
}
