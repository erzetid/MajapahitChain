import IChain from '../interface/IChain';
import Block from './Block';
import Transaction from './Transaction';

export default class Chain implements IChain {
  public chain: Block[];
  public GENESIS_BLOCK: Block;

  constructor() {
    this.GENESIS_BLOCK = this.createGenesisBlock();
    this.chain = [this.GENESIS_BLOCK];
  }

  private createGenesisBlock(): Block {
    const genesisBlock = new Block(
      'timestamp',
      'initialPreviousHash',
      0,
      'initialNodesMiner'
    );
    const genesCoinInitial = new Transaction('<sender>', '<receipent>');
    genesCoinInitial.coin(0);
    genesisBlock.addTransaction(genesCoinInitial);
    console.log(genesisBlock);
    return genesisBlock;
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(block: Block): void {
    block.previousHash = this.getLatestBlock().hash;
    block.hash = block.calculateHash();
    this.chain.push(block);
  }
}
