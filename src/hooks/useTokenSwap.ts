import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { TOKENS } from '../config/tokens';
import { DEFI_SWAP_ADDRESS, DEFI_SWAP_ABI, ERC20_ABI } from '../config/contracts';
import { WalletState } from './useWallet';

export function useTokenSwap(wallet: WalletState) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSwapAmount = useCallback(async (
    fromToken: string,
    toToken: string,
    amount: string
  ) => {
    if (!wallet.provider || !amount) return '0';

    try {
      const contract = new ethers.Contract(
        DEFI_SWAP_ADDRESS,
        DEFI_SWAP_ABI,
        wallet.provider
      );

      const amountIn = ethers.parseUnits(amount, TOKENS[fromToken].decimals);
      const amountOut = await contract.getSwapAmount(
        TOKENS[fromToken].address,
        TOKENS[toToken].address,
        amountIn
      );
      
      return ethers.formatUnits(amountOut, TOKENS[toToken].decimals);
    } catch (err) {
      console.error('Error getting swap amount:', err);
      return '0';
    }
  }, [wallet.provider]);

  const executeSwap = useCallback(async (
    fromToken: string,
    toToken: string,
    amount: string,
    slippage: number = 0.5
  ) => {
    if (!wallet.signer || !amount) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const contract = new ethers.Contract(
        DEFI_SWAP_ADDRESS,
        DEFI_SWAP_ABI,
        wallet.signer
      );

      const amountIn = ethers.parseUnits(amount, TOKENS[fromToken].decimals);
      
      // Approve token spending if needed
      if (fromToken !== 'ETH') {
        const tokenContract = new ethers.Contract(
          TOKENS[fromToken].address,
          ERC20_ABI,
          wallet.signer
        );

        const allowance = await tokenContract.allowance(wallet.address, DEFI_SWAP_ADDRESS);
        if (allowance.lt(amountIn)) {
          const approveTx = await tokenContract.approve(DEFI_SWAP_ADDRESS, amountIn);
          await approveTx.wait();
        }
      }

      // Execute swap
      const tx = await contract.swap(
        TOKENS[fromToken].address,
        TOKENS[toToken].address,
        amountIn
      );

      await tx.wait();
      return tx.hash;
    } catch (err: any) {
      console.error('Swap failed:', err);
      setError(err.message || 'Swap failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [wallet]);

  return {
    getSwapAmount,
    executeSwap,
    isLoading,
    error
  };
}