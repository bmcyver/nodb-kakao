import { warehouseInfo } from '../../db';

export class WarehouseChannel {
  constructor(private readonly raw: typeof warehouseInfo.$inferSelect) {}

  get id() {
    return this.raw.id;
  }

  get chatId() {
    return this.raw.chatId;
  }

  get name() {
    return this.raw.name;
  }

  get description() {
    return this.raw.description;
  }

  get profileUrl() {
    return this.raw.profileUrl;
  }

  get hostId() {
    return this.raw.hostId;
  }

  get accessiblePreChat() {
    return this.raw.accessiblePreChat;
  }

  get membersInvitable() {
    return this.raw.membersInvitable;
  }

  get status() {
    return this.raw.status;
  }

  get revision() {
    return this.raw.revision;
  }

  get isShowWelcome() {
    return this.raw.isShowWelcome;
  }

  get accessibleLogId() {
    return this.raw.accessibleLogId;
  }

  get userDeleteAllId() {
    return this.raw.userDeleteAllId;
  }

  get createAt() {
    return this.raw.createAt;
  }

  get warehouseBackupStatus() {
    return this.raw.warehouseBackupStatus;
  }

  get aiChatBotManagementRole() {
    return this.raw.aiChatBotManagementRole;
  }
}
