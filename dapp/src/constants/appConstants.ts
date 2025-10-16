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
      'Settley is a platform designed to streamline and modernize property ownership processes, making transactions easier, faster, and more secure.',
  },
  {
    question: 'How does Settley work?',
    // blockchain
    answer:
      'Settley uses a mix of technology and boots on the ground to facilitate property transactions. Users can buy, sell, and manage properties through our user-friendly interface.',
  },
  {
    question: 'How can I own a property in minutes with Settley?',
    answer:
      'Settley uses smart contracts as legal entities to facilitate property purchases or ownership transfers. Once a property is tokenized, ownership is as simple as moving tokens from one wallet to another. While users hold these tokens, they are granted all rights to the property as encoded in the smart contract.',
  },
  {
    question: 'Is Settley secure?',
    answer:
      'Yes, Settley employs advanced encryption and data protection protocols to ensure the security and privacy of your transactions and personal information.',
  },
  {
    question: 'What types of properties can I own on Settley?',
    answer:
      'Settley supports a variety of property types, including residential, commercial, and rental properties.',
  },
  {
    question: 'How do I get started with Settley?',
    answer:
      'Simply sign up on our website, complete your profile, and follow the guided steps to start managing your properties.',
  },
  {
    question: 'How does Settley ensure compliance with legal regulations?', // blockchain records
    answer: `All transactions are recorded, and user profiles are KYC'd at certain thresholds to ensure compliance in all regions we operate. Our records provide an accurate list of everyone involved in an asset sale or purchase.`,
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
