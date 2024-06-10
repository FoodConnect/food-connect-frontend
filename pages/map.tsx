import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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

export default function MapPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const zoom = 13;
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      if (!session) {
        throw new Error('User not authenticated');
      }

      const token = session.access_token;
      const response = await fetch('http://localhost:8080/donations/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    }

    if (session) {
      fetchData().catch(error => {
        console.error('Error fetching donation data:', error);
      });
    }
  }, [session]);

  if (!session) {
    return <p>User not authenticated</p>;
  }

  if (positions.length === 0) {
    return <p>Loading map...</p>;
  }

  return (
    <div className={styles['map-component']}>
      <DynamicMapComponent positions={positions} zoom={zoom} />
    </div>
  );
}
