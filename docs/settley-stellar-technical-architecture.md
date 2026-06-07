# Settley Proposed Stellar Technical Architecture

## 1. Current State

Settley has not yet built or deployed on Stellar.

The current work is a research-backed and product-backed foundation for conditional liquidity infrastructure: the Settley papers, pitch materials, product surfaces, and repository history show the problem framing, user flows, and early platform direction. The Stellar work described below is the architecture Settley proposes to build with SCF / Stellar x CV Labs support.

This document should be read as the technical architecture for the product layer to be added: a Stellar-native conditional liquidity layer for tokenized real-world assets, beginning with tokenized real estate.

## 2. Product to Be Added on Stellar

Settley will add a Stellar-native system that lets compliant holders of tokenized real-estate interests request conditional exit liquidity from an asset-specific vault. Users should not need to understand Stellar wallet mechanics to use the product; Settley will abstract wallet stress while using Stellar infrastructure underneath.

The MVP wedge is intentionally narrow:

- one asset or controlled asset cohort;
- one compliance-gated asset-token flow;
- one asset-specific liquidity vault;
- one embedded or abstracted Stellar wallet path;
- one stablecoin settlement path;
- one end-to-end user journey from embedded wallet access to exit quote to testnet settlement.

Ownership-backed credit, Blend integration, and broader secondary-market routing are future extensions. The first build proves the core sell-to-vault liquidity mechanism.

## 3. Why Stellar

Settley is designed for regulated real-world asset workflows where payments, compliance, settlement, and user access matter as much as token issuance. Stellar is a strong fit because it provides:

- low-cost settlement for high-frequency operational actions;
- stablecoin rails for subscriptions, distributions, and vault payouts;
- Soroban smart contracts for asset-specific financial logic;
- wallet tooling suitable for user-facing onboarding;
- an ecosystem focused on payments, tokenization, and real-world utility.

The Stellar implementation will not be a cosmetic chain port. It will use Stellar for embedded or abstracted wallet onboarding, Soroban execution, stablecoin settlement, and auditable asset-specific contract events.

## 4. Stellar Components to Build

### 4.1 Embedded / Abstracted Stellar Wallet Integration

Purpose: let investors, LPs, and admins use Stellar-backed asset and settlement flows without forcing them to manage wallet complexity as a first-class product burden.

Likely integration path:

- embedded wallet or wallet-abstraction provider compatible with Stellar user flows;
- Stellar Wallets Kit and/or Freighter support for advanced users, admins, testing, and direct wallet paths;
- wallet creation, linking, recovery, and session state inside the Settley frontend;
- signed Soroban transactions for asset, vault, and compliance actions;
- transaction status, failure messages, and hash display in the UI.

Completion criteria:

- user can access a Stellar-backed account through an embedded or abstracted wallet flow;
- app can detect the underlying wallet address and network;
- user can approve or initiate a testnet transaction without needing to understand raw wallet operations;
- advanced users and admins can use direct wallet connection where appropriate;
- transaction history is visible in the Settley interface.

### 4.2 Asset Registry Contract on Soroban

Purpose: register each supported tokenized asset or asset cohort.

Stores:

- asset ID;
- legal-wrapper metadata hash;
- property/SPV metadata hash;
- associated asset-token contract;
- NAV oracle reference;
- liquidity vault reference;
- lifecycle status: proposed, active, paused, wind-down, closed.

Completion criteria:

- deploy registry contract to Stellar testnet;
- create, update, pause, and close asset records;
- emit auditable events for privileged changes;
- expose asset state to the admin console and user dashboard.

### 4.3 Compliance Credential Contract on Soroban

Purpose: gate regulated asset actions without putting private KYC documents on-chain.

Stores minimal eligibility state:

- wallet address;
- KYC tier;
- jurisdiction;
- suitability or accreditation flag where applicable;
- sanctions status;
- expiry;
- revocation status.

Used by:

- asset-token minting;
- peer transfer where enabled;
- vault exit requests;
- LP vault deposits;
- distribution claims.

Completion criteria:

- issue and revoke credentials on testnet;
- reject invalid or revoked wallets from restricted actions;
- expose compliance status to the app without exposing underlying KYC files.

### 4.4 Asset Token Contract on Soroban

Purpose: represent the economic interest in a specific tokenized asset or controlled asset cohort.

Capabilities:

- mint to eligible wallets;
- restrict transfers to compliant wallets;
- escrow or burn tokens during a vault exit;
- expose balances for portfolio, distribution, and quote logic.

Completion criteria:

- deploy asset-token contract to Stellar testnet;
- test minting, restricted transfers, blocked transfers, and exit-related escrow/burn;
- connect token balances to the Settley frontend.

### 4.5 NAV Oracle Contract on Soroban

Purpose: publish controlled asset valuation data used by quote logic.

Stores:

