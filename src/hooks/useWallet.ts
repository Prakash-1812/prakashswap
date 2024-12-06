import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    provider: null,
    signer: null,
  });

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      
      setWallet({
        address: accounts[0],
        isConnected: true,
        provider,
        signer,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      provider: null,
      signer: null,
    });
  }, []);

  return { wallet, connect, disconnect };
}