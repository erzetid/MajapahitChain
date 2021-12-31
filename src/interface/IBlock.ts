import SmartContract from '../service/SmartContract';
import Transaction from '../service/Transaction';

export default interface IBlock {
  blockNumber: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  nonce: number;
  nodesMiner: string;
  transaction: Transaction[];
  smartContract: SmartContract[];
  sha256(): string;
  addTransaction(transaction: Transaction): void;
  addSmartContract(smartContract: SmartContract): void;
  mineBlock(DIFFICULTY: number): void;
}
