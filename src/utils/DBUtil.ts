import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { chatLogs, chatRooms, friends, openLink, warehouseInfo } from '../db';
import { gt, sql } from 'drizzle-orm';
import { parse, stringify } from 'json-bigint';
import { decrypt } from '../decrypt';
import { Channel, User } from '../classes';
import { Socket } from '../socket';
import { chatMapper } from './chatMapper';

export class DBUtil {
  private static drizzle: BetterSQLite3Database;
  private static userId: number;
  private static socket: Socket;

  /**
   * drizzle 인스턴스를 반환합니다.
   */
  public static getDrizzle() {
    return this.drizzle;
  }

  /**
   * 본인(봇)의 userId를 반환합니다.
   */
  public static getUserId() {
    return this.userId;
  }

  /**
   * 메시지 전송에 사용하는 socket을 반환합니다.
   */
  public static getSocket() {
    return this.socket;
  }

  /**
   * 복호화를 한 결과를 반환합니다.
   * @param text
   * @param userId
   * @param enc
   */
  public static decrypt(
    text: string,
    userId: number | bigint | string,
    enc: number = 31,
  ) {
    return decrypt(text, userId.toString(), enc);
  }

  /**
   * 숫자 손실 없이 JSON.parse의 결과를 반환합니다.
   * @param text
   * @param reviver
   */
  public static parse<T>(
    text: string,
    reviver?: (this: any, key: string, value: any) => any,
  ): T {
    return parse(text, reviver) as T;
  }

  /**
   * BigInt가 있을경우 String으로 변환하여 JSON.stringify의 결과를 반환합니다.
   * @param value
   * @param replacer
   * @param space
   */
  public static stringify(
    value: any,
    replacer?: (this: any, key: string, value: any) => any,
    space?: string | number,
  ): string {
    return stringify(value, replacer, space);
  }

  /**
   * 누적된 _id를 배열 형태로 반환합니다.
   * @param lastId
   */
  public static async getStackedIds(lastId: number) {
    const res = await this.drizzle
      .selectDistinct({ _id: chatLogs._id })
      .from(chatLogs)
      .where(gt(chatLogs._id, lastId))
      .execute();
    return res.map((v) => v._id);
  }

  /**
   * _id로 데이터를 반환합니다.
   * @param id chat_logs 테이블의 _id 컬럼입니다.
   */
  public static async getDataById(id: number) {
    const chat = await this.getChatById(id);
    const user = await this.getUserByUserId(chat.userId);
    const channel = await this.getChannelByChannelId(chat.chatId);
    return { chat, user, channel };
  }

  /**
   * userId로 User를 반환합니다.
   * @param id chat_logs 테이블의 user_id 컬럼입니다.
   */
  public static async getUserByUserId(id: bigint | string | number) {
    const res = await this.drizzle
      .selectDistinct()
      .from(friends)
      .where(sql`${friends.id} = ${id.toString()}`)
      .execute();
    return new User(res[0]);
  }

  /**
   * channelId로 Channel을 반환합니다.
   * @param id chat_logs 테이블의 chat_id 컬럼입니다.
   */
  public static async getChannelByChannelId(id: bigint | string | number) {
    const res = await this.drizzle
      .selectDistinct()
      .from(chatRooms)
      .where(sql`${chatRooms.id} = ${id.toString()}`)
      .leftJoin(warehouseInfo, sql`${warehouseInfo.chatId} = ${chatRooms.id}`)
      .leftJoin(openLink, sql`${openLink.id} = ${chatRooms.linkId}`)
      .execute();
    return new Channel(
      res[0].chat_rooms,
      res[0].open_link,
      res[0].warehouse_info,
    );
  }

  /**
   * _id로 Chat을 반환합니다.
   * @param id chat_logs 테이블의 _id 컬럼입니다.
   */
  public static async getChatById(id: bigint | string | number) {
    const res = await this.drizzle
      .selectDistinct()
      .from(chatLogs)
      .where(sql`${chatLogs._id} = ${id.toString()}`)
      .execute();
    return chatMapper(res[0]);
  }

  /**
   * logId로 Chat을 반환합니다.
   * @param id chat_logs 테이블의 id 컬럼입니다.
   */
  public static async getChatByLogId(id: bigint | string | number) {
    const res = await this.drizzle
      .selectDistinct()
      .from(chatLogs)
      .where(sql`${chatLogs.id} = ${id.toString()}`)
      .execute();
    return chatMapper(res[0]);
  }

  /**
   * 이 클래스를 초기화 할 때 사용하는 메소드입니다. 사용하지 마세요.
   * @param db drizzle
   */
  private static setDrizzle(db: BetterSQLite3Database) {
    this.drizzle = db;
  }

  /**
   * 이 클래스를 초기화 할 때 사용하는 메소드입니다. 사용하지 마세요.
   * @param db drizzle
   */
  private static setUserId(db: number) {
    this.userId = db;
  }

  /**
   * 이 클래스를 초기화 할 때 사용하는 메소드입니다. 사용하지 마세요.
   * @param socket socket
   */
  private static setSocket(socket: Socket) {
    this.socket = socket;
  }
}
