import axios from 'axios';

const GEOCODE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

interface GeocodeResponse {
  lat: number;
  lng: number;
}

export const geocodeAddress = async (address: string): Promise<GeocodeResponse> => {
  const response = await axios.get(GEOCODE_API_URL, {
    params: {
      key: API_KEY,
      q: address,
    },
  });

  if (response.data.results.length > 0) {
    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lng };
  }
    throw new Error('Geocoding failed');
};
