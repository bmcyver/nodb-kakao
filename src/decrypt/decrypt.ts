import { range } from './util';
import * as Crypto from 'node:crypto';
import { logger } from '../logger';

class KakaoDbParser {
  constructor(
    private password: number[] = [
      0, 22, 0, 8, 0, 9, 0, 111, 0, 2, 0, 23, 0, 43, 0, 8, 0, 33, 0, 33, 0, 10,
      0, 16, 0, 3, 0, 3, 0, 7, 0, 6, 0, 0,
    ],
    private IV: Buffer = Buffer.from([
      15, 8, 1, 0, 25, 71, 37, -36, 21, -11, 23, -32, -31, 21, 12, 53,
    ]),
    private keyChain: Record<string, Buffer> = {},
  ) {}

  /**
   * @param textData
   * @param userId
   * @param enc
   */
  public decrypt = (textData: string, userId: string, enc: number = 31) => {
    if (textData.startsWith('{') || !textData) return textData; // invalid input
    let key: Buffer;
    if (this.keyChain[userId] !== undefined) {
      key = this.keyChain[userId];
    } else {
      logger.debug('🔄 Generating key for user', userId);
      key = Buffer.from(
        this.deriveKey(this.password, this.genSalt(userId, enc), 2, 32),
      );
      this.keyChain[userId] = key;
    }

    const decipher = Crypto.createDecipheriv('aes-256-cbc', key, this.IV);
    const decrypted_temp = decipher.update(textData, 'base64', 'utf8');
    try {
      const decrypted_final = decipher.final('utf8');
      return decrypted_temp + decrypted_final;
    } catch (e) {
      console.log(e);
      return decrypted_temp;
    }
  };

  private pkcs16adjust = (a: number[], aOff: number, b: number[]) => {
    let x = (b[b.length - 1] & 0xff) + (a[aOff + b.length - 1] & 0xff) + 1;
    a[aOff + b.length - 1] = x % 256;
    x = x >> 8;
    range(b.length - 2, -1, -1).forEach((i) => {
      x = x + (b[i] & 0xff) + (a[aOff + i] & 0xff);
      a[aOff + i] = x % 256;
      x = x >> 8;
    });
  };

  private genSalt = (user_id: string, encType: number) => {
    if (Number(user_id) <= 0) {
      return '\0';
    }
    const prefixes = [
      '',
      '',
      '12',
      '24',
      '18',
      '30',
      '36',
      '12',
      '48',
      '7',
      '35',
      '40',
      '17',
      '23',
      '29',
      'isabel',
      'kale',
      'sulli',
      'van',
      'merry',
      'kyle',
      'james',
      'maddux',
      'tony',
      'hayden',
      'paul',
      'elijah',
      'dorothy',
      'sally',
      'bran',
      'extr.ursra',
      'veil',
    ];

    try {
      const salt = prefixes[encType] + user_id;
      const newSalt = salt.substring(0, 16).padEnd(16, '\0');
      const realSalt = Buffer.from(newSalt).toString('utf-8');
      return realSalt;
    } catch (error) {
      throw new Error('Unsupported encoding type');
    }
  };

  private deriveKey = (
    password: number[],
    salt: string,
    iteration: number = 2,
    dkeySize: number = 32,
  ) => {
    let hasher = Crypto.createHash('sha1');
    const v = 64;
    const u = 20;

    const S = Array(v * Math.trunc((salt.length + v - 1) / v)).fill(0);
    range(0, S.length).forEach((i) => {
      S[i] = salt.split('')[i % salt.length];
    });
    const S_CCA = S.map((char) => char.charCodeAt());
    const P = Array(v * Math.trunc((password.length + v - 1) / v)).fill(0);
    range(0, P.length).forEach((i) => {
      P[i] = password[i % password.length];
    });

    const I = S_CCA.concat(P) as number[];

    const B = Array(v).fill(0);
    const c = Math.trunc((dkeySize + u - 1) / u);

    const D = Array(v).fill(1);
    let dKey = Array(dkeySize).fill(0) as number[];

    range(1, c + 1).forEach((i) => {
      hasher = Crypto.createHash('sha1');
      hasher.update(Buffer.from(D));
      hasher.update(Buffer.from(I));
      let A = hasher.digest();

      range(1, iteration).forEach((j) => {
        hasher = Crypto.createHash('sha1');
        hasher.update(A);
        A = hasher.digest();
      });

      const AList: number[] = [];
      A.forEach((v) => AList.push(v));
      range(0, B.length).forEach((j) => {
        B[j] = AList[j % AList.length];
      });

      range(0, Math.trunc(I.length / v)).forEach((j) => {
        this.pkcs16adjust(I, j * v, B);
      });

      const start = (i - 1) * u;
      if (i == c) {
        const temp: number[] = [];
        A.forEach((v) => temp.push(v));

        let newDKey: number[] = [];
        const newAsubArr: number[] = [];
        A.subarray(0, dkeySize - start + 1).forEach((v) => newAsubArr.push(v));
        newDKey = newDKey.concat(dKey.slice(0, start));
        newDKey = newDKey.concat(newAsubArr);
        newDKey = newDKey.concat(dKey.slice(dkeySize));
        dKey = newDKey.slice(0, -1);
      } else {
        let newDKey: number[] = [];

        const newAsubArr: number[] = [];
        A.subarray(0, A.length).forEach((v) => newAsubArr.push(v));

        newDKey = newDKey.concat(dKey.slice(0, start));
        newDKey = newDKey.concat(newAsubArr);
        newDKey = newDKey.concat(dKey.slice(A.length - 1 - 1, -1));

        dKey = newDKey.slice(0, -1);
      }
    });

    return dKey;
  };
}

export const { decrypt } = new KakaoDbParser();
