import Transaction from '../src/service/Transaction';
import { createSignTransaction, walletTest, walletTest2 } from './helper';

let transaction: Transaction;
let firstTxRef: string;
let addCoinTxRef: string;
let addTokenTxRef: string;

beforeAll(() => {
  transaction = new Transaction(walletTest.publicKey, walletTest2.publicKey);
  firstTxRef = transaction.txRef;
  console.log(transaction);
});

describe('Class Transaction', () => {
  test('should have property "senderAddr, receipentAddr, coin, token, timestamp, txRef, signature"', () => {
    expect(transaction).toHaveProperty('senderAddr');
    expect(transaction).toHaveProperty('receipentAddr');
    expect(transaction).toHaveProperty('coin');
    expect(transaction).toHaveProperty('token');
    expect(transaction).toHaveProperty('timestamp');
    expect(transaction).toHaveProperty('txRef');
    expect(transaction).toHaveProperty('signature');
  });
  describe('Constructor', () => {
    test('should correctly save parameters', () => {
      expect(transaction.senderAddr).toStrictEqual(walletTest.publicKey);
      expect(transaction.receipentAddr).toStrictEqual(walletTest2.publicKey);
    });
    test('should correctly property parameters', () => {
      expect(typeof transaction.senderAddr).toStrictEqual('string');
      expect(typeof transaction.receipentAddr).toStrictEqual('string');
    });
  });

  describe('sendCoin(number)', () => {
    let coinTx: any;
    beforeAll(() => {
      coinTx = transaction.sendCoin(10);
      addCoinTxRef = transaction.txRef;
      console.log(transaction);
    });
    test('should have correctly save parameters value:number ', () => {
      expect(transaction.coin).toStrictEqual(10);
      expect(typeof transaction.coin).toStrictEqual('number');
    });
    test('should have return void', () => {
      expect(coinTx).toBeUndefined();
    });

    test('should changed the txRef after sendCoin', () => {
      expect(addCoinTxRef).not.toStrictEqual(firstTxRef);
    });
  });

  describe('addToken(tokenId, number)', () => {
    let tokenTx: any;
    beforeAll(() => {
      tokenTx = transaction.sendToken('tokenId', 250);
      addTokenTxRef = transaction.txRef;
      console.log(transaction);
    });
    test('should have correctly save parameters "tokenId: string, value: number"', () => {
      expect(transaction.token.tokenId).toStrictEqual('tokenId');
      expect(transaction.token.value).toStrictEqual(250);
      expect(typeof transaction.token.tokenId).toStrictEqual('string');
      expect(typeof transaction.token.value).toStrictEqual('number');
    });
    test('should have return void', () => {
      expect(tokenTx).toBeUndefined();
    });

    test('should changed the txRef after sendToken', () => {
      expect(addTokenTxRef).not.toStrictEqual(firstTxRef);
    });
  });

  describe('setSignature(signature)', () => {
    let signature: string;
    beforeAll(() => {
      transaction.sendToken('tokenId', 250);
      addTokenTxRef = transaction.txRef;
      signature = createSignTransaction(
        transaction.txRef,
        walletTest.privateKey
      );
      transaction.setSignature(signature);
      // console.log(typeof transaction.signature + ' transaction');
    });
    test('should have correctly save parameters', () => {
      expect(transaction.signature).not.toBe('');
      expect(typeof transaction.signature).toStrictEqual('string');
    });
    test('should have a new txRef', () => {
      expect(transaction.signature).toStrictEqual(signature);
    });
  });

  describe('verify()', () => {
    test('should return true with signature', () => {
      expect(transaction.verify()).toBeTruthy();
    });

    test('should return throw error "No signature in this transaction" without signature', () => {
      const newTxWithoutSignTx = new Transaction(
        walletTest2.publicKey,
        walletTest.publicKey
      );
      expect(() => newTxWithoutSignTx.verify()).toThrowError(
        'No signature in this transaction'
      );
    });
  });
});
