import crypto from 'crypto';
import elliptic from 'elliptic';
import ITransaction from '../interface/ITransaction';
import { Address, Token } from '../utils/type';

export const ec = new elliptic.ec('secp256k1');
export const emptyToken = { tokenId: '', value: 0 };

export default class Transaction implements ITransaction {
  public senderAddr: Address;
  public receipentAddr: Address;
  public coin = 0;
  public token: Token = emptyToken;
  public timestamp: number = Date.now();
  public txRef: string;
  public signature = '';

  /**
   *
   * @param {string} senderAddr
   * @param receipentAddr
   */
  constructor(senderAddr: string, receipentAddr: string) {
    this.senderAddr = senderAddr;
    this.receipentAddr = receipentAddr;
    this.txRef = this.hashTx();
  }

  /**
   * Megenkripsi transaksi dengan SHA256
   *
   * @returns {string} sha256
   */
  public hashTx(): string {
    return crypto
      .createHash('sha256')
      .update(
        `${this.timestamp}${this.senderAddr}${this.receipentAddr}${
          this.coin
        }${JSON.stringify(this.token)}`
      )
      .digest('hex');
  }

  /**
   * Menmbahkan content coin kedalam transaksi
   *
   * @param {number} value
   */
  public sendCoin(value: number): void {
    this.coin = value;
    this.txRef = this.hashTx(); // update txRef
  }

  /**
   * Menambahkan content coin kedalam transaksi token
   *
   * @param {number} value
   */
  public sendToken(tokenId: string, value: number): void {
    this.token = { tokenId, value };
    this.txRef = this.hashTx(); // update txRef
  }

  public setSignature(signature: string): void {
    this.signature = signature;
  }

  /**
   * Proses verifikasi apakah transaksi yang dibuat berdasarkan signature
   * dari <senderAddr> sender address
   * Method ini dieksekusi di Blockchain
   *
   * @returns {boolean}
   */
  public verify(): boolean {
    if (this.signature === '') {
      throw new Error('No signature in this transaction');
    }
    const publicKey = ec.keyFromPublic(this.senderAddr, 'hex');
    const verifyStatus = publicKey.verify(this.txRef, this.signature);
    return verifyStatus;
  }
}
