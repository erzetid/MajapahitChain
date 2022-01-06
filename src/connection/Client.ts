import { io, Socket } from 'socket.io-client';
import Network from '../service/Network';
import { Node } from '../service/Node';
import { internalIpV4Sync as myIp } from 'internal-ip';

export default class Client {
  public domain: string;
  public port: number;
  public network: Network;
  public myNode: Node;
  public networks: Node[];
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  constructor(port: number, domain = `${myIp()}`) {
    this.domain = `${domain}:${port}`;
    this.port = port;
    this.network = new Network(this.domain);
    this.myNode = this.initialNode();
    this.networks = [];
    this.initialNetworks();
  }

  public initialNode(): Node {
    // jika tidak ada node maka otomatis membuat node
    const myNode = this.network.getMyNode();
    return myNode;
  }

  public initialNetworks(): void {
    const isNewNetwork = this.network.register(this.myNode);
    if (isNewNetwork) {
      console.log('Belum pernah menjadi node');
    } else {
      console.log('Sudah pernah menjadi node');
    }
  }

  public syncNetwork(node: Node, networks: Network[]): void {
    this.network.networks = [];
    if (this.network.updateNetworks(networks))
      return console.log(
        `Syncronize success from ${node.nodeId} ${node.domain}`
      );
    console.log('Syncronize failed');
  }

  public addMasterServer(node: Node) {
    this.network.networks.push(node);
  }

  public listen(): void {
    this.network.networks.forEach((nodesMember: Node) => {
      if (this.myNode.nodeId !== nodesMember.nodeId) {
        const socket = io(`http://${nodesMember.domain}`);
        console.log(
          `Client connecting to ${nodesMember.nodeId} ${nodesMember.domain}`
        );

        socket.emit('registration', this.myNode); // kirim registrasi node saya ke server rujukan

        // handle registrasi node saya dari server rujukan
        socket.on('acceptedRegistartion', (node: Node) => {
          socket.emit('serverSync', this.myNode); // kirim pesan ke server rujukan
          console.log(`Node accepted from ${node.nodeId} ${node.domain}`);
          socket.on('syncNetwork', (_node: Node, networks: Network[]) =>
            this.syncNetwork(_node, networks)
          ); // handle pesan dari server rujukan
        });

        // Global
        socket.on('newNetwork', (node: Node) => {
          if (this.myNode.nodeId !== node.nodeId) {
            console.log(`network baru ${node.domain}`);
            this.network.register(node);
          }
        });
      }
    });
  }
}
