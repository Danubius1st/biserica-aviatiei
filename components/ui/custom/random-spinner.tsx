'use client';

import { FC, useState } from 'react';
import { Spinner } from '@/components/ui/custom/spinner';

interface Props {
  loading?: boolean;
  id?: number;
};

export const RandomSpinner: FC<Props> = ({ loading = true, id }) => {
  // const [spinnerId, setSpinnerId] = useState<number | null>(null);
  // const min = 1;
  // const max = 23;

  // const spinnerId = useMemo(() => {
  //   if (id) return id;
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }, [id]);

  // useEffect(() => {
  //   const randomId = id || Math.floor(Math.random() * (max - min + 1)) + min;
  //   setSpinnerId(randomId);
  // }, [id]);

  // const spinnerId = typeof window !== 'undefined'
  //   ? (id || Math.floor(Math.random() * 23) + 1)
  //   : (id || 1); // Valoare default pentru server

  const [spinnerId] = useState(() => id ?? Math.floor(Math.random() * 23) + 1);

  return < Spinner
    loading={loading}
    id={spinnerId}
  />;
};
