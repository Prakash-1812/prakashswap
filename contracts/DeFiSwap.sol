// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeFiSwap is ReentrancyGuard, Ownable {
    mapping(address => mapping(address => uint256)) public liquidityPools;
    mapping(address => mapping(address => uint256)) public reserves;
    
    event LiquidityAdded(
        address indexed provider,
        address indexed tokenA,
        address indexed tokenB,
        uint256 amountA,
        uint256 amountB
    );
    
    event Swap(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    constructor() Ownable(msg.sender) {}

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    ) external nonReentrant {
        require(tokenA != tokenB, "Identical tokens");
        require(amountA > 0 && amountB > 0, "Zero amounts");

        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        liquidityPools[tokenA][tokenB] += amountA;
        liquidityPools[tokenB][tokenA] += amountB;
        reserves[tokenA][tokenB] = amountA;
        reserves[tokenB][tokenA] = amountB;

        emit LiquidityAdded(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external nonReentrant returns (uint256 amountOut) {
        require(tokenIn != tokenOut, "Identical tokens");
        require(amountIn > 0, "Zero amount");
        require(
            liquidityPools[tokenIn][tokenOut] > 0,
            "Insufficient liquidity"
        );

        uint256 reserveIn = reserves[tokenIn][tokenOut];
        uint256 reserveOut = reserves[tokenOut][tokenIn];
        
        // Calculate amount out using constant product formula
        amountOut = (amountIn * reserveOut) / (reserveIn + amountIn);
        require(amountOut > 0, "Insufficient output amount");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        reserves[tokenIn][tokenOut] = reserveIn + amountIn;
        reserves[tokenOut][tokenIn] = reserveOut - amountOut;

        emit Swap(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }

    function getSwapAmount(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256) {
        require(tokenIn != tokenOut, "Identical tokens");
        require(amountIn > 0, "Zero amount");
        require(
            liquidityPools[tokenIn][tokenOut] > 0,
            "Insufficient liquidity"
        );

        uint256 reserveIn = reserves[tokenIn][tokenOut];
        uint256 reserveOut = reserves[tokenOut][tokenIn];
        
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
}