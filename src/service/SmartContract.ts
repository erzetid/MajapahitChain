import ISmartContract from '../interface/ISmartContract';

export default class SmartContract implements ISmartContract {
  public owner: string;
  public tokenId: string;
  public tokenCode: string;
  public tokenName: string;
  public tokenAmounts: number;
  public reserveCoinValue: number;
  public tokenValue: number;

  constructor(
    owner: string,
    tokenId: string,
    tokenCode: string,
    tokenName: string,
    tokenAmounts: number,
    reserveCoinValue: number
  ) {
    this.owner = owner;
    this.tokenId = tokenId;
    this.tokenCode = tokenCode;
    this.tokenName = tokenName;
    this.tokenAmounts = tokenAmounts;
    this.reserveCoinValue = reserveCoinValue;
    this.tokenValue = this.getTokenValue();
  }

  getTokenValue(): number {
    return this.reserveCoinValue / this.tokenAmounts;
  }
}
