'use client';

import { CSSProperties, FC, useEffect, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import BeatLoader from 'react-spinners/BeatLoader';
import BounceLoader from 'react-spinners/BounceLoader';
import CircleLoader from 'react-spinners/CircleLoader';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import ClockLoader from 'react-spinners/ClockLoader';
import DotLoader from 'react-spinners/DotLoader';
import FadeLoader from 'react-spinners/FadeLoader';
import GridLoader from 'react-spinners/GridLoader';
import HashLoader from 'react-spinners/HashLoader';
import MoonLoader from 'react-spinners/MoonLoader';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';
import PuffLoader from 'react-spinners/PuffLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import RingLoader from 'react-spinners/RingLoader';
import RiseLoader from 'react-spinners/RiseLoader';
import RotateLoader from 'react-spinners/RotateLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';
import SkewLoader from 'react-spinners/SkewLoader';
import SquareLoader from 'react-spinners/SquareLoader';
import SyncLoader from 'react-spinners/SyncLoader';

interface spinProps {
  loading?: boolean;
  id?: number;
};

export const Spinner: FC<spinProps> = ({ loading = true, id }) => {
  const [spinner, setSpinner] = useState(0);
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
    justifyContent: 'center',
  };
  const color = '#283618';

  useEffect(() => {
    const min = 1;
    const max = 23;
    const spinnerId = id || Math.floor(Math.random() * (max - min + 1)) + min;
    setSpinner(spinnerId);
  }, [id]);

  if (spinner === 0) {
    return (
      <div>
        <BarLoader
          loading={loading}
          color={color}
          cssOverride={override}
        />
      </div>
    );
  }

  {
    (() => {
      switch (spinner) {
        case 1:
          return (
            <div>
              <BarLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 2:
          return (
            <div>
              <BeatLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 3:
          return (
            <div>
              <BounceLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 4:
          return (
            <div>
              <CircleLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 5:
          return (
            <div>
              <ClimbingBoxLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 6:
          return (
            <div>
              <ClipLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 7:
          return (
            <div>
              <ClockLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 8:
          return (
            <div>
              <DotLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 9:
          return (
            <div>
              <FadeLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 10:
          return (
            <div>
              <GridLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 11:
          return (
            <div>
              <HashLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 12:
          return (
            <div>
              <MoonLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 13:
          return (
            <div>
              <PacmanLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 14:
          return (
            <div>
              <PropagateLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 15:
          return (
            <div>
              <PuffLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 16:
          return (
            <div>
              <PulseLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 17:
          return (
            <div>
              <RingLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 18:
          return (
            <div>
              <RiseLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 19:
          return (
            <div>
              <RotateLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 20:
          return (
            <div>
              <ScaleLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 21:
          return (
            <div>
              <SkewLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        case 22:
          return (
            <div>
              <SquareLoader
                loading={loading}
                color={color}
                cssOverride={override}
              />
            </div>
          );
          break;

        case 23:
          return (
            <div>
              <SyncLoader loading={loading} color={color} cssOverride={override} />
            </div>
          );
          break;

        default:
          break;
      }
    })();
  }

  return null;
};
