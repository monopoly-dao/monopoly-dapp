'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CAMPAIGN_PAYMENT_REDUCER_PATH } from '@/constants/appConstants';

export interface CampaignPaymentState {
  stage: 'details' | 'crypto' | 'fiat' | 'crptoQR' | 'success';
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  paymentMethod: string;
  cryptoAmount: string;
  method: string;
  walletAddress: string;
}

export const initialState: CampaignPaymentState = {
  stage: 'details',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: '',
  paymentMethod: '',
  cryptoAmount: '',
  method: '',
  walletAddress: '',
};

export const campaignPaymentSlice = createSlice({
  name: CAMPAIGN_PAYMENT_REDUCER_PATH,
  initialState,
  reducers: {
    setDetails: (
      state,
      action: PayloadAction<
        Pick<
          CampaignPaymentState,
          | 'email'
          | 'country'
          | 'phone'
          | 'firstName'
          | 'lastName'
          | 'paymentMethod'
        >
      >
    ) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },

    setCryptoDetails: (
      state,
      action: PayloadAction<
        Pick<CampaignPaymentState, 'cryptoAmount' | 'method'>
      >
    ) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },

    setWalletAddress: (
      state,
      action: PayloadAction<CampaignPaymentState['walletAddress']>
    ) => {
      return { ...state, walletAddress: action.payload };
    },

    setCampaignPaymentStage: (
      state,
      action: PayloadAction<CampaignPaymentState['stage']>
    ) => {
      return { ...state, stage: action.payload };
    },

    resetCampaignPayment: () => {
      return initialState;
    },
  },
});

export const {
  resetCampaignPayment,
  setDetails,
  setCampaignPaymentStage,
  setCryptoDetails,
  setWalletAddress,
} = campaignPaymentSlice.actions;

export const campaignPaymentReducer = campaignPaymentSlice.reducer;
