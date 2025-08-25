/// Import required classes and functions from ethers.js
import {
  BrowserProvider,
  Contract,
  Interface,
  JsonRpcProvider,
  JsonRpcSigner,
  Wallet,
} from 'ethers';

import { handleErrors } from '@/utils/error';

/// Import compiled ABI and type bindings for SettleyTicket
import ticketObj from '../artifacts/contracts/Ticket.sol/SettleyTicket.json';
import { SettleyTicket, SettleyTicket__factory } from '../typechain-types';

/// Minimal ERC20 ABI for approval and balance checks
const erc20Abi = [
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
];

/// @notice Interface representing a token that has been minted
interface MintedToken {
  tokenId: bigint;
  recipient: string;
  amount: bigint;
  tokenURI: string;
  stableCoin: string;
  stableAmount: bigint;
  blockNumber: bigint;
}

/// @notice Interface for TokenMinted event structure
// interface TokenMintedEvent {
//   eventName: 'TokenMinted';
//   args: {
//     tokenId: bigint;
//     recipient: string;
//     amount: bigint;
//     tokenURI: string;
//     stableCoin: string;
//     stableAmount: bigint;
//     blockNumber: bigint;
//   };
//   transactionHash: string;
//   blockNumber: bigint;
// }

/**
 * @title SettleyTicketer
 * @notice A wrapper class for interacting with the SettleyTicket smart contract for reading, minting and admin functions
 */
export class SettleyTicketer {
  private provider: JsonRpcProvider | BrowserProvider;
  private signer?: Wallet | JsonRpcSigner;
  private contractRead: SettleyTicket;
  private contractWrite: SettleyTicket;

  /**
   * @param rpcUrl RPC endpoint to connect to (for Node.js usage)
   * @param ticketAddress Address of the deployed SettleyTicket contract
   * @param privateKey Optional private key for backend use
   */
  constructor(rpcUrl: string, ticketAddress: string, privateKey?: string) {
    if (typeof window !== 'undefined' && window.ethereum && !privateKey) {
      this.provider = new BrowserProvider(window.ethereum);
      this.initializeBrowserSigner();
    } else {
      this.provider = new JsonRpcProvider(rpcUrl);
      if (privateKey) {
        this.signer = new Wallet(privateKey, this.provider);
      }
    }

    this.contractRead = SettleyTicket__factory.connect(
      ticketAddress,
      this.provider
    );
    this.contractWrite = SettleyTicket__factory.connect(
      ticketAddress,
      this.signer
    );
  }

  /// @notice Initializes the signer from MetaMask in the browser
  private async initializeBrowserSigner() {
    if (this.provider instanceof BrowserProvider) {
      try {
        await this.provider.send('eth_requestAccounts', []);
        this.signer = await this.provider.getSigner();
        this.contractWrite = this.contractWrite.connect(this.signer);
      } catch (error) {
        handleErrors(error);
        // console.warn('Failed to connect to browser wallet:', error);
      }
    }
  }

  /**
   * @notice Sets a stable token as accepted or not
   * @param tokenAddress Address of the ERC20 token
   * @param status True to accept, false to revoke
   * @return Transaction hash
   */
  async setAcceptableToken(
    tokenAddress: string,
    status = true
  ): Promise<string> {
    if (!this.signer) throw new Error('No signer available');
    const tx = await this.contractWrite.setAcceptedStable(tokenAddress, status);
    return tx.hash;
  }

  /**
   * @notice Sets the receiver wallet address
   * @param walletAddress The wallet address to receive funds
   * @return Transaction hash
   */
  async setReceiverWallet(walletAddress: string): Promise<string> {
    if (!this.signer) throw new Error('No signer available');
    const tx = await this.contractWrite.setReceiverWallet(walletAddress);
    return tx.hash;
  }

  /**
   * @notice Sets the base URI for all tokens
   * @param baseURI The new base URI string
   * @return Transaction hash
   */
  async setBaseURI(baseURI: string): Promise<string> {
    if (!this.signer) throw new Error('No signer available');
    const tx = await this.contractWrite.setBaseURI(baseURI);
    return tx.hash;
  }

  /// @notice Retrieves the base URI of the contract
  async getBaseURI(): Promise<string> {
    return await this.contractRead.getBaseURI();
  }

  /**
   * @notice Checks if a token is accepted as payment
   * @param tokenAddress The token contract address
   * @return True if accepted
   */
  async acceptedStables(tokenAddress: string): Promise<boolean> {
    return await this.contractRead.isTokenAccepted(tokenAddress);
  }

  /**
   * @notice Sets token cost for stablecoins with 6 decimal places (e.g., USDC)
   * @param costPerToken Token cost in smallest unit (e.g., 1e6 for $1 USDC)
   * @return Transaction hash
   */
  async setCostPerToken6Decimals(costPerToken: bigint): Promise<string> {
    if (!this.signer) throw new Error('No signer available');
    const tx = await this.contractWrite.setCostPerTokenFor6Decimals(
      costPerToken
    );
    return tx.hash;
  }

