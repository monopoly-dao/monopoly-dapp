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
    question: 'Is Settley legally safe?',
    answer:
      'Every property is legally structured before it goes live. Ownership terms, documents, and participant records are prepared so buyers, owners, and lenders understand what they are entering before they commit.',
  },
  {
    question: 'What is Settley?',
    answer:
      'Settley helps people own a share of property, fund property-backed opportunities, or raise capital from property without forcing a whole-asset sale.',
  },
  {
    question: 'How does Settley work?',
    answer:
      'Owners list a property and set terms. Settley structures the ownership records. Buyers can secure a documented ownership stake, and lenders can fund property-backed positions where available.',
  },
  {
    question: 'How is ownership documented?',
    answer:
      'Ownership is tied to the legal structure and records prepared for each property. The property page explains what the ownership stake represents before a buyer participates.',
  },
  {
    question: 'Can owners raise capital without selling the whole asset?',
    answer:
      'Yes. Owners can set raise terms and make part of the property available to buyers or lenders while keeping the rest of the asset intact.',
  },
  {
    question: 'What is the minimum investment?',
    answer:
      'Minimums can vary by property, structure, and jurisdiction. Each property page should show the participation terms before you make a decision.',
  },
  {
    question: 'How does Settley ensure compliance with legal regulations?',
    answer:
      'Settley uses eligibility checks, identity verification where required, jurisdiction-aware access rules, and documented ownership records. Private compliance documents stay protected and are not shown publicly.',
  },
];
