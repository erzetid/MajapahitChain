import SmartContract from '../service/SmartContract';
import Transaction from '../service/Transaction';

export default interface IBlock {
  timestamp: string;
  hash: string;
  previousHash: string;
  nonce: number;
  nodesMiner: string;
  transaction: Transaction[];
  smartContract: SmartContract[];
  calculateHash(): string;
  addTransaction(transaction: Transaction): void;
  addSmartContract(smartContract: SmartContract): void;
}
