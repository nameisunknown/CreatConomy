const { expect } = require("chai");
// const { loadFixture } = require('ethereum-waffle');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

function convertToWei(val) {
  return ethers.utils.parseEther(val.toString());
}

function convertFromWeiToEther(val) {
  return ethers.utils.formatEther(val);
}

describe("Nft Auction Contract", function () {
  async function globalStateRequired() {
    const name = "Doodle NFT";
    const price = convertToWei(1.5);
    const descr = "Doodle for all";
    const img = "https://ipfs.io/ipfs/Yubgtyk89jhyt5";
    const metadata1 =
      "https://ipfs.io/ipfs/QmY3p6rUBSyyCCg4Gp35aCX2HGPUSyR2EcnUTrsrhK4si4";

    const Contract = await ethers.getContractFactory("NftAuction");
    const contract = await Contract.deploy();
    const [seller, buyer, reseller, bidder] = await ethers.getSigners();

    return {
      name,
      price,
      descr,
      img,
      metadata1,
      contract,
      seller,
      buyer,
      reseller,
      bidder,
    };
  }

  describe("Contract Deployment", async function () {
    const [contract, seller, buyer, reseller, bidder, name, price, descr, img] =
      loadFixture(globalStateRequired);

    await contract.createAuction(name, descr, img, metadata1, price, {
      from: seller.address,
      value: toWei(0.02),
    });

    await contract
        .connect(reseller)
        .createAuction(name, description, image, metadata2, price, {
          value: toWei(0.02),
    })

    it('Should confirm NFT Auction Price Change', async () => {
      result = await contract.getAuction(tokenId)
      expect(result.price).to.be.equal(price)

      await contract.changePrice(tokenId, newPrice)

      result = await contract.getAuction(tokenId)
      expect(result.price).to.be.equal(newPrice)
    })
  });
});
