const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledNFTFactory = require('./build/contracts.json');

const provider = new HDWalletProvider(
  "rabbit west enjoy female armed seat early desert unknown shoulder hollow city",
  "https://goerli.infura.io/v3/84330bdc5a624089829c23279795fb58"
);
const web3 = new Web3(provider);

const deploy = async () => {

  try {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    compiledNFTFactory.nft.MyToken.abi
  )
    .deploy({ data: compiledNFTFactory.nft.MyToken.evm.bytecode.object})
    .send({ gas: '7000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
} catch(err) {
  console.log(err);
}
};
deploy();
