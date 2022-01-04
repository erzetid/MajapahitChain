import { Address } from '../utils/type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IWallet {
  genKeyPair(): any;
  getWalletAddres(privateKey: string): Address;
}
