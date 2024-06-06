import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { chatLogs } from './chatLogs';

export const chatRooms = sqliteTable('chat_rooms', {
  _id: integer('_id').primaryKey(),
  id: blob('id', { mode: 'bigint' }).notNull(),
  type: text('type'),
  members: text('members'),
  activeMemberIds: text('active_member_ids'), //need to parse
  lastLogId: blob('last_log_id', { mode: 'bigint' }),
  lastMessage: text('last_message'),
  lastUpdatedAt: integer('last_updated_at', { mode: 'timestamp' }),
  unreadCount: integer('unread_count'),
  watermarks: text('watermarks'),
  temporaryMessage: text('temporary_message'),
  v: text('v'),
  ext: text('ext'),
  lastReadLogId: blob('last_read_log_id', { mode: 'bigint' }),
  lastUpdateSeenId: blob('last_update_seen_id', { mode: 'bigint' }),
  activeMembersCount: integer('active_members_count'),
  meta: text('meta'),
  isHint: integer('is_hint'),
  privateMeta: text('private_meta'),
  lastChatLogType: integer('last_chat_log_type'),
  schatToken: integer('schat_token'),
  lastSkeyToken: integer('last_skey_token'),
  lastPkTokens: text('last_pk_tokens'),
  linkId: integer('link_id'),
  moimMeta: text('moim_meta'),
  inviteInfo: text('invite_info'),
  blindedMemberIds: text('blinded_member_ids'),
  muteUntilAt: integer('mute_until_at'),
  lastJoinedLogId: blob('last_joined_log_id', { mode: 'bigint' }),
});

export type ChatRoomsType = typeof chatRooms.$inferSelect;
