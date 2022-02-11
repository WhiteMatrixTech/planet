require("@nomiclabs/hardhat-waffle");

const { mnemonic } = require('./secrets.json');
// 0x3322db6130Cd3b48304cF08C51C8292a42709971


require("./tasks/openBox");

module.exports = {
  solidity: "0.8.4",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
};
