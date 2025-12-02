// Alternative 2: Client-side location using browser geolocation
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = await request.json();

    // Use a geocoding service to get city name from coordinates
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );

    const data = await response.json();

    return NextResponse.json({
      city: data.city || data.locality || 'Unknown',
      country: data.countryName || 'Unknown',
      region: data.principalSubdivision || 'Unknown',
      coordinates: { latitude, longitude },
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to get location: ${error}` }, { status: 500 });
  }
}
