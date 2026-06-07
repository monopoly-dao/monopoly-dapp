# Settley Proposed Stellar Technical Architecture

## 1. Current State

Settley has not yet built or deployed on Stellar.

The current work is a research-backed and product-backed foundation for conditional liquidity infrastructure: the Settley papers, pitch materials, product surfaces, and repository history show the problem framing, user flows, and early platform direction. The Stellar work described below is the architecture Settley proposes to build with SCF / Stellar x CV Labs support.

This document should be read as the technical architecture for the product layer to be added: a Stellar-native conditional liquidity layer for tokenized real-world assets, beginning with tokenized real estate.

## 2. Product to Be Added on Stellar

Settley will add a Stellar-native system that lets compliant asset owners tokenize an asset, create an asset-specific lending vault alongside it, and request controlled liquidity against pledged ownership tokens. Users should not need to understand Stellar wallet mechanics to use the product; Settley will abstract wallet stress while using Stellar infrastructure underneath.

The MVP wedge is intentionally narrow:

- one asset or controlled asset cohort;
- one compliance-gated asset-token flow;
- one asset-specific lending vault;
- one controlled loan request for up to 30% of eligible asset value;
- one embedded or abstracted Stellar wallet path;
- one stablecoin settlement path;
- one end-to-end user journey from tokenization to loan request, LP funding, stablecoin disbursement, repayment, and collateral enforcement path.

The first Stellar build validates the lending path because Blend v2 gives Settley a clearer Stellar-native integration route for collateral, borrowing, repayment, and liquidity flows. Sell-to-vault exits remain part of Settley's broader conditional liquidity thesis, but the first Stellar MVP focuses on asset-specific loan vaults.

## 3. SCF Integration Track Fit

This proposal is intended for the SCF Build Integration Track because Settley is an existing product direction with off-chain/product work already underway, and the funded work is to integrate existing Stellar ecosystem building blocks into Settley's real-world asset liquidity workflow.

Selected Integration List building blocks:

- Blend v2: primary DeFi lending integration for controlled ownership-backed liquidity and asset-specific loan vaults.
- DFNS: primary embedded wallet / Wallets-as-a-Service path for abstracted user onboarding, wallet management, and recovery.
- Stellar Wallets Kit: direct wallet connection layer for admin, testing, and advanced user flows.
- Freighter Connect: SDF-maintained browser wallet fallback for Soroban token interaction, QA, and reviewer-verifiable testnet flows.
- Bridge: stablecoin treasury and payment movement layer for loan disbursement and repayment workflows where applicable.

Soroban smart contracts are the application-specific layer that coordinates asset registry, compliance, token, NAV, loan request terms, asset-specific vault state, collateral eligibility, repayment, and enforcement logic around these integrations. The Integration Track budget should therefore be framed around these integrations plus the connective Soroban/backend/frontend work required to make them usable in Settley's product.

Not selected for MVP:

- Soroswap, Aquarius, and Stellar Broker: excluded from the first build because the MVP does not require open-market swap routing or speculative trading.
- SDP: excluded from the first build because the initial payout workflow is controlled loan settlement, not bulk payroll or mass-disbursement operations.
- Sell-to-vault exit module: deferred until the lending path proves wallet abstraction, compliance, NAV, collateral, vault funding, repayment, and enforcement flows on Stellar.

## 4. Why Stellar

Settley is designed for regulated real-world asset workflows where payments, compliance, settlement, and user access matter as much as token issuance. Stellar is a strong fit because it provides:

- low-cost settlement for high-frequency operational actions;
- stablecoin rails for subscriptions, distributions, loan disbursements, and repayments;
- Soroban smart contracts for asset-specific financial logic;
- wallet tooling suitable for user-facing onboarding;
- an ecosystem focused on payments, tokenization, and real-world utility.

The Stellar implementation will not be a cosmetic chain port. It will use Stellar for embedded or abstracted wallet onboarding, Soroban execution, Blend-compatible lending flows, asset-specific vault funding, stablecoin settlement, and auditable asset-specific contract events.

