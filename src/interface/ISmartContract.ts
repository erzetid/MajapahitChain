import { Address } from '../utils/type';

export default interface ISmartContract {
  owner: Address;
  tokenId: string;
  tokenCode: string;
  tokenName: string;
  tokenAmounts: number;
  reserveCoinValue: number;
  tokenValue: number;
  getTokenValue(): number;
}
