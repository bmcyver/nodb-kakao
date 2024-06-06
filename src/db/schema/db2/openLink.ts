import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { friends } from './friends';

export const openLink = sqliteTable('open_link', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  token: integer('token'),
  name: text('name'),
  url: text('url'),
  imageUrl: text('image_url'),
  type: integer('type'),
  memberLimit: integer('member_limit'),
  directChatLimit: integer('direct_chat_limit'),
  active: integer('active'),
  expired: integer('expired'),
  createdAt: integer('created_at'),
  viewType: integer('view_type'),
  pushAlert: integer('push_alert'),
  iconUrl: text('icon_url'),
  v: text('v'),
  searchable: integer('searchable'),
  description: text('description'),
});

export type OpenLinkType = typeof openLink.$inferSelect;
