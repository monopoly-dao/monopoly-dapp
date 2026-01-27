import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/constants/config';

export const metadata: Metadata = {
    title: 'Articles | Settley',
    description: 'Insights, guides, and updates on shared property ownership and real estate investment.',
    openGraph: {
        title: 'Settley Articles',
        description: 'Insights into the future of property ownership.',
        url: `${siteConfig.url}/articles`,
        type: 'website',
    },
};

export default function ArticlesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Settley Articles',
        description: 'A collection of articles about property ownership and real estate technology.',
        url: `${siteConfig.url}/articles`,
    };

    return (
        <>
            <Script
                id='articles-collection-schema'
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            {children}
        </>
    );
}
