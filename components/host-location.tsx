'use client';

import { useState, useEffect } from 'react';

interface LocationData {
  location: string;
}

export const HostLocation = () => {
  const [data, setData] = useState<LocationData | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchLocation = async () => {
    setLoading(true);
    await fetch('/api/location')
      // .then((res) => res.json())
      // .then((data: LocationData) => {
      //   setData(data);
      .then((res) => {
        // console.log('Location API Response status:', res.status);
        // console.log('Location API Response headers:', res.headers);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text(); // Get as text first to debug
      })
      .then((text) => {
        console.log('Location API raw response:', text);
        try {
          const data = JSON.parse(text);
          setData(data);
        } catch (error) {
          console.error('JSON Parse Error in HostLocation:', error);
          console.error('Raw response that failed to parse:', text);
          // Set fallback data
          setData({ location: 'unknown' });
        }
      })
      .catch((error) => {
        console.error('Location fetch error:', error);
        setData({ location: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const region = isLoading || !data ? '' : `(${data.location})`;

  return <>{region}</>;
};
