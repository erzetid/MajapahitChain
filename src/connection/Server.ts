/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createServer } from 'http';
import { Server as ser, Socket } from 'socket.io';
import Network from '../service/Network';
import { Node } from '../service/Node';
import { internalIpV4Sync as myIp } from 'internal-ip';
const httpServer = createServer();
const io = new ser(httpServer, {
  cors: {
    origin: '*'
  }
});
export default class Server {
  public node: Node;
  public port: number;
  public domain: string;
  public network: Network;
  constructor(port: number, domain = `${myIp()}`) {
    this.domain = `${domain}:${port}`;
    this.port = port;
    this.network = new Network(this.domain);
    this.node = this.network.myNode;
  }

  private connect(socket: Socket): void {
    this.registration(socket);
  }

  private serverSync(socket: Socket): void {
    socket.emit('syncNetwork', this.node, this.network.networks);
  }

  private registration(socket: Socket): void {
    socket.on('registration', (node: Node) => {
      socket.emit('acceptedRegistartion', this.node);
      const isNewNetwork = this.network.register(node);
      if (isNewNetwork) {
        io.emit('newNetwork', node);
      } else {
        console.log('Sudah ada didalam jaringan.');
      }
      socket.on('serverSync', (_node: Node) => {
        this.serverSync(socket);

        console.log(`Server connected to: ${_node.nodeId} ${_node.domain}`);
        socket.on('disconnect', () => {
          this.disconnected(_node.nodeId);
        });
      });
    });
  }

  private disconnected(nodeId: string): void {
    console.log(`Server ${nodeId} is disconnected`);
  }

  public listen(): void {
    io.on('connection', (socket: Socket) => this.connect(socket));
    io.listen(this.port);
    console.log(`P2PServer run on: ${this.domain}`);
  }
}
