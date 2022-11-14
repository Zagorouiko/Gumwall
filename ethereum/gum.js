//Will use to import the factory instance to multiple places in the project. saves on duplication
import { web3, metamaskStatus } from './web3';
import Gum from './build/contracts.json';

const instance = new web3.eth.Contract(
  Gum.nft.Gum.abi,
  "0x0499F1a372F9B1C886bF390c9aCE399d5cAA7194"
);

export default instance;