- current NAV;
- last update timestamp;
- authorized signer;
- ordinary update bounds;
- stale valuation flag;
- emergency impairment state.

Completion criteria:

- publish NAV updates on testnet;
- reject unauthorized updates;
- flag stale NAV;
- emit events for normal updates and emergency impairment updates.

### 4.6 Asset-Specific Liquidity Vault Contract on Soroban

Purpose: provide conditional sell-to-vault exit liquidity for a specific asset.

Core logic:

- LP deposits stablecoin capacity into an asset-specific vault;
- eligible holder requests an exit quote;
- quote is based on NAV minus discount factors;
- discount factors include base discount, vault utilization discount, and stale NAV discount;
- exit executes only if the vault has available capacity and compliance checks pass;
- vault state changes as utilization and risk conditions change.

Vault states:

- normal;
- stressed;
- circuit breaker;
- paused;
- wind-down.

Completion criteria:

- deploy vault contract to Stellar testnet;
- support LP deposit and holder exit quote;
- process a testnet exit from asset token into stablecoin payout;
- enforce reserve limits, utilization thresholds, and pause states.

### 4.7 Stellar Stablecoin Settlement

Purpose: settle vault payouts, subscriptions, and controlled test distributions over Stellar stablecoin rails.

Initial settlement scope:

- testnet stablecoin flow for vault deposit;
- testnet stablecoin flow for holder payout;
- admin-visible settlement status;
- event trail tying settlement to asset ID, vault ID, and wallet address.

Completion criteria:

- LP vault deposit settles on Stellar testnet;
- holder payout settles on Stellar testnet;
- settlement events are indexed for dashboard display.

### 4.8 Event Indexing and Admin Console

Purpose: connect existing Settley admin workflows to Stellar contract actions.

Admin workflows:

- create asset record;
- update asset metadata;
- issue or revoke compliance credential;
- push NAV update;
- monitor vault utilization;
- pause vault;
- view Stellar transaction hashes and contract events.

Completion criteria:

- admin can operate a full testnet asset lifecycle from the Settley app;
- contract events appear in the admin console;
- privileged actions show status, transaction hash, and failure messages.

## 5. End-to-End Data Flow

1. Admin creates an asset record in Settley.
2. Soroban asset registry stores asset metadata references.
3. Eligible user accesses a Stellar-backed wallet through Settley's embedded or abstracted wallet flow.
4. Admin or compliance service issues a minimal compliance credential.
5. User receives or purchases compliant asset tokens.
6. NAV oracle publishes verified valuation data.
7. LP deposits stablecoin into the asset-specific vault.
8. Holder requests an exit quote.
9. Vault checks compliance credential, NAV freshness, utilization, available capacity, and vault state.
10. If valid, asset tokens are escrowed or burned and the holder receives stablecoin payout.
11. Events are indexed for admin and user dashboards.

## 6. Four-Month Build Plan

### Month 1: Stellar Foundation

- Finalize Soroban contract specifications.
- Implement embedded or abstracted Stellar wallet flow in the Settley frontend.
- Build initial asset registry and compliance credential contracts.
- Deploy first contracts to Stellar testnet.

### Month 2: Asset and NAV Logic

- Implement asset-token contract.
- Implement NAV oracle contract.
- Connect token balance and NAV state to frontend/admin views.
- Run unit and integration tests for restricted asset flows.

### Month 3: Liquidity Vault and Settlement

- Implement asset-specific vault contract.
- Add stablecoin deposit and payout flows.
- Implement quote logic, utilization limits, pause states, and event emissions.
- Demonstrate end-to-end testnet exit from asset token to stablecoin payout.

### Month 4: Product Integration and Launch Readiness

- Connect admin console to all core contract actions.
- Index contract events into user/admin dashboards.
- Complete professional user testing.
- Prepare audit handoff materials.
- Publish developer documentation and controlled demo.

## 7. Security and Compliance Assumptions

- KYC files remain off-chain with regulated partners or internal systems.
- On-chain compliance credentials store only minimal eligibility state.
- Privileged operations use role-based controls and should move toward multi-sig administration before production launch.
- Mainnet readiness requires test coverage, peer review, and audit support.
- The product will not market guaranteed yield, guaranteed liquidity, or appreciation of XLM or any Stellar-based asset.

## 8. MVP Non-Goals

The four-month MVP will not:

- launch a public securities offering;
- promise universal liquidity;
- hold live property title on-chain;
- automate all legal enforcement;
- support unrestricted secondary trading;
- require Blend lending integration for the first build;
- require Soroswap or Aquarius routing for the first build;
- use SCF funds for marketing or promotion.

## 9. Relevant GitHub URL

Current organization:

https://github.com/monopoly-dao

Relevant existing repositories include product surfaces such as `monopoly-dapp`, `settley-admin`, and `settley-owner`. A dedicated Stellar/Soroban repository should be created once implementation begins so reviewers can track the grant-funded work separately from older product code.