## 5. Stellar Components to Build

### 5.1 Embedded / Abstracted Stellar Wallet Integration

Purpose: let investors, LPs, and admins use Stellar-backed asset and settlement flows without forcing them to manage wallet complexity as a first-class product burden.

Likely integration path:

- DFNS as the primary embedded wallet / Wallets-as-a-Service integration;
- Stellar Wallets Kit and Freighter Connect support for advanced users, admins, testing, and direct wallet paths;
- wallet creation, linking, recovery, and session state inside the Settley frontend;
- signed Soroban transactions for asset, lending, and compliance actions;
- transaction status, failure messages, and hash display in the UI.

Completion criteria:

- user can access a Stellar-backed account through an embedded or abstracted wallet flow;
- app can detect the underlying wallet address and network;
- user can approve or initiate a testnet transaction without needing to understand raw wallet operations;
- advanced users and admins can use direct wallet connection where appropriate;
- transaction history is visible in the Settley interface.

### 5.2 Asset Registry Contract on Soroban

Purpose: register each supported tokenized asset or asset cohort.

Stores:

- asset ID;
- legal-wrapper metadata hash;
- property/SPV metadata hash;
- associated asset-token contract;
- NAV oracle reference;
- asset-specific lending vault reference;
- future liquidity vault reference where applicable;
- lifecycle status: proposed, active, paused, wind-down, closed.

Completion criteria:

- deploy registry contract to Stellar testnet;
- create, update, pause, and close asset records;
- emit auditable events for privileged changes;
- expose asset state to the admin console and user dashboard.

### 5.3 Compliance Credential Contract on Soroban

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
- collateral registration;
- borrow quote requests;
- LP vault funding;
- loan repayment;
- distribution claims.

Completion criteria:

- issue and revoke credentials on testnet;
- reject invalid or revoked wallets from restricted actions;
- expose compliance status to the app without exposing underlying KYC files.

### 5.4 Asset Token Contract on Soroban

Purpose: represent the economic interest in a specific tokenized asset or controlled asset cohort.

Capabilities:

- mint to eligible wallets;
- restrict transfers to compliant wallets;
- pledge, lock, or escrow tokens during a controlled collateralized borrow flow;
- transfer pledged tokens through an enforcement path if repayment fails, subject to legal-wrapper and compliance rules;
- expose balances for portfolio, distribution, and quote logic.

Completion criteria:

- deploy asset-token contract to Stellar testnet;
- test minting, restricted transfers, blocked transfers, collateral lock, and enforcement-state transfer cases;
- connect token balances to the Settley frontend.

### 5.5 NAV Oracle Contract on Soroban

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

### 5.6 Asset-Specific Lending Vault

Purpose: validate ownership-backed liquidity through a controlled asset-specific lending vault on Stellar.

Core logic:

- asset owner tokenizes an eligible asset or controlled asset interest;
- system creates an asset-specific lending vault linked to the asset registry entry;
- owner requests liquidity up to 30% of eligible asset value;
- owner proposes loan terms, including rate they are willing to pay, repayment date, and pledged token amount;
- eligible LPs fund the vault in Stellar stablecoins if the terms match their risk appetite;
- pledged ownership tokens are locked or escrowed as collateral;
- Blend v2 integration path is used to prototype lending, repayment, and loan state where feasible;
- settlement executes only if compliance, collateral, and risk checks pass;
- borrower repays principal and agreed interest by the agreed date;
- if repayment fails, pledged tokens move into a collateral enforcement path for compliant LPs, subject to the legal wrapper, transfer restrictions, and any required off-chain enforcement steps.

Loan states:

- requested;
- funded;
- active;
- repaid;
- overdue;
- impaired;
- default review;
- enforcement;
- closed.

Completion criteria:

