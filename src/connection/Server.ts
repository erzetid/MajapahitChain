/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { createServer } from 'http';
import { Server as ser } from 'socket.io';
import { Node } from '../service/Node';
import { v4 as uuidv4 } from 'uuid';
const httpServer = createServer();
const io = new ser(httpServer, {
  cors: {
    origin: '*'
  }
});

export default class Server {
  public node: Node;
  constructor(node: Node) {
    this.node = node;
  }

  public listen(port: number): void {
    // emit untuk ngirim pesan
    // on untuk nrima pesan

    // server-side
    io.sockets.on('connection', (socket) => {
      const _id = socket.id;
      console.log('Socket Connected: ' + _id);
      // Here we emit our custom event
      socket.on('disconnect', () => {
        console.log('Socket disconnected: ' + _id);
      });
    });

    io.listen(port);
  }
}
