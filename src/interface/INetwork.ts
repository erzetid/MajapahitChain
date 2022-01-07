import { Node } from '../service/Node';

export default interface INetwork {
  myNode: Node;
  networks: Node[];
  activeNetworks: Node[];
  domain: string;
  load(): void;
  getMyNode(): Node;
  register(node: Node): boolean;
  updateNetworks(networks: Node[]): boolean;
  addToNetworks(node: Node): void;
  addActiveNetwork(node: Node): void;
}
