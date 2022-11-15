# BSC NFT POC

This repository contains a sample project that you can use as the starting point
for your Ethereum project. It's also a great fit for learning the basics of
smart contract development.


## Quick start

The first things you need to do are clone this repository and install its
dependencies:

```sh
git clone https://github.com/WhiteMatrixTech/planet.git
cd planet
yarn install
```

Once installed,set your bsc testnet account privateKey in secrets.example.json:

```json
{
  "privateKey": "YOUR_PRIVATE_BSC_TESTNET_ACCOUNT_KEY"
}
```

*Don't share your private key with anyone, otherwise you may lose all of your cryptos.*

Then, change the file name from **secrets.example.json**  to **secrets.json**;

let's run Hardhat's unit test:

```sh
yarn test
```

Then, go to the repository's root folder and run this to deploy your contract:

```sh
yarn deploy:testnet
```

Finally, we can run the frontend with:

```sh
yarn start:webapp
```

## What’s Included?

Your environment will have everything you need to build a Dapp powered by Hardhat and React.

- [Hardhat](https://hardhat.org/): An Ethereum development task runner and testing network.
- [Mocha](https://mochajs.org/): A JavaScript test runner.
- [Chai](https://www.chaijs.com/): A JavaScript assertion library.
- [ethers.js](https://docs.ethers.io/v5/): A JavaScript library for interacting with Ethereum.
- [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.
- [A sample frontend/Dapp](./frontend): A Dapp which uses [Create React App](https://github.com/facebook/create-react-app).

**Happy _buidling_!**
