/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// // file deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
import Transaction from './src/service/Transaction';
import Wallet from './src/service/Wallet';
import { WalletKey } from './src/utils/type';

import * as fs from 'fs';
import { serialize, deserialize } from 'serializer.ts/Serializer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import Block from './src/service/Block';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myWallet: WalletKey = {
  privateKey:
    'e39c1800c6a653401c7a141c8a3299f4e731d74ab19c224c405c19f93f327575',
  publicKey:
    '0486b37488394ef0c6bc689d5f81bb90299ecc7bf1149cb4d77f623a402c18f136567f10e770de12ab4c2db7426382bcab5d64b97ffb91d734166aea9de60f976a'
};

const walletAgain: WalletKey = {
  privateKey:
    'e91d21fd13518120f9f73a50018b355a6559fa2a609f2a757e17b0bc7576195f',
  publicKey:
    '04c85eb11f7bf8f21b5642045cf2097a872961d3b4736a295d1335e2dbb7a626d1280e3ea2a7970be708cbab417e9852463d1c00d32755a0f9eb849792fb9feb88'
};

const newTxCoin = new Transaction(walletAgain.publicKey, 'receipent');
newTxCoin.sendCoin(10);
const generateSignature = Wallet.generateSignature(
  newTxCoin.txRef,
  walletAgain.privateKey
);
newTxCoin.setSignature(generateSignature);
console.log(newTxCoin);
console.log(`${newTxCoin.verify().toString()}`);

const newBlock = new Block(1, 3123333, '');
newBlock.addTransaction(newTxCoin);
newBlock.mineBlock(2);

const nodeId = uuidv4();
const __dirname = path.resolve();
const paths = path.resolve(
  __dirname,
  '14d87bac-db64-4bb3-91ba-2c6b9f9b0403.blockchain'
);
// const paths = path.resolve(__dirname, `${nodeId}.blockchain`);
console.log(paths);
fs.writeFileSync(
  paths,
  JSON.stringify(serialize([newBlock]), undefined, 2),
  'utf8'
);
const blocks = deserialize<Block[]>(
  Block,
  JSON.parse(fs.readFileSync(paths, 'utf8'))
);

console.log(blocks);
