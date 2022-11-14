require("@nomiclabs/hardhat-waffle");

const { privateKey } = require("./secrets.json");

require("./tasks/openBox");

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/-jUOGC1hqhrhXlUV4MbxdOMR02K22Iev`,
      accounts: [privateKey],
    },
    testnet: {
      url: "https://bsc-testnet.public.blastapi.io",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [privateKey],
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [privateKey],
    },
  },
};
