/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as fs from 'fs';
import { serialize, deserialize } from 'serializer.ts/Serializer';
import { v4 as uuidv4 } from 'uuid';
import INetwork from '../interface/INetwork';
import { networksPath, settingPath } from '../utils/variable';
import { Node } from './Node';
import Wallet from './Wallet';

export default class Network implements INetwork {
  public myNode: Node;
  public networks: Node[];
  public activeNetworks: Node[];
  public domain: string;

  constructor(domain: string) {
    this.domain = domain;
    this.myNode = this.addNode(domain);
    this.networks = [];
    this.activeNetworks = [];
    this.load();
  }

  /**
   * Membuat node baru dengan parameter domain/nama pemilik node
   *
   * @param {string} domain
   * @returns {Node} node yang dibuat
   */
  private addNode(domain: string): Node {
    try {
      const tempNode = deserialize<Node>(
        Node,
        JSON.parse(fs.readFileSync(settingPath, 'utf8'))
      );
      if (tempNode.domain !== domain) {
        tempNode.domain = domain;
        fs.writeFileSync(
          settingPath,
          JSON.stringify(serialize(tempNode), undefined, 2),
          'utf8'
        );
      }
      return tempNode;
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      return this.addNewNode(domain);
    }
  }

  private addNewNode(domain: string): Node {
    const nodeId = uuidv4();
    const nodeWallet = Wallet.createWallet();
    const newNode = new Node(nodeId, domain, 'fullNode', nodeWallet);
    fs.writeFileSync(
      settingPath,
      JSON.stringify(serialize(newNode), undefined, 2),
      'utf8'
    );
    return newNode;
  }

  /**
   * Memuat semua node yang tersimpan jika tersedia network aktif
   * maka akan download nodes dari network yang aktif.
   * Jika tidak ada network yang aktif maka meregistrasi nodenya sendiri
   */
  public load(): void {
    try {
      this.networks = deserialize<Node[]>(
        Node,
        JSON.parse(fs.readFileSync(networksPath, 'utf8'))
      );
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      this.register(this.getMyNode());
    }
  }

  /**
   * Memfilter node sesuai dengan nodeId yang dicantumkan dalam parameter
   *
   * @param {Node} nodeId
   * @returns {Node[]}
   */
  private filterNodes(nodeId: string): Node[] {
    return this.networks.filter((item) => {
      return item.nodeId === nodeId;
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
      delete myNode.nodeWallet;
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
  public register(node: Node): boolean {
    const tempNode = this.filterNodes(node.nodeId);
    if (!tempNode.length) {
      this.addToNetworks(node);
      return true;
    }

    // Jika sudah ada dalam networks maka cek domain apakah sama
    const index: number = this.networks.findIndex(
      (_node) => node.nodeId === _node.nodeId
    );
    if (tempNode[0].domain !== node.domain) {
      this.networks.splice(index, 1);
      this.addToNetworks(node);
      return true;
    }
    return false;
  }

  // Update all in network
  public updateNetworks(networks: Node[]): boolean {
    try {
      fs.writeFileSync(
        networksPath,
        JSON.stringify(serialize(networks), undefined, 0),
        'utf8'
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  public addToNetworks(node: Node): void {
    try {
      this.networks.push(node);
      fs.writeFileSync(
        networksPath,
        JSON.stringify(serialize(this.networks), undefined, 0),
        'utf8'
      );
      // memperbarui isi networks
      this.load();
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
  public addActiveNetwork(node: Node): void {
    this.activeNetworks.push(node);
  }
}
