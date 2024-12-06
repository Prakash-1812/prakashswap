import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DeFiSwap", function () {
  let defiSwap: Contract;
  let token1: Contract;
  let token2: Contract;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockERC20");
    token1 = await Token.deploy("Token1", "TK1");
    token2 = await Token.deploy("Token2", "TK2");

    const DeFiSwap = await ethers.getContractFactory("DeFiSwap");
    defiSwap = await DeFiSwap.deploy();
  });

  describe("Liquidity", function () {
    it("Should add liquidity correctly", async function () {
      const amount1 = ethers.parseEther("100");
      const amount2 = ethers.parseEther("100");

      await token1.approve(defiSwap.getAddress(), amount1);
      await token2.approve(defiSwap.getAddress(), amount2);

      await defiSwap.addLiquidity(
        await token1.getAddress(),
        await token2.getAddress(),
        amount1,
        amount2
      );

      const pool1 = await defiSwap.liquidityPools(
        await token1.getAddress(),
        await token2.getAddress()
      );
      const pool2 = await defiSwap.liquidityPools(
        await token2.getAddress(),
        await token1.getAddress()
      );

      expect(pool1).to.equal(amount1);
      expect(pool2).to.equal(amount2);
    });
  });

  describe("Swapping", function () {
    beforeEach(async function () {
      const amount1 = ethers.parseEther("1000");
      const amount2 = ethers.parseEther("1000");

      await token1.approve(defiSwap.getAddress(), amount1);
      await token2.approve(defiSwap.getAddress(), amount2);

      await defiSwap.addLiquidity(
        await token1.getAddress(),
        await token2.getAddress(),
        amount1,
        amount2
      );
    });

    it("Should swap tokens correctly", async function () {
      const swapAmount = ethers.parseEther("10");
      await token1.transfer(user.address, swapAmount);
      
      await token1.connect(user).approve(defiSwap.getAddress(), swapAmount);
      
      const balanceBefore = await token2.balanceOf(user.address);
      
      await defiSwap.connect(user).swap(
        await token1.getAddress(),
        await token2.getAddress(),
        swapAmount
      );
      
      const balanceAfter = await token2.balanceOf(user.address);
      expect(balanceAfter).to.be.gt(balanceBefore);
    });
  });
});