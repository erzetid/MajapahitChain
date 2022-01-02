import { Address, Token } from '../utils/type';
export default interface Transaction {
  timestamp: number;
  senderAddr: Address;
  receipentAddr: Address;
  coin: number;
  token: Token;
  txRef: string;
  signature: string;
  sendCoin(value: number): void;
  sendToken(tokenId: string, value: number): void;
  hashTx(): string;
  setSignature(signature: string): void;
  verify(): boolean;
}
