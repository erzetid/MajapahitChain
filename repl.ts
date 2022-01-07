// import { io } from 'socket.io-client';
// const url = 'http://localhost:3474';
// const socket = io(url);

// socket.on('connect', () => {
//   console.log(`Koneksi berhasil ${url}`);
// });
// socket.emit('networkRegistration', 'network baru');

// socket.on('acceptedRegistartion', (networks) => {
//   console.log('Registrasi diterima');
//   console.log(networks);
// });

// const myNode = Network.getMyNode();
// const nodes = Network.getAllNodes();
// nodes.forEach((nodeMember) => {
//   // if (myNode.nodeId !== nodeMember.nodeId) {
//   const socket = io(`http://${nodeMember.domain}`);
//   console.log(`connecting to ${nodeMember.domain}`);
//   socket.emit('serverSync', myNode);

//   socket.on('serverSync', (node: Node) => {
//     console.log(`Accepted connection from ${node.domain} - ${node.nodeId} `);
//   });

//   socket.emit('registration', myNode);
//   socket.on('registration', (node: Node) => {
//     if (myNode.nodeId === node.nodeId) {
//       return console.log('berhasil registrasi');
//     }
//     console.log(`domain berhasil tergistrasi: ${node.domain}`);
//   });
//   // }
// });clear
export const clg = 'Oke2';
console.log(clg);
