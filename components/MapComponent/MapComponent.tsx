import { useEffect } from 'react';
import { Container, Grid, Paper, Title } from '@mantine/core';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useRouter } from 'next/router';
import styles from './MapComponent.module.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { DonationData } from '@/components/Interfaces/DonationData';

interface Position {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  donations: (DonationData & { position: Position })[];
  zoom: number;
}

export default function MapComponent(props: MapComponentProps) {
  const { donations, zoom } = props;
  const router = useRouter();

  useEffect(() => {
    console.log('MapComponent mounted');
    console.log('Donations:', donations);
    console.log('Zoom:', zoom);
  }, [donations, zoom]);

  const handlePopupClick = (id: number | undefined) => {
    if (id) {
      router.push(`/Donations/${id}`);
    }
  };
  // listening for enter or ' ' to trigger click action
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, id: number | undefined) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handlePopupClick(id);
    }
  };

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={12}>
          <Paper style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'white' }} shadow="sm">
            <Grid.Col span={12}>
              <Title order={2} style={{ color: 'black', fontSize: '34px' }}>Find Nearby Donations</Title>
            </Grid.Col>
            <MapContainer className={styles['map-component']} center={donations[0].position} zoom={zoom} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {donations.map((donation) => (
                <Marker key={donation.id} position={donation.position}>
                  <Popup>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handlePopupClick(donation.id)}
                      onKeyDown={(event) => handleKeyDown(event, donation.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <strong>{donation.title}</strong><br />
                      Donor: {donation.donor?.business_name}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
