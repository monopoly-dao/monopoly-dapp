export const AXIOS_TIMEOUT_TIME = 90000;
export const AXIOS_TIMEOUT_MSG = 'Request Timeout';
export const TOKEN_EXPIRED_MSG = 'session expired. please login again';
export const REFETCH_TIME = 43200000;

export const GLOBAL_API_REDUCER_PATH = 'globalApi' as const;
export const UNAUTHENTICATED_API_REDUCER_PATH = 'unauthenticatedApi' as const;
export const AUTH_API_REDUCER_PATH = 'authApi' as const;
export const CAMPAIGN_PAYMENT_REDUCER_PATH = 'campaignPayment' as const;

// API METHODS
export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';

export const faqs = [
  {
    question: 'What is Settley?',
    answer:
      'Settley is real-asset infrastructure that starts with property. People can buy property tokens, owners can raise against property, and lenders can review property-backed vaults.',
  },
  {
    question: 'How does Settley work?',
    answer:
      'Settley starts with a real property, structures it into tokens, and creates clear paths for buyers, owners, and lenders. Buyers can buy tokens, owners can raise capital, and lenders can review collateral and repayment terms.',
  },
  {
    question: 'What am I buying on Settley?',
    answer:
      'You buy property tokens. Those tokens are tied to a structured property opportunity, so the app shows the asset, documents, tokens available, and the rights connected to that structure.',
  },
  {
    question: 'Is Settley secure?',
    answer:
      'Yes, Settley employs advanced encryption and data protection protocols to ensure the security and privacy of your transactions and personal information.',
  },
  {
    question: 'What types of properties can I own on Settley?',
    answer:
      'Settley can support different real-asset types over time. Today the user-facing wedge is property, including residential, commercial, and rental opportunities.',
  },
  {
    question: 'How do I get started with Settley?',
    answer:
      'Start by browsing available properties or trying the vault playground. When you sign up, your dashboard tracks property token holdings, bookmarked assets, and transaction activity.',
  },
  {
    question: 'How does Settley ensure compliance with legal regulations?', // blockchain records
    answer: `Settley combines legal documentation, user checks, and ownership records so each property token or vault can be reviewed in context. Requirements depend on asset structure, jurisdiction, and user activity.`,
  },
];

export const campaignFAQs = [
  {
    question: 'What is Settley?',
    answer:
      "Settley lets you own real European property starting at $50. We're raising funds from our first 1,000 members to purchase a $160,000 Valencia villa. You get legal fractional ownership + 6.17% rental yields + ability to trade your shares. Real property, real returns, powered by tokenisation.",
  },
  {
    question: 'How much do I need to invest?',
    answer:
      'Minimum $50 (0.003% ownership). Most popular is $500 (0.03% ownership). For maximum impact: $5,000+ (0.3%+ ownership) Choose based on your budget and goals.',
  },
  {
    question: 'How can I own a property in minutes?',
    answer:
      'Settley uses smart contracts as legal entities to facilitate property purchases or ownership transfers. Once a property is tokenized, ownership is as simple as moving tokens from one wallet to another. While users hold these tokens, they are granted all rights to the property as encoded in the smart contract.',
  },
];
