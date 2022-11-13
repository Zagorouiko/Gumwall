const IpfsClient = require('ipfs-http-client');

const projectId = "2HT7CiNcLyEDH633lVKiQsnMo8B";
const projectSecret = "ebe87325f3aa33b083b9722ea463903e";

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const Client = IpfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export default Client;
