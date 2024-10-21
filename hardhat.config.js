require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('@nomicfoundation/hardhat-verify');

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [process.env.WALLET_KEY],
      gasPrice: 1000000000,
    },

    
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: process.env.PRIV_KEY,
    },
  },
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true
    },
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,  
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com"
      }
      }
    ]
},
sourcify: {
  enabled: false
}
}
