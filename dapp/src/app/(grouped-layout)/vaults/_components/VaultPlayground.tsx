'use client';

import { useMemo, useState } from 'react';

const tokenSupply = 100000;

const moneyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency',
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

function formatMoney(value: number) {
  return moneyFormatter.format(value);
}

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

type SliderProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  suffix?: string;
  value: number;
  valueLabel: string;
};

function SliderControl({
  label,
  max,
  min,
  onChange,
  step,
  suffix,
  value,
  valueLabel,
}: SliderProps) {
  return (
    <label className='block'>
      <div className='mb-3 flex items-start justify-between gap-4'>
        <span className='font-inter font-medium text-navy'>{label}</span>
        <span className='rounded-full border border-[#C6C6CD]/25 bg-white px-3 py-1 text-sm font-medium text-navy'>
          {valueLabel}
          {suffix}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className='h-2 w-full accent-[#272342]'
      />
    </label>
  );
}

export default function VaultPlayground() {
  const [propertyValue, setPropertyValue] = useState(250000);
  const [loanAmount, setLoanAmount] = useState(60000);
  const [rate, setRate] = useState(12);
  const [termMonths, setTermMonths] = useState(6);
  const [pledgedPercent, setPledgedPercent] = useState(35);
  const [outcome, setOutcome] = useState<'repaid' | 'missed'>('repaid');

  const results = useMemo(() => {
    const tokenPrice = propertyValue / tokenSupply;
    const pledgedTokens = Math.round((tokenSupply * pledgedPercent) / 100);
    const collateralValue = pledgedTokens * tokenPrice;
    const ltv = loanAmount / collateralValue;
    const interest = loanAmount * (rate / 100) * (termMonths / 12);
    const repayment = loanAmount + interest;
    const coverage = collateralValue / loanAmount;

    return {
      collateralValue,
      coverage,
      interest,
      ltv,
      pledgedTokens,
      repayment,
      tokenPrice,
    };
  }, [loanAmount, pledgedPercent, propertyValue, rate, termMonths]);

  return (
    <section
      id='playground'
      className='px-[5%] lg:px-[7%] py-16 sm:py-24 bg-white border-y border-[#C6C6CD]/20'
    >
      <div className='mb-10 max-w-4xl'>
        <p className='mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-navy/70'>
          Try a vault
        </p>
        <h2 className='font-playfair text-3xl font-bold text-navy sm:text-5xl'>
          Build a sample property-backed loan.
        </h2>
        <p className='mt-5 font-inter text-lg text-[#3B3C4A]'>
          Move the numbers and watch the vault change. This is a demo, not an
          offer: it shows what owners set, what lenders review, and what happens
          after repayment.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]'>
        <div className='rounded-3xl border border-[#C6C6CD]/20 bg-settley-bg p-6 shadow-sm sm:p-8'>
          <div className='mb-8'>
            <h3 className='font-playfair text-2xl font-bold text-navy'>
              Owner settings
            </h3>
            <p className='mt-3 font-inter text-[#3B3C4A]'>
              Start with a property, choose how much to raise, and pledge some
              of the property tokens as collateral.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-7'>
            <SliderControl
              label='Property value'
              min={100000}
              max={1000000}
              step={25000}
              value={propertyValue}
              valueLabel={formatMoney(propertyValue)}
              onChange={(value) => {
                setPropertyValue(value);
                setLoanAmount((current) => Math.min(current, value * 0.6));
              }}
            />
            <SliderControl
              label='Loan request'
              min={10000}
              max={Math.round(propertyValue * 0.6)}
              step={5000}
              value={loanAmount}
              valueLabel={formatMoney(loanAmount)}
              onChange={setLoanAmount}
            />
            <SliderControl
              label='Tokens pledged'
              min={10}
              max={80}
              step={5}
              value={pledgedPercent}
              valueLabel={`${pledgedPercent}`}
              suffix='%'
              onChange={setPledgedPercent}
            />
            <SliderControl
              label='Rate offered'
              min={4}
              max={24}
              step={1}
              value={rate}
              valueLabel={`${rate}`}
              suffix='%'
              onChange={setRate}
            />
            <SliderControl
              label='Term'
              min={1}
              max={18}
              step={1}
              value={termMonths}
              valueLabel={`${termMonths}`}
              suffix=' months'
              onChange={setTermMonths}
            />
          </div>
        </div>

        <div className='rounded-3xl border border-[#272342] bg-[#272342] p-6 text-white shadow-sm sm:p-8'>
          <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <h3 className='font-playfair text-2xl font-bold'>Vault preview</h3>
              <p className='mt-3 font-inter text-white/70'>
                What a lender sees before deciding to fund.
              </p>
            </div>
            <div className='rounded-full bg-white px-4 py-2 font-inter text-sm font-medium text-[#272342]'>
              {formatMoney(results.tokenPrice)} / token
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5'>
              <p className='font-inter text-sm text-white/65'>Owner receives</p>
              <p className='mt-2 font-inter text-3xl font-medium'>
                {formatMoney(loanAmount)}
              </p>
            </div>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5'>
              <p className='font-inter text-sm text-white/65'>Due at repayment</p>
              <p className='mt-2 font-inter text-3xl font-medium'>
                {formatMoney(results.repayment)}
              </p>
            </div>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5'>
              <p className='font-inter text-sm text-white/65'>Pledged collateral</p>
              <p className='mt-2 font-inter text-3xl font-medium'>
                {formatNumber(results.pledgedTokens)}
              </p>
              <p className='mt-1 font-inter text-sm text-white/65'>property tokens</p>
            </div>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5'>
              <p className='font-inter text-sm text-white/65'>Collateral coverage</p>
              <p className='mt-2 font-inter text-3xl font-medium'>
                {results.coverage.toFixed(1)}x
              </p>
              <p className='mt-1 font-inter text-sm text-white/65'>
                {Math.round(results.ltv * 100)}% loan-to-collateral
              </p>
            </div>
          </div>

          <div className='mt-6 rounded-2xl bg-white p-5 text-navy'>
            <div className='mb-4 flex rounded-full border border-[#C6C6CD]/25 p-1'>
              <button
                type='button'
                onClick={() => setOutcome('repaid')}
                className={`w-1/2 rounded-full px-4 py-2 font-inter text-sm font-medium ${
                  outcome === 'repaid'
                    ? 'bg-[#272342] text-white'
                    : 'text-[#57534E]'
                }`}
              >
                If repaid
              </button>
              <button
                type='button'
                onClick={() => setOutcome('missed')}
                className={`w-1/2 rounded-full px-4 py-2 font-inter text-sm font-medium ${
                  outcome === 'missed'
                    ? 'bg-[#272342] text-white'
                    : 'text-[#57534E]'
                }`}
              >
                If missed
              </button>
            </div>

            {outcome === 'repaid' ? (
              <div>
                <h4 className='font-inter font-medium'>The vault closes cleanly.</h4>
                <p className='mt-2 font-inter text-[#57534E]'>
                  The borrower repays {formatMoney(results.repayment)}. Lenders
                  receive principal plus interest, and the pledged property
                  tokens are released back to the borrower.
                </p>
              </div>
            ) : (
              <div>
                <h4 className='font-inter font-medium'>Collateral moves into recovery.</h4>
                <p className='mt-2 font-inter text-[#57534E]'>
                  The pledged tokens remain locked and follow the agreed
                  collateral process. The point is to make the failure path
                  visible before anyone funds the loan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
