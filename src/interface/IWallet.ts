import { Address } from '../utils/type';

export default interface IWallet {
  genKeyPair(): any;
  getWalletAddres(privateKey: string): Address;
}
