import { Socket } from './socket';
import { InitInterface, MessageEvents } from './types';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import TypedEmitter from 'typed-emitter';
import { initLogger, logger } from './logger';
import { DBUtil, EventQueue, LocalProtobuf, protobuf } from './utils';
import { chatLogs, initDrizzle } from './db';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import path from 'path';
import { sql } from 'drizzle-orm';

export class KakaoDB {
  private readonly socket: Socket;
  private readonly event = new EventEmitter() as TypedEmitter<MessageEvents>;
  private watcher: fs.FSWatcher;
  private lastID: number = 0;
  #localPref: LocalProtobuf;
  private drizzle: BetterSQLite3Database;
  private queue: EventQueue;

  constructor(private readonly config: InitInterface) {
    try {
      initLogger(config.logLevel, 'node-kakaodb');
      logger.info('🚀 Initializing Node-kakaoDB');
      logger.debug('🔄 Checking Permission');
      fs.accessSync(
        config.path,
        fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
      );
      logger.debug('✅ Permission Check Passed');
    } catch (e) {
      logger.error('❌ Invalid path or permission denied, path', config.path);
      logger.error(e);
      process.exit(1);
    }
    logger.debug('🔄 Initializing Socket');
    this.socket = new Socket({ ip: config.ip, port: config.port });
    logger.debug('✅ Socket Initialized');
  }

  /**
   * Start DB Listener
   */
  public async start() {
    if (this.watcher) {
      logger.warn('⚠️ DB Listener already started.');
    } else {
      logger.info('🚀 Starting DB Listener');
      logger.debug('🔄 Loading Local Protobuf');
      this.#localPref = await protobuf(this.config.path);
      logger.debug('✅ Local Protobuf Loaded');
      this.watcher = fs.watch(
        path.resolve(this.config.path, 'databases/KakaoTalk.db-wal'),
      );
      logger.debug('🔄 Initializing Drizzle');
      this.drizzle = initDrizzle(path.resolve(this.config.path, 'databases'));
      logger.debug('✅ Drizzle Initialized');
      this.queue = new EventQueue();
      // @ts-ignore
      DBUtil.setDrizzle(this.drizzle);
      logger.debug('🔄 Setting User id', this.#localPref.old_user_id);
      // @ts-ignore
      DBUtil.setUserId(this.#localPref.old_user_id as number);
      // @ts-ignore
      DBUtil.setSocket(this.socket);
      this.lastID = (
        await this.drizzle
          .selectDistinct({ _id: sql<number>`max(_id)` })
          .from(chatLogs)
          .execute()
      )[0]._id;
      logger.debug('🔄 Setting last id', this.lastID);

      this.watcher.on('change', async () => {
        const ids = await DBUtil.getStackedIds(this.lastID);
        if (ids.length === 0) return;
        logger.debug('🔍 Found new event(s)', ids.join(' '));
        for (const id of ids) {
          if (this.lastID < id) {
            this.lastID = id;
            logger.debug('⏳ Waiting for the event to be processed', id);
            await this.queue.enqueue(async () => {
              const data = await DBUtil.getDataById(id);
              if (
                data.chat.userId.toString() ===
                  this.#localPref.old_user_id?.toString() &&
                !this.config.mine
              ) {
                logger.debug(
                  '⚠️ Ignored event. Due to mine is not enabled',
                  id,
                );
                return;
              }
              // @ts-ignore
              this.event.emit(data.chat.eventType, data as any);
              logger.debug('✅ Successfully processed event.', id);
            });
          }
        }
      });
    }
  }

  /**
   * Stop DB Listener
   */
  public async stop() {
    if (!this.watcher) {
      logger.warn(
        '⚠️ Attempted to process event before DB Listener was started',
      );
    }
    this.watcher.close();
    logger.warn('🛑 Stopped DBListener');
    process.exit(1);
  }

  /**
   * Add event listener
   * @param event
   * @param listener
   */
  public on<E extends keyof MessageEvents>(
    event: E,
    listener: MessageEvents[E],
  ) {
    logger.debug('🐛 Adding Event Listener', event);
    return this.event.on(event, listener);
  }

  /**
   * Remove event listener
   * @param event
   * @param listener
   */
  public off<E extends keyof MessageEvents>(
    event: E,
    listener: MessageEvents[E],
  ) {
    logger.debug('🐛 Removing Event Listener', event);
    return this.event.off(event, listener);
  }
}
