require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// setup hardhat to enable local/dev/prod connections

const INFURA_PROJ_ID = process.env.INFURA_PROJ_ID
const privateKey = process.env.WALLET_PRIVATE_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
      // don't need accounts
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_PROJ_ID}`,
      accounts: [privateKey] // use this wallet to connect to API
    },
    mainnet: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_PROJ_ID}`,
      accounts: [privateKey] // use this wallet to connect to API
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
