import BlockChain from './src/service/BlockChain';
import Transaction from './src/service/Transaction';
const newTxCoin = new Transaction('sender', 'receipent');
const newTxToken = new Transaction('sender', 'receipent');
newTxCoin.coin(250);
newTxToken.token(250);
const blockChain = new BlockChain();

const newTxCoinMiner = new Transaction(
  '0dc34f82a3c2a65ce7ff55e5679a766d678d5cae37ff86637c13dc137c70fc2b',
  'receipent'
);
newTxCoinMiner.coin(10);

blockChain.minePendingTransactoin(newTxCoin);
// Tambah reward transaksi ke blok
blockChain.minePendingTransactoin(blockChain.mineRewardTransaction());
blockChain.minePendingTransactoin(newTxCoinMiner);

// ====================================================================
blockChain.minePendingTransactoin(newTxToken);
// Tambah reward transaksi ke blok
blockChain.minePendingTransactoin(blockChain.mineRewardTransaction());

const valid = blockChain.chaining.isChainValid(blockChain.chaining.bloks);
console.log(JSON.stringify(blockChain.chaining.bloks));
console.log('Balance');
console.log(
  JSON.stringify(
    blockChain.getBalanceOfAddress(
      '0dc34f82a3c2a65ce7ff55e5679a766d678d5cae37ff86637c13dc137c70fc2b'
    )
  )
);
console.log(`is chain valid  ${valid.toString()}`);
