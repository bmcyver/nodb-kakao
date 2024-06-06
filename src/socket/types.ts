export interface SocketConfig {
  ip: string;
  port: number;
}

export type SocketType = 'read' | 'send' | 'ping';
export type ChannelType = bigint | string | number;
