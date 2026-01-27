import { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';
import axios from 'axios';

import { BASE_URL } from '@/api';
import { PropertiesEndpoints } from '@/api/properties/propertiesApiConstants';
import { Property } from '@/api/properties/propertiesApiTypes';
import { siteConfig } from '@/constants/config';

import PropertyDetailClient from './PropertyDetailClient';

type Props = {
  params: { propertyId: string };
};

async function getProperty(id: string): Promise<Property | null> {
  try {
    const res = await axios.get(`${BASE_URL}${PropertiesEndpoints.Get_Property.replace(':propertyId', id)}`);
    return res.data?.data || res.data || null; // API might return data directly or wrapped
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const property = await getProperty(params.propertyId);

  if (!property) {
    return {
      title: 'Property Not Found | Settley',
    };
  }

  const { name, description, country, stateOrProvince, photos } = property.propertyDetails;
  const location = `${stateOrProvince}, ${country}`;

  return {
    title: `${name} | ${location} | Settley`,
    description: description.substring(0, 160),
    openGraph: {
      title: name,
      description: description,
      url: `${siteConfig.url}/listing/${params.propertyId}`,
      images: photos.length > 0 ? [photos[0].url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: description,
      images: photos.length > 0 ? [photos[0].url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const property = await getProperty(params.propertyId);

  if (!property) {
    return <PropertyDetailClient />;
  }

  const propertySchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': property.propertyDetails.name,
    'description': property.propertyDetails.description,
    'image': property.propertyDetails.photos.map(p => p.url),
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': property.propertyDetails.stateOrProvince,
      'addressCountry': property.propertyDetails.country
    },
    'offers': {
      '@type': 'Offer',
      'price': '1',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    }
  };

  return (
    <>
      <Script
        id='property-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />
      <PropertyDetailClient initialData={property} />
    </>
  );
}
