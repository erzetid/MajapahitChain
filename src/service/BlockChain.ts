/* eslint-disable @typescript-eslint/naming-convention */
import { Address } from '../utils/type';
import Block from './Block';
import Chain from './Chain';
import Transaction from './Transaction';

export default class BlockChain {
  readonly DIFFICULTY: number = 1;
  public chaining: Chain;

  readonly NODE_ID: string = '23a58b86-d617-461a-8665-b0576863e2a8';
  readonly NODE_ADDRESS: Address =
    '0dc34f82a3c2a65ce7ff55e5679a766d678d5cae37ff86637c13dc137c70fc2b';
  readonly MINING_REWARDS: number = 30;

  constructor() {
    this.chaining = new Chain();
  }

  /**
   * Menambahkan transaksi kedalam miner (parameter minePendingTransaction berisi semua transaksi yang sudah di push/ditambahakan)
   *
   * @param {Transaction} transaction
   */
  public minePendingTransactoin(transactions: Transaction): void {
    if (this.chaining.bloks.length) {
      // Membuat blok baru
      const newBlock = new Block(
        this.chaining.getLatestBlock().blockNumber + 1,
        Date.now(),
        this.chaining.getLatestBlock().hash
      );

      // Menambahkan semua transaksi yang terkumpul
      newBlock.addTransaction(transactions);
      newBlock.mineBlock(this.DIFFICULTY);

      // Jika chainValid maka akan ditambahkan kedalam Blockchain
      if (this.chaining.isChainValid(this.chaining.bloks)) {
        this.chaining.addBlock(newBlock);
      }
    }
  }

  /**
   * Menambahkan reward untuk Miner
   *
   * @returns {Transaction}
   */
  public mineRewardTransaction(): Transaction {
    console.log('Menambahkan Reward');
    const rewardTx = new Transaction('<COINBASE>', this.NODE_ADDRESS);
    rewardTx.coin(this.MINING_REWARDS);
    return rewardTx;
  }

  /**
   * Mengecek jumlah saldo dari wallet address
   * dengan cara menambahkan value jika pada transaksi blockchain alamat receipentAddr adalah
   * alamat yang dicantumkan, dan akan mengurangi value jika alamat senderAddr alamat yang dicantumkan.
   *
   * @param {Address} address
   * @returns
   */
  public getBalanceOfAddress(address: Address): number {
    let balance = 0;
    for (const block of this.chaining.bloks) {
      for (const trans of block.transaction) {
        if (trans.senderAddr === address) {
          balance -= trans.content.value;
        }
        if (trans.receipentAddr === address) {
          balance += trans.content.value;
        }
      }
    }
    return balance;
  }
}
