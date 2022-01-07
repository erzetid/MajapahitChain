import { createServer } from 'http';
import { Server as socketIo, Socket } from 'socket.io';
import { io as ioClient, Socket as SocketClient } from 'socket.io-client';
import Network from '../service/Network';
import { internalIpV4Sync as myIp } from 'internal-ip';
import { Node } from '../service/Node';
import Block from '../service/Block';
import Transaction from '../service/Transaction';
const httpServer = createServer();

export default class P2PServer {
  public port: number;
  public domain: string;
  public domainRef = '';
  public myNode: Node;
  public network: Network;
  private io = new socketIo(httpServer, {
    cors: {
      origin: '*'
    }
  });
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  constructor(port = 3474, domain = `${myIp()}`) {
    this.port = port;
    this.domain = `${domain}:${port}`;
    this.network = new Network(this.domain);
    this.myNode = this.network.getMyNode();
  }

  // ===========================================SERVER=======================================================

  public listen(): void {
    this.io.listen(this.port);
    console.log(`P2P server run on: ${this.domain}`);

    this.io.on('connection', (socket) => {
      socket.on('networkRegistration', (node: Node) => {
        this.acceptingRegistration(socket, node);
      });
    });
  }
  private acceptingRegistration(socket: Socket, node: Node): void {
    const isNewNetwork = this.network.register(node);
    if (isNewNetwork) {
      this.broadcastNewNetwork(node);
    } else {
      console.log('Sudah ada didalam jaringan.');
    }

    // Accepting registration
    this.sendAllNetworks(socket);
    this.refreshClient(); // Refresh handler
  }

  private sendAllNetworks(socket: Socket): void {
    const networks = this.network.networks;
    socket.emit('acceptedRegistartion', networks);
  }
  private broadcastNewNetwork(newNetwork: Node) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.io.emit('newNetwork', newNetwork);
  }

  public broadcastTransaction(transaction: Transaction): void {
    this.io.emit('newTransaction', transaction);
  }

  public broadcastBlock(block: Block): void {
    this.io.emit('newBlock', block);
  }

  // ===========================================CLIENT=======================================================

  public addDomainRef(domain: string): void {
    if (this.domain === domain) {
      throw new Error('Domain referance should not same with your domain');
    }
    if (domain !== 'server') {
      this.domainRef = domain;
      this.activingRegistration(domain);
    } else {
      console.log('As master server');
    }
  }

  private activingRegistration(domain: string) {
    const socketClient = ioClient(`http://${domain}`);
    socketClient.on('connect', () => {
      console.log(`Koneksi berhasil ${domain}`);
    });
    socketClient.emit('networkRegistration', this.myNode);

    socketClient.on('acceptedRegistartion', (networks: Node[]) => {
      console.log('networks from server');
      this.network.updateNetworks(networks);
      this.refreshClient();
    });
  }

  private refreshClient(): void {
    this.network.load();
    this.network.networks.forEach((node) => {
      if (node.nodeId !== this.myNode.nodeId) {
        const socketHandler = ioClient(`http://${node.domain}`);
        this.receiveNewNetwork(socketHandler);
        this.receiveTransaction(socketHandler);
        this.receiveBlock(socketHandler);
      }
    });
  }

  private receiveNewNetwork(socketHandler: SocketClient): void {
    socketHandler.on('newNetwork', (_node: Node) => {
      this.network.register(_node);
      console.log(`New network :${_node.nodeId}`);
    });
  }

  private receiveTransaction(socketHandler: SocketClient): void {
    socketHandler.on('newTransaction', (transaction: Transaction) => {
      // TODO Add to miner
    });
  }

  private receiveBlock(socketHandler: SocketClient): void {
    socketHandler.on('newBlock', (block: Block) => {
      // TODO add validation to save block
    });
  }
}
