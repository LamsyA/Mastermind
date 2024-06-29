import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const LINEASCAN_API_KEY = vars.get("LINEASCAN_API_KEY");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 1000,
    //   },
    // },
  },
  etherscan: {
    apiKey: {
      linea: LINEASCAN_API_KEY,
    },
    customChains: [
      {
        network: "linea",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/address",
        },
      },
    ],
  },
  networks: {
    linea: {
      url: INFURA_API_KEY,
      accounts: [PRIVATE_KEY],
      gasPrice: 200000000,
    },
  },

  paths: {
    artifacts: "./src/abis",
  },
};
export default config;
