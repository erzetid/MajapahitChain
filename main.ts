import * as readline from 'node:readline';
import { Node } from './src/service/Node';
import P2PServer from './src/connection/P2PServer';
const questionAnswer = (): Promise<string> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter your referance node domain: ', (answer: string) => {
      resolve(answer);
      rl.close();
    });
  });
};

export const getAnswers = async (): Promise<void> => {
  let domain: string;
  const masterServerNode = new Node('', '', '');
  while (true) {
    domain = await questionAnswer();
    masterServerNode.domain = domain;
    if (domain !== '') {
      break;
    }
    console.log('Oops tidak boleh kosong');
  }
  const app = new P2PServer();
  app.addDomainRef(domain);
  app.listen();
};
void getAnswers();
