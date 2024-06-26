import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const friends = sqliteTable('friends', {
  _id: integer('_id').primaryKey(),
  contactId: integer('contact_id'),
  id: blob('id', { mode: 'bigint' }),
  type: integer('type').notNull(),
  uuid: text('uuid'),
  phoneNumber: text('phone_number').notNull(),
  rawPhoneNumber: text('raw_phone_number'),
  name: text('name').notNull(),
  phoneticName: text('phonetic_name'),
  profileImageUrl: text('profile_image_url'),
  fullProfileImageUrl: text('full_profile_image_url'),
  originalProfileImageUrl: text('original_profile_image_url'),
  statusMessage: text('status_message'),
  chatId: integer('chat_id').notNull(),
  brandNew: integer('brand_new').notNull(),
  blocked: integer('blocked').notNull(),
  favorite: integer('favorite').notNull(),
  position: integer('position').notNull(),
  v: text('v'),
  boardV: text('board_v'),
  ext: text('ext'),
  nickName: text('nick_name'),
  userType: integer('user_type').notNull(),
  storyUserId: integer('story_user_id'),
  accountId: integer('account_id'),
  linkedServices: text('linked_services'),
  hidden: integer('hidden').notNull(),
  purged: integer('purged').notNull(),
  suspended: integer('suspended').notNull(),
  memberType: integer('member_type').notNull(),
  involvedChatIds: text('involved_chat_ids'),
  contactName: text('contact_name'),
  enc: integer('enc'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  newBadgeUpdatedAt: integer('new_badge_updated_at', { mode: 'timestamp' }),
  newBadgeSeenAt: integer('new_badge_seen_at', { mode: 'timestamp' }),
  statusActionToken: integer('status_action_token'),
  accessPermit: text('access_permit'),
});

export type FriendsType = typeof friends.$inferSelect;
