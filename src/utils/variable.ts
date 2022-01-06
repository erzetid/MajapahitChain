/* eslint-disable no-underscore-dangle */
import path from 'path';
const __dirname = path.resolve();

export const variable = {
  COIN: 'coin',
  TOKEN: 'token'
};

export const settingPath = path.resolve(__dirname, 'setting/nodes');
export const settingPath1 = path.resolve(__dirname, 'setting/nodes1');
export const settingPath2 = path.resolve(__dirname, 'setting/nodes2');
export const nodesMemberPath = path.resolve(__dirname, 'setting/nodesMember');
export const jsonBlockchain = path.resolve(
  __dirname,
  './src/database/json/nodes.json'
);
