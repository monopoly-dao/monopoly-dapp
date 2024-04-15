'use client';

import SubscriptionForm from '../_components/SubscriptionForm';
import { useGetPropertiesQuery } from '../../api/properties';
import Carousel from '../../components/Carousel';
import PropertyCard from '../../components/PropertyCard';

function Dashboard() {
  const { data } = useGetPropertiesQuery();

  const properties = data?.data;

  return (
    <div>
      <Carousel />

      <div className='my-20 px-[7%] grid grid-cols-3 gap-4'>
        {properties?.map((property) => (
          <div key={property.id} className='col-span-1'>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      <div className='px-[7%]'>
        <SubscriptionForm />
      </div>
    </div>
  );
}

export default Dashboard;
