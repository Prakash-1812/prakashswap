import React, { useState, useEffect } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { TokenInput } from './TokenInput';
import { WalletButton } from './WalletButton';
import { useWallet } from '../hooks/useWallet';
import { useTokenSwap } from '../hooks/useTokenSwap';
import { TOKENS } from '../config/tokens';

export const TokenSwap: React.FC = () => {
  const { wallet, connect, disconnect } = useWallet();
  const { getSwapAmount, executeSwap, isLoading, error } = useTokenSwap(wallet);
  
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);

  useEffect(() => {
    const updateToAmount = async () => {
      if (fromAmount && fromAmount !== '0') {
        const amount = await getSwapAmount(fromToken, toToken, fromAmount);
        setToAmount(amount);
      } else {
        setToAmount('');
      }
    };

    updateToAmount();
  }, [fromAmount, fromToken, toToken, getSwapAmount]);

  const handleSwap = async () => {
    if (!wallet.isConnected || !fromAmount) return;
    
    try {
      const txHash = await executeSwap(fromToken, toToken, fromAmount, slippage);
      console.log('Swap successful:', txHash);
      // Reset amounts after successful swap
      setFromAmount('');
      setToAmount('');
    } catch (err) {
      console.error('Swap failed:', err);
    }
  };

  const handleTokenSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-900/50 rounded-2xl backdrop-blur-xl border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Swap Tokens</h2>
        <WalletButton
          wallet={wallet}
          onConnect={connect}
          onDisconnect={disconnect}
        />
      </div>

      <div className="space-y-2">
        <TokenInput
          label="From"
          value={fromAmount}
          onChange={setFromAmount}
          token={fromToken}
          onTokenSelect={setFromToken}
          tokens={Object.keys(TOKENS)}
        />
        
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleTokenSwitch}
          >
            <ArrowDownCircle size={24} className="text-white" />
          </button>
        </div>

        <TokenInput
          label="To (estimated)"
          value={toAmount}
          onChange={setToAmount}
          token={toToken}
          onTokenSelect={setToToken}
          tokens={Object.keys(TOKENS)}
          disabled
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="p-3 rounded-lg bg-white/5">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Slippage Tolerance</span>
            <span>{slippage}%</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      <button
        onClick={handleSwap}
        disabled={!wallet.isConnected || isLoading || !fromAmount || fromAmount === '0'}
        className="w-full mt-4 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!wallet.isConnected
          ? 'Connect Wallet to Swap'
          : isLoading
          ? 'Swapping...'
          : 'Swap Tokens'}
      </button>
    </div>
  );
};