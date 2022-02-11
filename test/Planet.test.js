// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Planet contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Planet;
  let hardhatPlanet;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Planet = await ethers.getContractFactory("Planet");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    hardhatPlanet = await Planet.deploy();

    // We can interact with the contract by calling `hardhatToken.method()`
    await hardhatPlanet.deployed();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an assertion objet. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await hardhatPlanet.owner()).to.equal(owner.address);
    });
 
    it('test owner permission', async () => {
        await expect(hardhatPlanet.connect(addr1).setBaseURI('/')).revertedWith(
          'Ownable: caller is not the owner'
        );
      });
  });

  describe("Buys", function () {
    it("Any account can mint", async function () {
      // Addr1 by 2 nft
      await hardhatPlanet.connect(addr1).buy(2, { value: ethers.utils.parseEther("0.002")}) // here the value in wei
 
      const addr1Balance = await hardhatPlanet.balanceOf(
        addr1.address
      );
      expect(addr1Balance).to.equal(2);
      
      const ownerAddress = await hardhatPlanet.ownerOf(1);
      expect(ownerAddress).to.equal(addr1.address);
    });

    
    it("Should fail if sender doesn’t give enough moneys", async function () {
        await expect(hardhatPlanet.connect(addr1).buy(2, { value: ethers.utils.parseEther("0.001")})).revertedWith(
            'payment is less than token price'
          );
    });

    // ..... and more unit test
  });
});
