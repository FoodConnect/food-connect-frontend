import { useEffect } from 'react';
import { Container, Grid, Paper, Title } from '@mantine/core';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import styles from './MapComponent.module.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface MapComponentProps {
  positions: { lat: number, lng: number }[];
  zoom: number;
}

export default function MapComponent(props: MapComponentProps) {
  const { positions, zoom } = props;

  useEffect(() => {
    console.log('MapComponent mounted');
    console.log('Position:', positions);
    console.log('Zoom:', zoom);
  }, [positions, zoom]);

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={12}>
          <Paper style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'white' }} shadow="sm">
            <Grid.Col span={12}>
              <Title order={2} style={{ color: 'black', fontSize: '34px' }}>Find Nearby Donations</Title>
            </Grid.Col>
            <MapContainer className={styles['map-component']} center={positions[0]} zoom={zoom} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {positions.map((position, index) => (
                <Marker key={index} position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
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
