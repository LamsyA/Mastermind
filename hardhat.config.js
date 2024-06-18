require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { PRIVATE_KEY, INFURA_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
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
