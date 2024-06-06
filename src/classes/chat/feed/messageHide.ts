import { BaseChat } from '../base';
import { BaseFeed, ChatType } from '../type';
import { ChatLogsType } from '../../../db';
import { Events } from '../../../types';

export class MessageHideFeed extends BaseChat<MessageHideFeedType> {
  constructor(raws: ChatLogsType) {
    super(raws);
    this.eventType = Events.messageHide;
  }

  get originalType() {
    return this.message.type;
  }
}

export interface MessageHideFeedType extends BaseFeed {
  type: ChatType;
}
