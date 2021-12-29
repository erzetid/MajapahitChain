export default interface IBlock<T> {
  timestamp: string;
  hash: string;
  previousHash: string;
  nonce: number;
  nodesMiner: string;
  transaction: T[];
  smartContract: T[];
  calculateHash(): string;
  addTransaction(transaction: T): void;
  addSmartContract(smartContract: T): void;
}
