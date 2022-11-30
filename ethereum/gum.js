//Will use to import the factory instance to multiple places in the project. saves on duplication
import { web3, metamaskStatus } from './web3';
import Gum from './build/contracts.json';

const instance = new web3.eth.Contract(
  Gum.nft.Gum.abi,
  "0xF1f120D8a3B6Ac55918Ea48E96cEd3D8Fe0a998B"
);

export default instance;
