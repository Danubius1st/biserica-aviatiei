'use client';

import { FC, useId, useMemo } from 'react';
import { Spinner } from '@/components/ui/custom/spinner';

interface Props {
  id?: number;
  loading?: boolean;
  color?: string;
};

export const RandomSpinner: FC<Props> = ({ id: propId, loading, color }) => {
  const fallbackId = useId();

  const spinnerId = useMemo(() => {
    if (propId !== undefined) {
      return propId;
    }

    const hash = fallbackId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return (hash % 23) + 1;
  }, [propId, fallbackId]);

  return <Spinner
    id={spinnerId}
    loading={loading}
    color={color}
  />;
};
