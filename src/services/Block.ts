import SHA256 from 'crypto-js/sha256';

export class Block {
  private index: number;
  private timestamp: string;
  private data: object;
  private previousHash: string;
  private hash: string;

  constructor(
    index: number,
    timestamp: string,
    data: object,
    previousHash: string = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

export default Block;
