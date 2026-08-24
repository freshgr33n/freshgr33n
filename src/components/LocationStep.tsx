import { useState } from 'react';
import { REGIONS } from '../data/stores';
import { STATE_NAMES, STATE_TO_REGION } from '../data/states';
import { nearestRegion } from '../lib/geo';
import type { Region } from '../data/types';

export default function LocationStep({ onSelect }: { onSelect: (region: Region, sourceLabel: string) => void }) {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState('');

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support geolocation. Pick your state instead.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const region = nearestRegion(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
        onSelect(region, 'your current location');
      },
      () => {
        setLocating(false);
        setError('Location access was denied. Pick your state below instead.');
      },
      { timeout: 8000 },
    );
  }

  function handleStateChange(code: string) {
    setSelectedState(code);
    const regionId = STATE_TO_REGION[code];
    const region = REGIONS.find((r) => r.id === regionId);
    if (region) onSelect(region, STATE_NAMES[code]);
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">Where are you shopping?</h2>
      <p className="text-stone-500 dark:text-stone-400 mb-6">
        We'll match grocery prices to your area's cost of living and the stores near you.
      </p>

      <button
        onClick={useMyLocation}
        disabled={locating}
        className="w-full rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 px-4 transition-colors"
      >
        {locating ? 'Locating…' : '📍 Use my current location'}
      </button>

      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
        <span className="text-xs uppercase tracking-wide text-stone-400">or</span>
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
      </div>

      <label className="block text-left text-sm font-medium mb-1" htmlFor="state-select">
        Choose your state
      </label>
      <select
        id="state-select"
        value={selectedState}
        onChange={(e) => handleStateChange(e.target.value)}
        className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 py-3 px-4 text-stone-900 dark:text-stone-100"
      >
        <option value="" disabled>
          Select a state…
        </option>
        {Object.entries(STATE_NAMES)
          .sort((a, b) => a[1].localeCompare(b[1]))
          .map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
      </select>

      <p className="text-xs text-stone-400 mt-6">
        Prices are modeled averages by region, not live store feeds — a solid planning estimate, not a receipt.
      </p>
    </div>
  );
}
