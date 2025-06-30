import React from 'react';

interface PropertyType {
  type: string;
  avgPrice: string;
  change: string;
  available: number;
}

interface LocationDetail {
  region: string;
  country: string;
  propertyTypes: PropertyType[];
}

interface LocationDetailsGridProps {
  locations: LocationDetail[];
}

const colorMap: Record<string, string> = {
  Studio: 'bg-[#e0e7ff]',
  '1 Bedroom': 'bg-[#c9ff63]/30',
  Loft: 'bg-[#ffd6e0]/30',
  Penthouse: 'bg-[#f8fafc]/80',
  Default: 'bg-white/80',
};

const LocationDetailsGrid: React.FC<LocationDetailsGridProps> = ({
  locations,
}) => {
  return (
    <section className='mt-20 mb-10'>
      <h2 className='text-3xl font-merriweather text-[#272343] mb-8 text-center drop-shadow-lg'>
        Comprehensive Property Insights by Location
      </h2>
      <div className='grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {locations.map((loc) => (
          <div
            key={loc.region}
            className='rounded-3xl shadow-xl bg-white/70 backdrop-blur-md border border-[#e0e7ff] p-7 flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-300'
          >
            <div className='flex items-center gap-3 mb-2'>
              <span className='text-lg font-bold text-[#272343]'>
                {loc.region}
              </span>
              <span className='text-xs font-semibold text-[#3c3949] bg-[#c9ff63]/30 px-3 py-1 rounded-full'>
                {loc.country}
              </span>
            </div>
            <div className='flex flex-col gap-3'>
              {loc.propertyTypes.map((pt) => (
                <div
                  key={pt.type}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                    colorMap[pt.type] || colorMap.Default
                  } shadow-sm`}
                >
                  <div className='flex flex-col'>
                    <span className='font-semibold text-[#272343] text-base'>
                      {pt.type}
                    </span>
                    <span className='text-xs text-gray-500'>
                      Available: {pt.available}
                    </span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <span className='font-bold text-[#3c3949] text-lg'>
                      {pt.avgPrice}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        pt.change.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >
                      {pt.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationDetailsGrid;
