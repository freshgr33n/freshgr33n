import { REGIONS } from '../data/stores';
import type { Region } from '../data/types';

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance in km between two lat/lon points. */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Finds the closest seed region to a given lat/lon (used with browser geolocation). */
export function nearestRegion(lat: number, lon: number): Region {
  let best = REGIONS[0];
  let bestDist = Infinity;
  for (const region of REGIONS) {
    const d = haversineKm(lat, lon, region.lat, region.lon);
    if (d < bestDist) {
      bestDist = d;
      best = region;
    }
  }
  return best;
}
