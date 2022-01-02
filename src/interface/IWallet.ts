import { Address, WalletKey } from '../utils/type';

export default interface IWallet {
  genKeyPair(): any;
  createWallet(): WalletKey;
  getWalletAddres(privateKey: string): Address;
}
