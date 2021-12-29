import Block from './src/service/Block';
import SmartContract from './src/service/SmartContract';
import Transaction from './src/service/Transaction';

const newBlock = new Block('timestamp', 'previousHash', 12, 'nodesMiner');
const newTxCoin = new Transaction('sender', 'receipent');
newTxCoin.coin(250);
newBlock.addTransaction(newTxCoin);

const newTxToken = new Transaction('sender', 'receipent');
newTxToken.token(250);
newBlock.addTransaction(newTxToken);

const newSC = new SmartContract(
  'owner',
  'tokenId',
  'tokenCode',
  'tokenName',
  5000,
  50
);
newBlock.addSmartContract(newSC);

console.log(JSON.stringify(newBlock));
