export const DEFI_SWAP_ADDRESS = '0x...'; // Contract address after deployment

export const DEFI_SWAP_ABI = [
  'function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB)',
  'function swap(address tokenIn, address tokenOut, uint256 amountIn) returns (uint256)',
  'function getSwapAmount(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)',
  'function liquidityPools(address, address) view returns (uint256)',
  'function reserves(address, address) view returns (uint256)',
] as const;

export const ERC20_ABI = [
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
] as const;