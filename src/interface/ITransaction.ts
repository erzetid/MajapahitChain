import { Address, Content } from '../utils/type';
export default interface Transaction {
  senderAddr: Address;
  receipentAddr: Address;
  content: Content;
  coin(value: number): void;
  token(value: number): void;
}
