import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/components/MapComponent/MapComponent.module.css';
import { geocodeAddress } from '@/components/MapComponent/geocode';
import { DonationData } from '@/components/Interfaces/DonationData';

// leaflet needs dynamic import to disable ssr
const DynamicMapComponent = dynamic(() => import('@/components/MapComponent/MapComponent'), { ssr: false });

interface Position {
  lat: number;
  lng: number;
}

const MapPage = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const zoom = 13;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:8080/donations/');
        if (!response.ok) {
          throw new Error('Failed to fetch donation pickup addresses');
        }
        const donations = await response.json();

        const geocodedPositions = await Promise.all(
          donations.map(async (donation: DonationData) => {
            const fullAddress = `${donation.address}, ${donation.city}, ${donation.state}, ${donation.zipcode}`;
            const { lat, lng } = await geocodeAddress(fullAddress);
            return { lat, lng };
          })
        );

        setPositions(geocodedPositions);
      } catch (error) {
        console.error('Failed to fetch donation addresses or geocode:', error);
      }
    };

    fetchAddresses();
  }, []);

  if (positions.length === 0) {
    return <p>Loading map...</p>;
  }

  return (
    <div className={styles['map-component']}>
      <DynamicMapComponent positions={positions} zoom={zoom} />
    </div>
  );
};

export default MapPage;
