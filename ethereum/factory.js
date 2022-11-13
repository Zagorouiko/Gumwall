//Will use to import the factory instance to multiple places in the project. saves on duplication
import { web3, metamaskStatus } from './web3';
import NFTFactory from './build/contracts.json';

const instance = new web3.eth.Contract(
  NFTFactory.nft.MyToken.abi,
  "0x9bc0F649e64f431B9Cc7663feBfc0F4552c7a4D4"
);

export default instance;
