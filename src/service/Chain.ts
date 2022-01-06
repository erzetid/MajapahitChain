import IChain from '../interface/IChain';
import Block from './Block';
import Transaction from './Transaction';

export default class Chain implements IChain {
  public bloks: Block[];
  readonly GENESIS_BLOCK: Block = this.createGenesisBlock();

  /**
   * Proses awal adalah Menmabahkan genesis blok ke dalam chain
   */
  constructor() {
    this.bloks = [this.GENESIS_BLOCK];
  }

  /**
   * Memmbuat Genesis blok atau blok pertama
   *
   * @returns {Block}
   */
  private createGenesisBlock(): Block {
    const genesisBlock = new Block(0, Date.now(), 'previousHash');
    const genesCoinInitial = new Transaction('<sender>', '<receipent>');
    genesCoinInitial.sendCoin(0);
    genesisBlock.addTransaction(genesCoinInitial);
    genesisBlock.hash = genesisBlock.sha256();
    return genesisBlock;
  }

  /**
   * Mencari blok terakhir yang sudah dibuat
   *
   * @returns {Block}
   */
  public getLatestBlock(): Block {
    return this.bloks[this.bloks.length - 1];
  }

  /**
   * Menmbahkan blok baru yang sudah diverifikasi sesuai konsensus
   *
   * @param {Block} block
   */
  public addBlock(block: Block): void {
    this.bloks.push(block);
  }

  /**
   * Memvalidasi semua blok yang ada diblockchain
   *
   * @param {Block[]} blocks
   * @returns {boolean}
   */
  public isChainValid(blocks: Block[]): boolean {
    if (blocks.length === 0) {
      throw new Error('Blockchain cant be empty!');
    }
    if (JSON.stringify(this.GENESIS_BLOCK) !== JSON.stringify(blocks[0])) {
      throw new Error('Invalid first block!');
    }
    for (let i = 1; i < blocks.length; ++i) {
      const current = blocks[i];
      const previous = blocks[i - 1];

      // Verifikasi nomor blok
      if (current.blockNumber !== i) {
        throw new Error(
          `Invalid block number ${current.blockNumber} for block #${i}!`
        );
      }

      // Verifikasi hash sebelumnya apakah sama jika blok dihash ulang
      if (current.previousHash !== previous.sha256()) {
        throw new Error(`Invalid previous block hash for block #${i}!`);
      }
    }
    return true;
  }
}
