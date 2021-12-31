import Block from '../service/Block';

export default interface IChain {
  bloks: Block[];
  addBlock(block: Block): void;
  isChainValid(blocks: Block[]): boolean;
}
