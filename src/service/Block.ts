import SHA256 from 'crypto-js/sha256';
import IBlock from '../interface/IBlock';

export default class Block<T> implements IBlock<T> {
  timestamp: string;
  hash: string;
  previousHash: string;
  nonce: number;
  nodesMiner: string;
  transaction: T[];
  smartContract: T[];

  /**
   * @param {string} timestamp
   * @param {string} previousHash
   * @param {number} nonce
   * @param {string} nodesMiner
   */

  constructor(
    timestamp: string,
    previousHash: string,
    nonce: number,
    nodesMiner: string
  ) {
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.transaction = [];
    this.smartContract = [];
    this.nodesMiner = nodesMiner;
  }

  /**
   * Creates a SHA256 hash of the transaction
   *
   * @returns {string}
   */

  public calculateHash(): string {
    return SHA256(
      this.timestamp +
        this.hash +
        this.previousHash +
        this.nonce +
        JSON.stringify(this.transaction) +
        this.nodesMiner
    ).toString();
  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   *
   * @param {Transaction} transaction
   */
  public addTransaction(transaction: T): void {
    this.transaction.push(transaction);
  }

  /**
   * Add a new smartContract to the list of pending smartContract (to be added
   * next time the mining process starts). This verifies that the given
   * smartContract is properly signed.
   *
   * @param {SmartContract} smartContract
   */
  public addSmartContract(smartContract: T): void {
    this.smartContract.push(smartContract);
  }
}
