import { WalletKey } from '../utils/type';

export class Node {
  public nodeId: string;
  public domain: string;
  public nodeType: string;
  public nodeWallet?: WalletKey;
  constructor(
    nodeId: string,
    domain: string,
    nodeType: string,
    nodeWallet?: WalletKey
  ) {
    this.nodeId = nodeId;
    this.domain = domain;
    this.nodeType = nodeType;
    this.nodeWallet = nodeWallet;
  }
}
