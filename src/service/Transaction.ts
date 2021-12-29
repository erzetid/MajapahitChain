import ITransaction from '../interface/ITransaction';
import { Address, Content } from '../utils/type';
import { variable as V } from '../utils/variable';

export default class Transaction implements ITransaction {
  public senderAddr: Address;
  public receipentAddr: Address;
  public content: Content;

  constructor(senderAddr: string, receipentAddr: string) {
    this.senderAddr = senderAddr;
    this.receipentAddr = receipentAddr;
    this.content = { type: '', value: 0 };
  }

  coin(value: number): void {
    const _content = { type: V.COIN, value };
    this.content = { ...this.content, ..._content };
  }

  token(value: number): void {
    const _content = { type: V.TOKEN, value };
    this.content = { ...this.content, ..._content };
  }
}
