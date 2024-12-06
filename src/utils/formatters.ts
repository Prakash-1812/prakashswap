import { ethers } from 'ethers';
import { Token } from './tokens';

export const formatTokenAmount = (amount: string, token: Token): string => {
  return ethers.formatUnits(amount, token.decimals);
};

export const parseTokenAmount = (amount: string, token: Token): ethers.BigNumber => {
  return ethers.parseUnits(amount, token.decimals);
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};