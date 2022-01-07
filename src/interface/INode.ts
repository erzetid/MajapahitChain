import { WalletKey } from '../utils/type';

export default interface INode {
  nodeId: string;
  domain: string;
  nodeType: string;
  nodeWallet?: WalletKey;
}
