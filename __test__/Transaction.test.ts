import Transaction from '../src/service/Transaction';

let transaction: Transaction;

beforeAll(() => {
  transaction = new Transaction('sender', 'receipent');
});

describe('Class Transaction', () => {
  describe('Constructor', () => {
    test('should correctly save parameters', () => {
      expect(transaction.senderAddr).toStrictEqual('sender');
      expect(transaction.receipentAddr).toStrictEqual('receipent');
    });
    test('should correctly property parameters', () => {
      expect(typeof transaction.senderAddr).toStrictEqual('string');
      expect(typeof transaction.receipentAddr).toStrictEqual('string');
    });
  });

  describe('coin(number)', () => {
    const txCoin: Transaction = new Transaction('sender', 'receipent');
    const coinVal = txCoin.coin(250);

    test('should have correctly save parameters', () => {
      expect(txCoin.content.type).toStrictEqual('coin');
      expect(txCoin.content.value).toStrictEqual(250);
    });
    test('should have return void', () => {
      expect(coinVal).toBeUndefined();
    });

    test('should have property type and value', () => {
      expect(txCoin.content).toHaveProperty('type');
      expect(txCoin.content).toHaveProperty('value');
    });
  });

  describe('coin(number)', () => {
    const txToken: Transaction = new Transaction('sender', 'receipent');
    const tokenVal = txToken.token(50);

    test('should have correctly save parameters', () => {
      expect(txToken.content.type).toStrictEqual('token');
      expect(txToken.content.value).toStrictEqual(50);
    });
    test('should have return void', () => {
      expect(tokenVal).toBeUndefined();
    });

    test('should have property type and value', () => {
      expect(txToken.content).toHaveProperty('type');
      expect(txToken.content).toHaveProperty('value');
    });
  });
});
