import Block from '../service/Block';

export default interface IChain {
  chain: Block[];
  GENESIS_BLOCK: Block;
}
