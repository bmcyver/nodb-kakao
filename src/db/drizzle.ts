import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as path from 'node:path';

export function initDrizzle(db: string) {
  const sqlite = new Database(path.resolve(db, 'KakaoTalk.db'), {
    readonly: true,
    fileMustExist: true,
  });
  sqlite.exec(`ATTACH DATABASE "${path.join(db, 'KakaoTalk2.db')}" AS db2`);
  return drizzle(sqlite);
}
