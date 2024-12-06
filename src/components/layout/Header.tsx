import React from 'react';
import { Coins } from 'lucide-react';
import { WalletButton } from '../WalletButton';
import { useWallet } from '../../hooks/useWallet';

export const Header: React.FC = () => {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="flex items-center gap-2">
        <Coins size={24} className="text-blue-400" />
        <span className="text-xl font-bold text-white">DeFi Swap</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Swap</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pool</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Farm</a>
        </div>
        <WalletButton wallet={wallet} onConnect={connect} onDisconnect={disconnect} />
      </div>
    </nav>
  );
};