import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const chatLogs = sqliteTable('chat_logs', {
  _id: integer('_id').primaryKey(),
  id: blob('id', { mode: 'bigint' }).notNull(),
  type: integer('type'),
  chatId: blob('chat_id', { mode: 'bigint' }).notNull(),
  userId: blob('user_id', { mode: 'bigint' }).notNull(),
  message: text('message'),
  attachment: text('attachment'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  clientMessageId: integer('client_message_id'),
  prevId: blob('prev_id', { mode: 'bigint' }),
  referer: integer('referer').$type<unknown>(),
  supplement: text('supplement'),
  v: text('v').notNull(),
});

export type ChatLogsType = typeof chatLogs.$inferSelect;
