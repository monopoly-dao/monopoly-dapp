# Settley Design Notes

This is the preliminary design reference for Settley. It exists so future UI work keeps the same brand, typography, and product story across public pages, auth pages, and signed-in views.

## Brand Mark

- The canonical Settley logo is `dapp/public/svg/Settley.svg`.
- Use `SettleyLogo colour='new'` from `dapp/src/components/SettleyLogo.tsx` for visible brand placement.
- Do not recreate the wordmark with typed text such as `Settley.`.
- Do not use `font-playfair`, `font-inter`, or custom page typography to imitate the logo.
- `Logo DARK.svg` and `Logo WHITE.svg` are compact legacy marks. Do not use them for new brand placements unless the user explicitly asks for the compact mark.

## Typography

- Use existing font tokens instead of page-local font inventions.
- `font-n-montreal`: core product UI where the existing app already uses it.
- `font-inter`: forms, dashboard text, dense body copy, labels, captions, and utility text.
- `font-playfair`: editorial headings and high-emphasis section titles only.
- Never use `font-playfair` for the Settley wordmark.

## Color Direction

- Primary brand dark: `#272343`.
- Primary text: `#1C1917` or the closest existing app token.
- Supporting text: `#44403C`, `#57534E`, or existing muted text tokens.
- Borders: `#D6D3D1` or existing outline tokens.
- Surfaces: `#F4F4F4`, `#F6F7F7`, `#F5F5F4`, `#FFFFFF`.
- Success accent: `#84CC16`.
- Alert accent: `#E11D48`.
- Avoid making pages feel like a disconnected theme when porting work from another branch. Preserve the shared logo, existing color tokens, and Settley product copy.

## Product Copy Rules

- Settley is real-asset infrastructure, starting with property.
- Public pages should stay human: buy property tokens, lend against property, raise against collateral.
- Use `property` for the asset users understand.
- Use `tokens` for what users buy and hold.
- Use `real-asset infrastructure` in deeper copy, FAQs, metadata, docs, and technical pages.
- Avoid reducing Settley to only a real-estate marketplace.

## UI Rules

- Public pages and authenticated pages should feel like the same product.
- Auth pages should use the canonical `Settley.svg` logo and plain product copy about property tokens and account activity.
- Dashboard pages should speak in terms of token holdings, activity, bookmarks, and future vault activity.
- Do not introduce fake flows. If lending/vault functionality is not implemented in a user flow yet, explain it as context or link to `/vaults`.
- Keep technical language on protocol/docs pages. Customer-facing copy should be direct and concrete.

## Current Implementation Notes

- Preferred PR19 base branch: `codex/scf-stellar-architecture`.
- Auth UI improvements are being ported from `origin/mubaraq/frontend-cleanup`.
- The current merged working branch is `codex/pr19-auth-frontend-cleanup`.
- Protocol paper: `dapp/public/papers/settley-conditional-liquidity-infrastructure.pdf`.
- Stellar architecture plan: `docs/settley-stellar-technical-architecture.md`.
