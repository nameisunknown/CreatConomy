const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

function convertToWei(val) {
  return ethers.utils.parseEther(val.toString());
}

function convertFromWeiToEther(val) {
  return ethers.utils.formatEther(val);
}

describe("Nft Auction Contract", function () {
  // This is a global state that I'm setting up here
  async function globalStateRequired() {
    const name = "Doodle NFT";
    const price = convertToWei(1.5);
    const listingPrice = convertToWei(0.02);
    const royaltyFee = 5;
    const descr = "Doodle for all";
    const img = "https://ipfs.io/ipfs/Yubgtyk89jhyt5";
    const metadata1 =
      "https://ipfs.io/ipfs/QmY3p6rUBSyyCCg4Gp35aCX2HGPUSyR2EcnUTrsrhK4si4"; // tokenURI
    const metadata2 =
      "https://ipfs.io/ipfs/QmY3p6rUBSyyCCg4Gp35aCX2HGPUSyR2EcnUTrsrhK4si5"; // tokenURI for second auction

    // I'm deploying the contract here
    const Contract = await ethers.getContractFactory("NftAuction");
    const contract = await Contract.deploy(royaltyFee);
    const [seller, buyer, reseller, bidder] = await ethers.getSigners();

    return {
      name,
      price,
      descr,
      img,
      metadata1,
      metadata2,
      contract,
      seller,
      buyer,
      reseller,
      bidder,
      royaltyFee,
      listingPrice,
    };
  }

  describe("Contract Deployment", function () {
    // This is basically a hook to help me set up the fixture before each test
    // is carried out, so it does this before each of the test
    beforeEach(async function () {
      this.state = await loadFixture(globalStateRequired);

      // I'm creating an auction using seller address
      await this.state.contract.createAuction(
        this.state.name,
        this.state.descr,
        this.state.img,
        this.state.metadata1,
        this.state.price,
        {
          from: this.state.seller.address,
          value: this.state.listingPrice,
        }
      );

      // In here, I'm trying to create another auction using reseller address
      await this.state.contract
        .connect(this.state.reseller)
        .createAuction(
          this.state.name,
          this.state.descr,
          this.state.img,
          this.state.metadata2,
          this.state.price,
          {
            value: this.state.listingPrice,
          }
        );
    });

    it("should check for the initial price listing", async function () {
      const { contract, price } = this.state;

      // Assuming tokenId = 1 for the first auction
      const tokenId = 1;

      // I'm checking the initial price
      let result = await contract.getAuction(tokenId);
      expect(result.price).to.be.equal(price);
    });

    it("should confirm NFT auction price change", async function () {
      const { contract, price } = this.state;

      // Assuming tokenId = 1 for the first auction
      const tokenId = 1;
      const newPrice = convertToWei(2);

      // I'm checking the initial price
      let result = await contract.getAuction(tokenId);
      // expect(result.price).to.be.equal(price);

      // I'm changing the price here
      await contract.changePrice(tokenId, newPrice);

      // In here, I'm checking for the new price
      result = await contract.getAuction(tokenId);
      expect(result.price).to.be.equal(newPrice);
    });

    it("should confirm NFT auction listing", async function () {
      const { contract, price } = this.state;
      let result = await contract.getAllAuctions();
      expect(result).to.have.lengthOf(2);
    });
  });
});