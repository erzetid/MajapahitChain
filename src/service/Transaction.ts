import ITransaction from '../interface/ITransaction';
import { Address, Content } from '../utils/type';
import { variable as V } from '../utils/variable';

export default class Transaction implements ITransaction {
  public senderAddr: Address;
  public receipentAddr: Address;
  public content: Content;

  /**
   *
   * @param senderAddr
   * @param receipentAddr
   */
  constructor(senderAddr: string, receipentAddr: string) {
    this.senderAddr = senderAddr;
    this.receipentAddr = receipentAddr;
    this.content = { type: '', value: 0 };
  }

  /**
   * Menmbahkan content coin kedalam transaksi
   *
   * @param {number} value
   */
  coin(value: number): void {
    const content = { type: V.COIN, value };
    this.content = { ...this.content, ...content };
  }
  /**
   * Menambahkan content coin kedalam transaksi token
   *
   * @param {number} value
   */
  token(value: number): void {
    const content = { type: V.TOKEN, value };
    this.content = { ...this.content, ...content };
  }
}
