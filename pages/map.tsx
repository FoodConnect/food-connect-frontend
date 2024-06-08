import { useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/components/MapComponent/MapComponent.module.css';

const MapPage: React.FC = () => {
  console.log('MapPage rendering');

  const MapComponent = useMemo(() => {
    console.log('Dynamic import for MapComponent');
    return dynamic(
      () => import('@/components/MapComponent/MapComponent'),
      {
        loading: () => <p>Map is loading</p>,
        ssr: false,
      }
    );
  }, []);

  useEffect(() => {
    console.log('MapPage mounted');
  }, []);

  return (
    <div className={styles['map-component']}>
      <MapComponent position={[51.505, -0.09]} zoom={13} />
    </div>
  );
};

export default MapPage;
