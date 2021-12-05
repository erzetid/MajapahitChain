import Blockchain from './src/services/Blockchain';
import Block from './src/services/Block';

const majaCoin = new Blockchain();
majaCoin.addBlock(new Block(1, '21/10/2021', { amaount: 50 }));
majaCoin.chain[1].data = { amount: 100 };
