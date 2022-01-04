import IWallet from '../interface/IWallet';
import { WalletKey } from '../utils/type';
import elliptic from 'elliptic';

export const ec = new elliptic.ec('secp256k1');

export default class Wallet implements IWallet {
  /**
   * Generate key pair elliptic "secpk256k1"
   *
   * @returns {any} key
   */
  public genKeyPair(): any {
    const key = ec.genKeyPair();
    return key;
  }

  /**
   * Membuat wallet baru
   *
   * @returns {object} { privateKey, publicKey }
   */
  public static createWallet(): WalletKey {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    const walletKey = { privateKey, publicKey };
    return walletKey;
  }

  /**
   * Membuat atau mengambil walletAddress dari privateKey
   *
   * @param {string} privateKey
   * @returns {string} walletAddress
   */
  public getWalletAddres(privateKey: string): string {
    const keyPairTemp = ec.keyFromPrivate(privateKey);
    const walletAddress = keyPairTemp.getPublic('hex');
    return walletAddress;
  }

  /**
   * Membuat signature setiap ada transaksi
   *
   * @param {string} hashTx
   * @param {string} privateKey
   * @returns {string} signature
   */
  public static generateSignature(hashTx: string, privateKey: string): string {
    const keyPairTemp = ec.keyFromPrivate(privateKey);
    const sig = keyPairTemp.sign(hashTx, 'base64');
    return sig.toDER('hex');
  }

  /**
   * Mengecek sisa saldo dari wallet
   *
   * @param {string} walletAddress
   */
  // public static getBalance(walletAddress: string): void {
  //   throw new Error('Method not implemented.');
  // }
}
