import { Server, Socket, Namespace } from 'socket.io';

export type SocketHandler = (socket: Socket, nsp: Namespace) => void;

export interface NamespaceHandlers {
  [event: string]: (socket: Socket, nsp: Namespace, ...args: any[]) => void;
}

export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => void;