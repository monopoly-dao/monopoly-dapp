'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CardPaginationContainer from '@/components/CardPaginationContainer';
import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery, useGetWishlistQuery } from '@/api/properties';

import ListingCard from './_components/ListingCard';
import ListingsHeader from './_components/ListingsHeader';
import PropertiesFilter from './_components/PropertiesFIlter';

export default function ListingsClient() {
    const session = useSession();
    const isLoggedIn = session.data;
    const userFirebaseId = session.data?.userFirebaseId ?? '';

    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const {
        data: propertiesResponse,
        isLoading,
        isFetching,
    } = useGetPropertiesQuery({
        limit: 12,
        page,
    });
    const properties = propertiesResponse?.data;

    const { data: wishlistResponse } = useGetWishlistQuery(userFirebaseId ?? '', {
        skip: !isLoggedIn,
    });
    const wishlist = wishlistResponse?.data?.wishlist;
    const wishlistPropertyIds = wishlist?.map((item) => item._id);

    return (
        <div>
            <ListingsHeader />

            <div className='mt-16 sm:mt-28 mb-16 sm:mb-32 px-[5%]'>
                <section className='mb-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 rounded-3xl border border-[#C6C6CD]/25 bg-white p-6 sm:p-8 shadow-sm'>
                    <div>
                        <p className='mb-3 font-inter text-xs font-bold uppercase tracking-widest text-navy/70'>
                            What you are looking at
                        </p>
                        <h2 className='font-playfair font-bold text-2xl sm:text-3xl text-navy'>
                            Each listing starts with a property. The opportunity depends on the structure.
                        </h2>
                        <p className='mt-5 font-inter text-[#3B3C4A] leading-relaxed'>
                            Some listings are for buying property tokens. Some may support a vault where lenders fund a loan backed by pledged property tokens. The property page is where you review the asset, documents, tokens available, and terms.
                        </p>
                    </div>
                    <div className='rounded-2xl bg-[#F8F9FF] p-5 flex flex-col justify-between gap-5'>
                        <div>
                            <h3 className='font-playfair font-bold text-xl text-navy'>
                                New to Settley vaults?
                            </h3>
                            <p className='mt-3 font-inter text-sm leading-relaxed text-[#3B3C4A]'>
                                Learn how owners raise, buyers buy tokens, and lenders review collateral before funding.
                            </p>
                        </div>
                        <a
                            href='/vaults'
                            className='font-inter text-sm font-semibold text-navy underline underline-offset-4'
                        >
                            See how vaults work
                        </a>
                    </div>
                </section>

                <div className='flex flex-col lg:flex-row gap-3 justify-between items-start mb-16'>
                    <h2 className='font-playfair font-bold text-3xl sm:text-4xl text-navy'>
                        Available Property Opportunities
                    </h2>
                    <PropertiesFilter />
                </div>

                <CardPaginationContainer
                    totalPages={propertiesResponse?.meta.totalPages}
                >
                    <div className='my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <ListingCardLoader
                            cardNumber={12}
                            isLoading={isLoading || isFetching}
                        />
                        {properties?.map((property) => (
                            <ListingCard
                                key={property._id}
                                property={property}
                                wishlist={wishlistPropertyIds}
                            />
                        ))}
                    </div>
                </CardPaginationContainer>
            </div>
        </div>
    );
}
