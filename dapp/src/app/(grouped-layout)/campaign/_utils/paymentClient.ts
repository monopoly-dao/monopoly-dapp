// client.ts

import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { hardhat } from 'viem/chains';
import 'viem/window';

export async function ConnectWalletClient() {
  // Check for window.ethereum
  // let transport;
  if (window.ethereum) {
    // transport = custom(window.ethereum);
  } else {
    const errorMessage =
      'MetaMask or another web3 wallet is not installed. Please install one to proceed.';
    throw new Error(errorMessage);
  }

  // console.log(window.ethereum, transport);

  // Delcalre a Wallet Client
  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http(),
  });
  // console.log({ walletClient });

  return walletClient;
}

export function ConnectPublicClient() {
  // Check for window.ethereum
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    const errorMessage =
      'MetaMask or another web3 wallet is not installed. Please install one to proceed.';
    throw new Error(errorMessage);
  }

  // Delcare a Public Client
  const publicClient = createPublicClient({
    chain: hardhat,
    transport: transport,
  });

  return publicClient;
}