- deploy asset-specific lending vault contract to Stellar testnet;
- complete a controlled Blend v2 integration spike;
- support asset tokenization reference, vault creation, loan request, LP funding, collateral lock, disbursement, repayment, and overdue/default state transitions;
- process a testnet borrow and repayment flow;
- demonstrate the collateral enforcement path with controlled test tokens;
- enforce 30% maximum LTV, NAV freshness, compliance status, repayment date, and pause states.

### 5.7 Bridge / Stellar Stablecoin Settlement

Purpose: settle LP vault funding, loan disbursement, repayment, subscriptions, and controlled test payouts over Stellar stablecoin rails, using Bridge where appropriate for treasury/payment movement.

Initial settlement scope:

- testnet stablecoin flow for LP vault funding;
- testnet stablecoin flow for loan disbursement;
- testnet stablecoin flow for repayment;
- Bridge integration assessment and implementation path for payment movement;
- admin-visible settlement status;
- event trail tying settlement to asset ID, loan ID, and wallet address.

Completion criteria:

- LP vault funding settles on Stellar testnet;
- loan disbursement settles on Stellar testnet;
- repayment settles on Stellar testnet;
- Bridge-based payment movement is implemented or documented with a clear integration decision if product constraints require a narrower first release;
- settlement events are indexed for dashboard display.

### 5.8 Event Indexing and Admin Console

Purpose: connect existing Settley admin workflows to Stellar contract actions.

Admin workflows:

- create asset record;
- update asset metadata;
- issue or revoke compliance credential;
- push NAV update;
- monitor vault funding, collateral, LTV, repayment date, and loan state;
- pause lending actions;
- view Stellar transaction hashes and contract events.

Completion criteria:

- admin can operate a full testnet asset lifecycle from the Settley app;
- contract events appear in the admin console;
- privileged actions show status, transaction hash, and failure messages.

## 6. End-to-End Data Flow

1. Admin creates an asset record in Settley.
2. Soroban asset registry stores asset metadata references.
3. Eligible user accesses a Stellar-backed wallet through Settley's embedded or abstracted wallet flow.
4. Admin or compliance service issues a minimal compliance credential.
5. User receives or purchases compliant asset tokens.
6. NAV oracle publishes verified valuation data.
7. Asset-specific lending vault is created alongside the tokenized asset.
8. Holder requests up to 30% liquidity against the asset-token interest and proposes rate, repayment date, and pledged token amount.
9. Lending module checks compliance credential, NAV freshness, collateral eligibility, maximum LTV, proposed terms, and protocol state.
10. Eligible LPs fund the vault in Stellar stablecoins if they accept the terms.
11. If valid, Blend v2 / Stellar lending flow is initiated for a controlled testnet loan.
12. Holder receives stablecoin disbursement and repays principal plus agreed interest by the agreed date.
13. If repayment fails, pledged tokens enter a collateral enforcement path for compliant LPs, subject to legal-wrapper and transfer rules.
14. Events are indexed for admin and user dashboards.

## 7. SCF Tranche Structure and Four-Month Build Plan

SCF Build requires three deliverable tranches, with the final tranche tied to mainnet launch or an equivalent production-ready release. Settley's four-month plan should be submitted as three tranches:

### Tranche 1: MVP on Testnet Foundation

Target timing: Month 1.

Deliverables:

- DFNS embedded wallet integration spike completed and connected to Settley frontend account state.
- Stellar Wallets Kit / Freighter direct-wallet fallback implemented for admin and reviewer-verifiable testnet transactions.
- Asset Registry and Compliance Credential Soroban contracts deployed to Stellar testnet.
- Basic admin flow can create an asset record and issue or revoke a compliance credential.
- Blend v2 technical integration spike completed with implementation notes.

Verification:

- reviewer can connect or access a Stellar-backed account;
- reviewer can see a testnet transaction hash;
- contract source is available in the repo or linked Stellar/Soroban implementation repo.

### Tranche 2: Testnet Expansion

Target timing: Months 2-3.

Deliverables:

