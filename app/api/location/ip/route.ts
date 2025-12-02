// Alternative 3: External IP geolocation service
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Use external service for more detailed location data
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    return NextResponse.json({
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      region: data.region || 'Unknown',
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      timezone: data.timezone,
      ip: data.ip,
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to get location: ${error}` }, { status: 500 });
  }
}
