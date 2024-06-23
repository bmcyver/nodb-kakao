import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const warehouseInfo = sqliteTable('warehouse_info', {
  id: integer('_id').primaryKey(),
  chatId: blob('chat_id', { mode: 'bigint' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  profileUrl: text('profile_url'),
  hostId: integer('host_id').notNull(),
  accessiblePreChat: integer('accessible_pre_chat').notNull(),
  membersInvitable: integer('members_invitable').notNull(),
  status: text('status').notNull(),
  revision: integer('revision').notNull(),
  isShowWelcome: integer('is_show_welcome').notNull(),
  accessibleLogId: blob('accessible_log_id', { mode: 'bigint' }).notNull(),
  userDeleteAllId: integer('user_delete_all_id').notNull(),
  createAt: integer('create_at', { mode: 'timestamp' }).notNull(),
  warehouseBackupStatus: text('warehouse_backup_status').notNull(),
  aiChatBotManagementRole: text('ai_chat_bot_management_role').notNull(),
});

export type WarehouseInfoType = typeof warehouseInfo.$inferSelect;
