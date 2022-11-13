const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
const { readFileSync } = require('fs');

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const nftPath = path.resolve(__dirname, "contracts", "nft.sol");
const source = fs.readFileSync(nftPath, "utf8");

var input = {
   language: "Solidity",
   sources: {
     "nft": {
       content: readFileSync(nftPath, 'utf-8')
     }
   },
   settings: {
     outputSelection: {
       "*": {
         "*": [ "abi", "evm.bytecode" ]
       }
     }
   }
};

function findImports(relativePath) {
  //my imported sources are stored under the node_modules folder!
  const absolutePath = path.resolve(__dirname, relativePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  return { contents: source };
}

var output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
