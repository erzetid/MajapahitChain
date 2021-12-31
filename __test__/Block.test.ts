import Block from '../src/service/Block';
import SmartContract from '../src/service/SmartContract';
import Transaction from '../src/service/Transaction';

let originalBlock: Block;
let transaction: Transaction;
let smartContract: SmartContract;
const dateNow = 1640918260500;
beforeAll(() => {
  transaction = new Transaction('sender', 'receipent');
  originalBlock = new Block(0, dateNow, '');
  smartContract = new SmartContract(
    '00xsjhsfhksf5454',
    'tokenId',
    'tokenCode',
    'tokenName',
    500,
    10
  );
});
describe('Block class', () => {
  describe('Constructor', () => {
    test('should correctly save parameters', () => {
      expect(originalBlock.blockNumber).toStrictEqual(0);
      expect(originalBlock.timestamp).toStrictEqual(dateNow);
      expect(originalBlock.previousHash).toStrictEqual('');
      expect(originalBlock.hash).toStrictEqual('');
      expect(originalBlock.nonce).toStrictEqual(0);
      expect(originalBlock.nodesMiner).toStrictEqual('');
      expect(originalBlock.transaction).toStrictEqual([]);
      expect(originalBlock.smartContract).toStrictEqual([]);
    });

    test('should correctly type parameters', () => {
      expect(typeof originalBlock.blockNumber).toStrictEqual('number');
      expect(typeof originalBlock.timestamp).toStrictEqual('number');
      expect(typeof originalBlock.previousHash).toStrictEqual('string');
      expect(typeof originalBlock.hash).toStrictEqual('string');
      expect(typeof originalBlock.nonce).toStrictEqual('number');
      expect(typeof originalBlock.nodesMiner).toStrictEqual('string');
      expect(typeof originalBlock.transaction).toStrictEqual('object');
      expect(typeof originalBlock.smartContract).toStrictEqual('object');
    });
  });

  describe('Calculate hash', () => {
    test('should correct calculate the SHA256', () => {
      // inisialisasi atau proses kalkulasi hash untuk ditambahkan ke property
      originalBlock.hash = originalBlock.sha256();
      expect(originalBlock.hash).toStrictEqual(originalBlock.sha256());
    });

    test('should change the hash when object is changed', () => {
      const originalBlockTest = originalBlock;
      originalBlockTest.nonce = 1;
      expect(originalBlock.hash).not.toStrictEqual(originalBlock.sha256());
    });
  });

  describe('addTransaction(transaction)', () => {
    test('should have return void', () => {
      const addTransaction = originalBlock.addTransaction(transaction);
      expect(addTransaction).toBeUndefined();
    });
    test('should transaction pushed to property originalBlock.transaction', () => {
      expect(originalBlock.transaction).toStrictEqual([transaction]);
    });
  });

  // TODO addSmartContract()
  describe('addSmartContract(smartContract)', () => {
    test('should have return void', () => {
      const addSmartContract = originalBlock.addSmartContract(smartContract);
      expect(addSmartContract).toBeUndefined();
    });
    test('should smartContract pushed to property originalBlock.transaction', () => {
      expect(originalBlock.smartContract).toStrictEqual([smartContract]);
    });
  });

  describe('mineBlock(DIFFICULTY)', () => {
    test('should correctly consensus', () => {
      const DIFFICULTY = 2;
      const originalBlockTest = originalBlock;
      originalBlock.mineBlock(DIFFICULTY);
      expect(originalBlockTest.hash.substring(0, DIFFICULTY)).toStrictEqual(
        Array(DIFFICULTY + 1).join('0')
      );
    });
  });
});
