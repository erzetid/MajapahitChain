/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as fs from 'fs';
import { serialize, deserialize } from 'serializer.ts/Serializer';
import { v4 as uuidv4 } from 'uuid';
import { nodesMemberPath, settingPath } from '../utils/variable';
import { Node } from './Node';
import Wallet from './Wallet';

export default class Network {
  public myNode: Node;
  public nodes: Node[];
  public activeNetworks: Node[];

  constructor() {
    this.myNode = this.getMyNode();
    this.nodes = [];
    this.activeNetworks = [];
    this.load();
  }

  /**
   * Membuat node baru dengan parameter domain/nama pemilik node
   *
   * @param {string} domain
   * @returns {Node} node yang dibuat
   */
  public static createNode(domain: string): Node {
    try {
      deserialize<Node>(Node, JSON.parse(fs.readFileSync(settingPath, 'utf8')));
      throw new Error('Your nodes is already created!');
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      const nodeId = uuidv4();
      const nodeWallet = Wallet.createWallet();
      const newNode = new Node(nodeId, domain, 'fullNode');
      fs.writeFileSync(
        settingPath,
        JSON.stringify(serialize({ ...newNode, nodeWallet }), undefined, 2),
        'utf8'
      );
      return newNode;
    }
  }

  /**
   * Memuat semua node yang tersimpan jika tersedia network aktif
   * maka akan download nodes dari network yang aktif.
   * Jika tidak ada network yang aktif maka meregistrasi nodenya sendiri
   */
  private load(): void {
    try {
      this.nodes = deserialize<Node[]>(
        Node,
        JSON.parse(fs.readFileSync(nodesMemberPath, 'utf8'))
      );
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      if (this.activeNetworks.length) {
        // Jika tersedia network aktif maka download nodes network
      }
      this.register(this.myNode);
    }
  }

  /**
   * Memfilter node sesuai dengan nodeId yang dicantumkan dalam parameter
   *
   * @param {Node} nodeId
   * @returns {Node[]}
   */
  private filterNodes(nodeId: string): Node[] {
    return this.nodes.filter((item) => {
      return item.nodeId !== nodeId;
    });
  }

  /**
   * Fungsi ini akan dijalankan otomatis ketika membuat objek Network,
   * jika belum membuat node maka akan mengembalikan error
   *
   * @returns {Node} pemilik node
   */
  public getMyNode(): Node {
    try {
      const myNode = deserialize<Node>(
        Node,
        JSON.parse(fs.readFileSync(settingPath, 'utf8'))
      );
      return myNode;
    } catch (error) {
      throw new Error('You are node is not registered!');
    }
  }

  /**
   * Mendaftarkan node kedalam network lalu menyiarkannya ke semua jaringan
   *
   * @param {Node} node
   */
  public register(node: Node) {
    try {
      this.nodes.push(node);
      fs.writeFileSync(
        nodesMemberPath,
        JSON.stringify(serialize(this.nodes), undefined, 0),
        'utf8'
      );
    } catch (error) {
      throw new Error('The nodes is already registered!');
    }
  }

  /**
   * Menambahkan node kedalam network aktif sebagai alamat untuk mengirimkan semua transaksi,
   * node akan otomatis terhapus jika node yang terhubung tidak ada sambungan
   *
   * @param {Node} node
   */
  public addActiveNetwork(node: Node) {
    this.activeNetworks.push(node);
  }

  public targetBroadcast(): Node[] {
    return this.nodes.filter((item) => {
      return item.nodeId !== this.myNode.nodeId;
    });
  }
}
