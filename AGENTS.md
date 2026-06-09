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

## Brand And UI Rules

- Use the shared `SettleyLogo` component for visible Settley wordmarks. Do not recreate the logo with typed text such as `Settley.` or a page-specific font class.
- The canonical public brand mark is `SettleyLogo colour='new'`, which renders `dapp/public/svg/Settley.svg`. Use this by default for auth, landing, and dashboard brand placement.
- `Logo DARK.svg` and `Logo WHITE.svg` are compact legacy marks. Do not use them for new brand placements unless the user explicitly asks for the compact mark.
- Brand logo assets live in `dapp/public/svg/` and are exposed through `dapp/src/components/SettleyLogo.tsx`.
- Use existing font tokens instead of inventing page-local brand typography:
  - `font-n-montreal` for the core product UI where the existing app uses it.
  - `font-inter` for dense body copy, forms, captions, and dashboard text.
  - `font-playfair` only for editorial/section headings where the current design already uses that treatment, never for the Settley wordmark.
- Public pages and authenticated pages should feel like the same product. When porting UI from another branch, preserve the shared logo, color tokens, button style, and copy rules before changing layout.
- Do not hard-code one-off logo text, brand colors, or new font families in individual pages unless a design-system file or shared component is updated at the same time.
