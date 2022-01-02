/* eslint-disable @typescript-eslint/restrict-plus-operands */
import readlineSync from 'readline-sync';

while (true) {
  const question = readlineSync.question('Masukan domain atau nama anda:');
  if (question !== '') {
    console.log(question + ' sudah ditambahkan.');
    break;
  }
  console.log('Mohon maaf tidak boleh kosong!');
}

while (true) {
  const nodes = ['Node Biasa', 'Miner'];
  const index = readlineSync.keyInSelect(nodes, 'Pilih tipe node?');
  if (nodes[index] === undefined) {
    console.log('Berhasil keluar');
    break;
  }
  if (nodes[index] === 'Node Biasa') {
    console.log('Kamu berhasil memilih ' + nodes[index]);
    break;
  }
  if (nodes[index] === 'Miner') {
    console.log('Kamu berhasil memilih ' + nodes[index]);
    break;
  }
}
