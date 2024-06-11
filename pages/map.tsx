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
  const [donations, setDonations] = useState<(DonationData & { position: Position })[]>([]);
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

      const donationsData: DonationData[] = await response.json();

      const donationsWithPositions = await Promise.all(
        donationsData.map(async (donation) => {
          const fullAddress = `${donation.address}, ${donation.city}, ${donation.state}, ${donation.zipcode}`;
          const { lat, lng } = await geocodeAddress(fullAddress);
          return {
            ...donation,
            position: { lat, lng },
          };
        })
      );

      setDonations(donationsWithPositions);
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

  if (donations.length === 0) {
    return <p>Loading map...</p>;
  }

  return (
    <div className={styles['map-component']}>
      <DynamicMapComponent donations={donations} zoom={zoom} />
    </div>
  );
}
