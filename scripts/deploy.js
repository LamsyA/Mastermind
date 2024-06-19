const hre = require("hardhat");

async function main() {
  const verifier = await hre.ethers.getContractFactory("Verification");
  const verification = await verifier.deploy();
  await verification.deployed();
  console.log(`Verifier deployed to ${verification.address}`);

  const PrimeAssets = await hre.ethers.getContractFactory("PrimeAssets");
  const primeAssets = await PrimeAssets.deploy(verification.address);

  await primeAssets.deployed();

  console.log(`PrimeAssets deployed to ${primeAssets.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
