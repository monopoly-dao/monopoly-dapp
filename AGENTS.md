# Settley Agent Context

This repo is for Settley, maintained under the Monopoly DAO GitHub organization.

## Product Positioning Rules

- Settley is real-asset infrastructure, not merely a real-estate marketplace.
- The current user-facing wedge is real estate/property, but the long-term category is conditional liquidity infrastructure for tokenized real assets.
- Settley exists to make eligible assets easier to own, finance, collateralize, and settle onchain.
- Public copy should stay simple: own part of an asset, lend against one, raise against collateral.
- Use `property` for the asset users care about and `tokens` for what investors buy or hold.
- Technical pages and internal docs may use tokenization, lending vaults, compliance, collateral, onchain/offchain settlement, repayment, and enforcement language.
- Do not reduce Settley to "just real estate" in FAQs, metadata, docs, authenticated investor flows, or future landing copy.
- Use `onchain` and `offchain` spelling.
- Avoid unexplained `LP` language in public UI. Prefer `lender` or `liquidity provider` only when the audience is technical enough for it.

## Source Material

- Protocol paper: `dapp/public/papers/settley-conditional-liquidity-infrastructure.pdf`
- Stellar architecture plan: `docs/settley-stellar-technical-architecture.md`
- Product marketing context: `.agents/product-marketing.md`

## Copy Guardrails

- Homepage hero may stay anchored on real estate because that is the current wedge.
- FAQs and deeper copy should preserve the broader infrastructure story.
- Good public wording:
  - `Own part of a property or asset.`
  - `Buy property tokens.`
  - `Buy tokens that represent property ownership.`
  - `Lend against real-asset collateral.`
  - `Raise money without selling the whole asset.`
  - `Infrastructure for tokenized real assets, starting with real estate.`
- Avoid vague or narrow wording:
  - `real-estate platform` as the whole category
  - `asset-backed opportunities` without explaining ownership or lending
  - `opened to capital`
  - unexplained `LPs`
  - `on-chain` or `off-chain`
