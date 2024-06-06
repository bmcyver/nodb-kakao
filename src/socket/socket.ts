import * as dgram from 'node:dgram';
import { ChannelType, SocketConfig, SocketType } from './types';
import { logger } from '../logger';

export class Socket {
  private readonly socket: dgram.Socket;

  constructor(private readonly config: SocketConfig) {
    this.socket = dgram.createSocket('udp4');
  }

  /**
   * 해당하는 roomId의 방으로 메시지를 전송합니다.
   * @param msg 전송될 메시지
   * @param roomId room(chat, channel) id
   */
  public async send(msg: string, roomId: ChannelType) {
    await this.sendSocket('send', String(msg), roomId.toString());
  }

  /**
   * 해당하는 roomId의 방을 읽음 처리 합니다.
   * @param roomId room(chat, channel) id
   */
  public async read(roomId: ChannelType) {
    await this.sendSocket('read', '', roomId.toString());
  }

  /**
   * 서버와 클라이언트 간의 소켓 전달 속도를 roomId로 출력합니다.
   * @param roomId room(chat, channel) id
   */
  public async ping(roomId: ChannelType) {
    return this.sendSocket('ping', Date.now().toString(), roomId.toString());
  }

  private sendSocket(type: SocketType, msg: string, roomId: ChannelType) {
    return new Promise((resolve, reject) => {
      const sendData = Buffer.from(
        JSON.stringify({ type, roomId, msg: String(msg) }),
      ).toString('base64');

      this.socket.send(
        sendData,
        0,
        sendData.length,
        this.config.port,
        this.config.ip,
        (err) => {
          if (err) {
            logger.debug(
              `❌ Failed to send message to ${this.config.ip}:${this.config.port} - ${err.message}`,
            );
            reject(err);
          } else {
            logger.debug(
              `📡 Message sent to ${this.config.ip}:${this.config.port}`,
            );
            resolve(true);
          }
        },
      );
    });
  }
}
