import crypto from 'crypto';
import IBlock from '../interface/IBlock';
import SmartContract from './SmartContract';
import Transaction from './Transaction';

export default class Block implements IBlock {
  public blockNumber: number;
  public timestamp: number;
  // hash tidak dikalkulasi langsung karena ada pembahan object didalam transaction dan smartcontract
  public previousHash: string;
  public hash = '';
  public nonce = 0;
  public nodesMiner = '';
  public transaction: Transaction[];
  public smartContract: SmartContract[];

  /** hash tidak dikalkulasi langsung karena ada penambahan object didalam transaction dan smartcontract,
   * dan harus dikalkulasi ulang setiap ada object yang ditambahkan
   *
   * @param {number} blockNumber
   * @param {string} timestamp
   * @param {string} previousHash
   */

  constructor(blockNumber: number, timestamp: number, previousHash: string) {
    this.blockNumber = blockNumber;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    // this.hash=this.sha256()
    this.transaction = [];
    this.smartContract = [];
  }

  /**
   * Mengenkripsi SHA256 isi blok untuk dijadikan blok hash
   * yang nantinya akan dijadikan properti objek untuk verifikasi Blockchain
   *
   * @returns {string}
   */

  public sha256(): string {
    return crypto
      .createHash('sha256')
      .update(
        `${this.blockNumber}${this.timestamp}${this.previousHash}${
          this.nonce
        }${JSON.stringify(this.transaction)}${JSON.stringify(
          this.smartContract
        )}${this.nodesMiner}`
      )
      .digest('hex');
  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   *
   * @param {Transaction} transaction
   */
  public addTransaction(transaction: Transaction): void {
    this.transaction.push(transaction);
  }

  /**
   * Add a new smartContract to the list of pending smartContract (to be added
   * next time the mining process starts). This verifies that the given
   * smartContract is properly signed.
   *
   * @param {SmartContract} smartContract
   */
  public addSmartContract(smartContract: SmartContract): void {
    this.smartContract.push(smartContract);
  }

  /**
   * Memualai proses mining/menambang dengan cara mengubah nonce
   * dari blok agar mendapatkan hashing yang depannya "0" sesuai DIFFICULTY.
   * DIFFICULTY = 4 berarti angka 0 didepan hasil hashing harus 0000
   * contoh DIFFICULTY = 4 000063f333a896c00255fc133c790ffbb17524471b08d6b78ca78e42b0e49184.
   *
   * @param {number} difficulty
   */

  public mineBlock(DIFFICULTY: number): void {
    // Mengulang hashing/enkripsi dengan cara mengubah nonce agar menjadi block hash yang diitetapkan.
    while (true) {
      const consensus = this.sha256();
      // console.log(
      //   `blockNumber: ${this.blockNumber} nonce: ${this.nonce}, consensus: ${consensus}`
      // );

      // Proses validasi
      if (this.consensusValid(consensus, DIFFICULTY)) {
        console.log(`Found valid consensus: ${consensus}!`);
        this.hash = consensus;

        // TODO kirim ke semua jaringan untuk divalidasi
        break;
      }
      this.nonce++;
    }
  }

  /**
   * Proses validasi konsensus dengan cara mencocokan karakter depan string consensus sesuai DIFFICULTY
   * dengan hasil hashing yang sudah dilakaukan. Akan mengembalikan nilai true jika sudah teapt.
   *
   * @param {string} consensus
   * @param {number} DIFFICULTY
   * @returns {boolean}
   */
  private consensusValid(consensus: string, DIFFICULTY: number): boolean {
    if (consensus.startsWith(Array(DIFFICULTY + 1).join('0'))) return true;
    return false;
  }
}
