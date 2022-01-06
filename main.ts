import { variable as V } from './env';
import Client from './src/connection/Client';
import Server from './src/connection/Server';
import * as readline from 'node:readline';
import { Node } from './src/service/Node';
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
  const client = new Client(V.PORT);
  const app = new Server(V.PORT);
  client.addMasterServer(masterServerNode);
  app.listen();
  client.listen();
};
void getAnswers();
