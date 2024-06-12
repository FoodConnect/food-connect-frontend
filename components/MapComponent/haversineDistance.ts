export const haversineDistance = (coords1: [number, number], coords2: [number, number]): number => {
  // Convert degrees to radians
  const toRad = (x: number): number => (x * Math.PI) / 180;

  // Destructure the coordinates
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  // Earth's radius in kilometers
  const R = 6371;

  // Calculate differences
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  // Apply Haversine formula
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  return R * c;
};
