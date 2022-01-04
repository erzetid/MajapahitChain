export class Node {
  public nodeId: string;
  public domain: string;
  public nodeType: string;
  constructor(nodeId: string, domain: string, nodeType: string) {
    this.nodeId = nodeId;
    this.domain = domain;
    this.nodeType = nodeType;
  }
}
