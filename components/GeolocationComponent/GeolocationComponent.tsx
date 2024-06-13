import { useEffect, useState } from 'react';

const GeolocationComponent = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          localStorage.setItem('userLocation', JSON.stringify([position.coords.latitude, position.coords.longitude]));
        }, (error) => {
          console.error('Geolocation error:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation(); // Trigger geolocation request on component mount
  }, []);

  const refreshLocation = () => {
    // Function to refresh location when called
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        localStorage.setItem('userLocation', JSON.stringify([position.coords.latitude, position.coords.longitude]));
      }, (error) => {
        // Handle geolocation error
        console.error('Geolocation error:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return { userLocation, refreshLocation };
};

export default GeolocationComponent;