- Asset Token and NAV Oracle contracts deployed to Stellar testnet.
- Asset-specific lending vault deployed to Stellar testnet.
- Bridge / Stellar stablecoin vault funding, disbursement, and repayment path implemented or documented with a specific product constraint and fallback settlement path.
- End-to-end testnet flow: eligible wallet, token balance, NAV update, vault creation, loan request, LP funding, collateral lock, controlled loan disbursement, repayment, and enforcement-state simulation.

Verification:

- reviewer can inspect testnet contract events;
- reviewer can run or view an end-to-end demo;
- loan request, LP funding, collateral, settlement, repayment, and enforcement-state logic are covered by unit/integration tests.

### Tranche 3: Mainnet Launch Readiness

Target timing: Month 4.

Deliverables:

- Core contracts prepared for Stellar mainnet or equivalent controlled production launch.
- Event indexing and admin dashboard integration completed.
- User-facing disclosures completed: liquidity is conditional, not guaranteed.
- Developer documentation, test coverage, and audit handoff materials published.
- Dedicated Stellar/Soroban implementation path created under this repo or a linked `settley-stellar` repository.

Verification:

- reviewer can view the production-ready architecture, deployment documentation, and demo;
- reviewer can verify source code, tests, and integration documentation;
- mainnet launch checklist is complete.

## 8. Internal Month-by-Month Plan

### Month 1: Stellar Foundation

- Finalize Soroban contract specifications.
- Implement DFNS embedded wallet flow in the Settley frontend.
- Implement Stellar Wallets Kit / Freighter fallback for admin and reviewer-verifiable direct wallet flows.
- Build initial asset registry and compliance credential contracts.
- Complete Blend v2 integration spike and document constraints.
- Deploy first contracts to Stellar testnet.

### Month 2: Asset and NAV Logic

- Implement asset-token contract.
- Implement NAV oracle contract.
- Connect token balance and NAV state to frontend/admin views.
- Run unit and integration tests for restricted asset flows.

### Month 3: Lending Vault and Settlement

- Implement asset-specific lending vault.
- Add Bridge / Stellar stablecoin vault funding, disbursement, and repayment flows.
- Implement loan request terms, LP funding logic, 30% LTV cap, repayment date, collateral enforcement state, pause states, and event emissions.
- Demonstrate end-to-end testnet borrow, repayment, and enforcement-state simulation against a controlled asset-token position.

### Month 4: Product Integration and Launch Readiness

- Connect admin console to all core contract actions.
- Index contract events into user/admin dashboards.
- Complete professional user testing.
- Prepare audit handoff materials.
- Publish developer documentation and controlled demo.

## 9. Security and Compliance Assumptions

- KYC files remain off-chain with regulated partners or internal systems.
- On-chain compliance credentials store only minimal eligibility state.
- Privileged operations use role-based controls and should move toward multi-sig administration before production launch.
- Mainnet readiness requires test coverage, peer review, and audit support.
- The product will not market guaranteed yield, guaranteed liquidity, or appreciation of XLM or any Stellar-based asset.
- The product will not use SCF funding for XLM promotion, market manipulation, investment advice, or public claims about token profitability.
- Compliance controls must reject sanctioned users, sanctioned jurisdictions, and users who fail required eligibility checks.

## 10. MVP Non-Goals

The four-month MVP will not:

- launch a public securities offering;
- promise universal liquidity;
- hold live property title on-chain;
- automate all legal enforcement;
- support unrestricted secondary trading;
- provide production lending against live real estate before legal, credit, and audit readiness;
- execute live collateral transfer without legal-wrapper and compliance review;
- launch the sell-to-vault exit module in the first Stellar MVP;
- require Soroswap or Aquarius routing for the first build;
- use SCF funds for marketing or promotion.

## 11. Relevant GitHub URL

Current organization:

https://github.com/monopoly-dao

Relevant existing repositories include product surfaces such as `monopoly-dapp`, `settley-admin`, and `settley-owner`. A dedicated Stellar/Soroban repository should be created once implementation begins so reviewers can track the grant-funded work separately from older product code.
