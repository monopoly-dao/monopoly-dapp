export const AXIOS_TIMEOUT_TIME = 30000;
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
      'Settley is a platform designed to streamline and modernize property ownership processes, making transactions easier, faster, and more secure.',
  },
  {
    question: 'How does Settley work?',
    answer:
      'Settley uses a mix of blockchain technology and boots on the ground to facilitate property transactions. Users can buy, sell, and manage properties through our user-friendly interface.',
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
    question: 'How does Settley ensure compliance with legal regulations?',
    answer: `All transactions are recorded, and user profiles are KYC'd at certain thresholds to ensure compliance in all regions we operate. Our blockchain records provide an accurate list of everyone involved in an asset sale or purchase.`,
  },
];
