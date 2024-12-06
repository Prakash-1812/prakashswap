import { ethers } from "hardhat";

async function main() {
  const DeFiSwap = await ethers.getContractFactory("DeFiSwap");
  const defiSwap = await DeFiSwap.deploy();
  await defiSwap.waitForDeployment();

  console.log("DeFiSwap deployed to:", await defiSwap.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });