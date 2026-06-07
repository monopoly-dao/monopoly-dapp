export const AXIOS_TIMEOUT_TIME = 90000;
export const AXIOS_TIMEOUT_MSG = 'Request Timeout';
export const TOKEN_EXPIRED_MSG = 'session expired. please login again';
export const REFETCH_TIME = 43200000;

export const GLOBAL_API_REDUCER_PATH = 'globalApi' as const;

// API METHODS
export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';

export const faqs = [
  {
    question: 'What is Settley?',
    answer:
      'Settley is a real-asset liquidity platform. It helps eligible asset owners tokenize property, structure ownership, and connect with buyers, investors, and liquidity providers.',
  },
  {
    question: 'How does Settley work?',
    answer:
      'An eligible asset is linked to compliance checks, legal documentation, and tokenized ownership records. From there, the asset can support ownership access, liquidity requests, and asset-specific capital structures.',
  },
  {
    question: 'Can I unlock liquidity without selling the whole asset?',
    answer:
      'That is the goal. Asset owners can request controlled liquidity against eligible tokenized ownership while keeping the wider asset structure intact, subject to compliance, valuation, and risk checks.',
  },
  {
    question: 'How does an asset-specific lending vault work?',
    answer:
      'A vault is created for a specific tokenized asset. The owner requests liquidity, proposes a rate and repayment date, and pledges ownership tokens as collateral. Eligible liquidity providers can fund the request in stablecoins if they accept the terms.',
  },
  {
    question: 'What happens if a borrower does not repay?',
    answer:
      'If repayment fails, pledged tokens enter a collateral enforcement path for compliant liquidity providers. Live enforcement depends on the legal wrapper, transfer restrictions, and jurisdiction-specific requirements.',
  },
  {
    question: 'Can investors buy ownership as well as fund vaults?',
    answer:
      'Yes. Settley is built for multiple capital paths: buyers can access ownership opportunities, while eligible liquidity providers can fund asset-backed requests with clear terms.',
  },
  {
    question: 'How does Settley ensure compliance with legal regulations?',
    answer: `Settley uses eligibility checks, KYC where required, jurisdiction-aware access rules, and legal documentation around each asset. Private compliance documents stay off-chain while ownership and transaction events can be tracked transparently.`,
  },
];
