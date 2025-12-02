import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
// import { logMessage } from '@/lib/pino-logger';

const redis = new Redis(process.env.REDIS_URL!);

export const GET = async (req: NextRequest) => {
  // Test
  // http://localhost:3100/api/hitcounter?color=F1EBE2&background=766852&counter=0

  try {
    // Parse url and image options

    // console.log('app/api/[url]/route.ts: ');
    // console.log('req.url: ', req.url);
    // console.log('req.nextUrl: ', req.nextUrl);
    // logMessage('info', { req }, `GET request received from ${req.url}`);
    const strBackground = req.nextUrl.searchParams.get('background');
    const strColor = req.nextUrl.searchParams.get('color');
    const strDigits = req.nextUrl.searchParams.get('digits');
    const strCounter = req.nextUrl.searchParams.get('counter') || '0';
    // console.log('strCounter: ', strCounter);
    const dbField = req.nextUrl.searchParams.get('dbField') || 'example';
    // console.log('dbField: ', dbField); // 'hitcounter'
    // logMessage('info', { dbField }, `GET request received from ${dbField}`);

    const hexBackground = '#' + (strBackground || '000000');
    const hexColor = '#' + (strColor || 'FFFFFF');
    const padding = Math.min(parseInt(strDigits || '6', 10), 10);
    const counter = parseInt(strCounter, 10);
    // console.log('counter: ', counter);

    // Get and increment hits
    const hits =
      dbField === 'example'
        ? 0
        : counter > 0
          ? await redis.set(dbField, counter)
          : process.env.NODE_ENV === 'development'
            ? await redis.get(dbField)
            : await redis.incr(dbField);
    // redis.quit(); // At reload cannot read the counter!
    // console.log('hits: ', hits);
    // logMessage('info', { hits }, `GET request received from ${dbField}`);

    // Pad hits with 0s
    const paddedHits = hits?.toString().padStart(padding, '0');

    const svgImage = `<?xml version='1.0'?>
    <svg xmlns='http://www.w3.org/2000/svg' width='80' height='20'>
      <rect x='0' width='90' height='20' fill='${hexBackground}'/>
      <g fill='${hexColor}' text-anchor='middle' font-family='RobotoMono,Oswald,sans-serif' font-size='20' font-weight='Normal'>
        <text x='40' y='19'>${paddedHits}</text>
      </g>
    </svg>`;

    // res
    //   .status(200)
    //   .setHeader('Content-Type', 'image/svg+xml')
    //   .send(svgImage);
    return new NextResponse(svgImage, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error) {
    const svgError = `<?xml version='1.0'?>
    <svg
      className='fill-indian-khaki-600'
      width='20px'
      height='20px'
      viewBox='0 0 512 512'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      fill='#000000'
    >
      <g strokeWidth='0'></g>
      <g strokeLinecap='round' strokeLinejoin='round'></g>
      <g>
        <title>error</title>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g
            id='add'
            fill='#000000'
            transform='translate(42.666667, 42.666667)'
          >
            <path
              d='M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z'
              id='error'
            ></path>
          </g>
        </g>
      </g>
    </svg>`;
    console.log(error);

    return new NextResponse(svgError, {
      status: 500,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }
};

// https://github.com/dasveloper/Hitcount.app
