// file deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
import Wallet from '../src/service/Wallet';
import { WalletKey } from '../src/utils/type';

export const walletTest: WalletKey = {
  privateKey:
    'e39c1800c6a653401c7a141c8a3299f4e731d74ab19c224c405c19f93f327575',
  publicKey:
    '0486b37488394ef0c6bc689d5f81bb90299ecc7bf1149cb4d77f623a402c18f136567f10e770de12ab4c2db7426382bcab5d64b97ffb91d734166aea9de60f976a'
};

export const walletTest2: WalletKey = {
  privateKey:
    'e91d21fd13518120f9f73a50018b355a6559fa2a609f2a757e17b0bc7576195f',
  publicKey:
    '04c85eb11f7bf8f21b5642045cf2097a872961d3b4736a295d1335e2dbb7a626d1280e3ea2a7970be708cbab417e9852463d1c00d32755a0f9eb849792fb9feb88'
};

export const createSignTransaction = (
  txRef: string,
  privateKey: string
): string => {
  return Wallet.generateSignature(txRef, privateKey);
};
