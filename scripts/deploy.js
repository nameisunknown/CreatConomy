const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const contrct = 'NftAuction';
  const royaltyFee = 5;
  const Contract = await ethers.getContractFactory(contrct)
  const contract = await Contract.deploy(royaltyFee);

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