  /**
   * @notice Sets token cost for stablecoins with 18 decimal places (e.g., DAI)
   * @param costPerToken Token cost in smallest unit (e.g., 1e18 for $1 DAI)
   * @return Transaction hash
   */
  async setCostPerToken18Decimals(costPerToken: bigint): Promise<string> {
    if (!this.signer) throw new Error('No signer available');
    const tx = await this.contractWrite.setCostPerTokenFor18Decimals(
      costPerToken
    );
    return tx.hash;
  }

  /// @notice Retrieves all token purchases across the contract
  async getAllPurchases(): Promise<MintedToken[]> {
    const mintedTokens: MintedToken[] = [];

    try {
      const fromBlockBigInt = await this.contractRead.startingBlock();
      const fromBlock = Number(fromBlockBigInt);
      const filter = this.contractRead.filters.TokenMinted();
      const events = await this.contractRead.queryFilter(filter, fromBlock);

      for (const event of events) {
        if (event.args) {
          mintedTokens.push({
            tokenId: event.args.tokenId,
            recipient: event.args.recipient,
            amount: event.args.amount,
            tokenURI: event.args.tokenURI,
            stableCoin: event.args.stableCoin,
            stableAmount: event.args.stableAmount,
            blockNumber: event.args.blockNumber,
          });
        }
      }
    } catch (error) {
      handleErrors(error);
      // console.error('Error getting all purchases:', error);
      throw error;
    }

    return mintedTokens;
  }

  /**
   * @notice Gets all tokens minted by a specific user
   * @param user Wallet address of the user
   * @return Array of MintedToken objects
   */
  async getAllPurchasesFromUser(user: string): Promise<MintedToken[]> {
    const allPurchases = await this.getAllPurchases();
    return allPurchases.filter(
      (p) => p.recipient.toLowerCase() === user.toLowerCase()
    );
  }

  /**
   * @notice Estimate total cost for a number of tickets in a specific stablecoin
   * @param numberOfTickets How many tickets to buy
   * @param stableCoinAddress Address of the stablecoin
   * @return Total cost as bigint
   */
  async estimateAmountDue(
    numberOfTickets: number,
    stableCoinAddress: string
  ): Promise<bigint> {
    return await this.contractRead.estimateTotalCost(
      stableCoinAddress,
      numberOfTickets
    );
  }

  /**
   * @notice Mints ticket NFTs using an accepted stablecoin
   * @param numberOfTickets Number of tickets to mint
   * @param stableCoinAddress Address of the ERC20 stablecoin
   * @return [Token ID, transaction hash]
   */
  async mintToken(
    numberOfTickets: number,
    tokenURI: string,
    stableCoinAddress: string
  ): Promise<[bigint, string]> {
    if (!this.signer) throw new Error('No signer available');

    const amountDue = await this.estimateAmountDue(
      numberOfTickets,
      stableCoinAddress
    );

    try {
      // Approve stablecoin spending
      const tokenContract = new Contract(
        stableCoinAddress,
        erc20Abi,
        this.signer
      );
      const approveTx = await tokenContract.approve(
        await this.contractRead.getAddress(),
        amountDue
      );
      await approveTx.wait(1);
    } catch (error) {
      handleErrors(error);
      // throw new Error('Error approving token:');
      throw error;
    }

    let tokenId: bigint;
    let hash: string;

    try {
      const mintTx = await this.contractWrite.mint(
        numberOfTickets,
        tokenURI,
        stableCoinAddress
      );
      hash = mintTx.hash;
      const receipt = await mintTx.wait(1);

      if (receipt && receipt.logs) {
        const iface = new Interface(ticketObj.abi);
        for (const log of receipt.logs) {
          try {
            const parsed = iface.parseLog({
              topics: log.topics,
              data: log.data,
            });
            if (parsed && parsed.name === 'TokenMinted') {
              tokenId = parsed.args.tokenId;
              break;
            }
          } catch {
            continue;
          }
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (!tokenId!)
        throw new Error(
          'Could not find TokenMinted event in transaction receipt'
        );
    } catch (error) {
      handleErrors(error);
      // console.error('Error minting token: ', error);
      throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return [tokenId!, hash];
  }

  /// @notice Returns the connected wallet's address (if any)
  async getSignerAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }

  /// @notice Checks if a wallet is currently connected
  isWalletConnected(): boolean {
    return !!this.signer;
  }

  /// @notice Prompts MetaMask or browser wallet to connect
  async connectWallet(): Promise<void> {
    if (
      typeof window !== 'undefined' &&
      window.ethereum &&
      this.provider instanceof BrowserProvider
    ) {
      await this.initializeBrowserSigner();
    } else {
      throw new Error('Browser wallet not available');
    }
  }
}
