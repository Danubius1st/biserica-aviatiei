'use client';

import { useState, useEffect } from 'react';

interface LocationData {
  location: string;
}

export const HostLocation = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<LocationData | null>(null);

  const fetchLocation = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/location');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const text = await response.text();
      // console.log('Location API raw response:', text);
      const data = JSON.parse(text);
      setData(data);
    } catch (error) {
      console.log(`components\host-location.tsx: ${error}`);
      setData({ location: 'unknown' });
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const region = isLoading || !data ? '' : `(${data.location})`;

  return <>{region}</>;
};
