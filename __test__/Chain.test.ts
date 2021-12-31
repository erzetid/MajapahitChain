import Block from '../src/service/Block';
import Chain from '../src/service/Chain';

let chaining: Chain;
let block: Block;
beforeAll(() => {
  chaining = new Chain();
  block = new Block(
    chaining.getLatestBlock().blockNumber + 1,
    12356665,
    chaining.getLatestBlock().hash
  );
  block.mineBlock(2);
  chaining.addBlock(block);
});

describe('Chain Class', () => {
  describe('Constructor', () => {
    test('should have property GENESIS_BLOCK', () => {
      expect(chaining).toHaveProperty('GENESIS_BLOCK');
    });
    test('should have property bloks', () => {
      expect(chaining).toHaveProperty('bloks');
    });
    test('should the first block in "chaining" is GENESIS_BLOCK', () => {
      expect(JSON.stringify(chaining.bloks[0])).toStrictEqual(
        JSON.stringify(chaining.GENESIS_BLOCK)
      );
    });
  });
  describe('getLastBlock()', () => {
    test('should have last block', () => {
      expect(chaining.getLatestBlock()).toStrictEqual(block);
    });
    test('should have property of Block Class', () => {
      expect(chaining.getLatestBlock()).toHaveProperty('blockNumber');
      expect(chaining.getLatestBlock()).toHaveProperty('timestamp');
      expect(chaining.getLatestBlock()).toHaveProperty('previousHash');
      expect(chaining.getLatestBlock()).toHaveProperty('hash');
      expect(chaining.getLatestBlock()).toHaveProperty('nonce');
      expect(chaining.getLatestBlock()).toHaveProperty('nodesMiner');
      expect(chaining.getLatestBlock()).toHaveProperty('transaction');
      expect(chaining.getLatestBlock()).toHaveProperty('smartContract');
    });
  });
  describe('isChainValid()', () => {
    test('should return true', () => {
      expect(chaining.isChainValid(chaining.bloks)).toBeTruthy();
    });

    test('should throw error "Blockchain cant be empty!"', () => {
      expect(() => chaining.isChainValid([])).toThrowError(
        'Blockchain cant be empty!'
      );
    });

    test('blockchain should throw error "Invalid previous block hash for block #1!"', () => {
      chaining.bloks[0].nonce = 1000;
      expect(() => chaining.isChainValid(chaining.bloks)).toThrowError(
        'Invalid previous block hash for block #1!'
      );
    });
    test('bad GENESIS_BLOCK should throw error "Invalid previous block hash for block #1!"', () => {
      const badChain: Chain = new Chain();
      badChain.bloks[0].nonce = 1000;
      expect(() => chaining.isChainValid(badChain.bloks)).toThrowError(
        'Invalid first block'
      );
    });
    test('bad blockNumber should throw error "Invalid block number 5 for block #1!"', () => {
      const badChain: Chain = new Chain();
      const blockBadChain: Block = new Block(
        badChain.getLatestBlock().blockNumber + 1,
        12356665,
        badChain.getLatestBlock().hash
      );
      badChain.addBlock(blockBadChain);
      badChain.bloks[1].blockNumber = 5;
      expect(() => badChain.isChainValid(badChain.bloks)).toThrowError(
        'Invalid block number 5 for block #1!'
      );
    });
  });
});
