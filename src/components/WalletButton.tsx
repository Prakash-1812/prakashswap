import React from 'react';
import { Wallet2 } from 'lucide-react';
import { WalletState } from '../hooks/useWallet';

interface WalletButtonProps {
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  wallet,
  onConnect,
  onDisconnect,
}) => {
  const formatAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <button
      onClick={wallet.isConnected ? onDisconnect : onConnect}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
    >
      <Wallet2 size={18} />
      {wallet.isConnected ? formatAddress(wallet.address!) : 'Connect Wallet'}
    </button>
  );
}