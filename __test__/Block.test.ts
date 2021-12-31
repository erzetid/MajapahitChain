import Block from '../src/service/Block';

let blockTestEmpty: Block;
const dateNow = 1640918260500;
beforeAll(() => {
  blockTestEmpty = new Block(0, dateNow, '');
});
describe('Block class', () => {
  describe('Constructor', () => {
    test('should correctly save parameters', () => {
      expect(blockTestEmpty.blockNumber).toStrictEqual(0);
      expect(blockTestEmpty.timestamp).toStrictEqual(dateNow);
      expect(blockTestEmpty.previousHash).toStrictEqual('');
      expect(blockTestEmpty.nonce).toStrictEqual(0);
      expect(blockTestEmpty.nodesMiner).toStrictEqual('');
      expect(blockTestEmpty.transaction).toStrictEqual([]);
      expect(blockTestEmpty.smartContract).toStrictEqual([]);
    });

    test('should correctly type parameters', () => {
      expect(typeof blockTestEmpty.blockNumber).toStrictEqual('number');
      expect(typeof blockTestEmpty.timestamp).toStrictEqual('number');
      expect(typeof blockTestEmpty.previousHash).toStrictEqual('string');
      expect(typeof blockTestEmpty.nonce).toStrictEqual('number');
      expect(typeof blockTestEmpty.nodesMiner).toStrictEqual('string');
      expect(typeof blockTestEmpty.transaction).toStrictEqual('object');
      expect(typeof blockTestEmpty.smartContract).toStrictEqual('object');
    });
  });

  describe('Calculate hash', () => {
    test('should correct calculate the SHA256', () => {
      expect(blockTestEmpty.hash).toStrictEqual(
        'cdff9155aee8b22c32134dbafe8895f8e26450c8c9486b545fda726cc070f75c'
      );
    });

    test('should change the hash when object is changed', () => {
      const changeHash = blockTestEmpty.sha256();
      expect(blockTestEmpty.hash).not.toStrictEqual(changeHash);
    });
  });
});
