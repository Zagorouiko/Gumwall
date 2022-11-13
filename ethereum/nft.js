import { web3, metamaskStatus } from './web3';
import NFT from './build/contracts.json';

const NFTInstance = (address) => {
  return new web3.eth.Contract(
    NFT.nft.NFT.abi,
    address
  );
};

export default NFTInstance;
