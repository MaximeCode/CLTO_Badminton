import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Gymnase } from '../../types/gymnasesType';

const PRIMARY = '#0153b6';
const SECONDARY = '#da9619';

// Fallback center on Orléans when no gyms are loaded yet
const ORLEANS_CENTER: [number, number] = [47.902, 1.909];

type GymnaseWithCoords = Gymnase & {
  latitude: number;
  longitude: number;
};

function isValidCoord(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function hasCoords(gym: Gymnase): gym is GymnaseWithCoords {
  return isValidCoord(gym.latitude) && isValidCoord(gym.longitude);
}

function createMarkerIcon(isSelected: boolean) {
  const color = isSelected ? SECONDARY : PRIMARY;

  return L.divIcon({
    className: 'gym-map-marker',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3" fill="#ffffff" stroke="none"/>
      </svg>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

function MapViewController({
  gyms,
  selectedGym,
}: {
  gyms: GymnaseWithCoords[];
  selectedGym: Gymnase | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedGym && hasCoords(selectedGym)) {
      map.flyTo([selectedGym.latitude, selectedGym.longitude], 16, { duration: 0.6 });
      return;
    }

    if (gyms.length === 0) return;

    const bounds = L.latLngBounds(gyms.map((g) => [g.latitude, g.longitude]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [56, 56], maxZoom: 14 });
    }
  }, [map, gyms, selectedGym]);

  return null;
}

export function GymMap({
  gyms,
  selectedGym,
  onSelectGym,
}: {
  gyms: Gymnase[];
  selectedGym: Gymnase | null;
  onSelectGym: (gym: Gymnase) => void;
}) {
  const validGyms = useMemo(() => gyms.filter(hasCoords), [gyms]);

  const center = useMemo((): [number, number] => {
    if (validGyms.length === 0) return ORLEANS_CENTER;
    const avgLat = validGyms.reduce((sum, g) => sum + g.latitude, 0) / validGyms.length;
    const avgLng = validGyms.reduce((sum, g) => sum + g.longitude, 0) / validGyms.length;
    return [avgLat, avgLng];
  }, [validGyms]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewController gyms={validGyms} selectedGym={selectedGym} />
      {validGyms.map((gym) => (
        <Marker
          key={gym.id}
          position={[gym.latitude, gym.longitude]}
          icon={createMarkerIcon(selectedGym?.id === gym.id)}
          eventHandlers={{
            click: () => onSelectGym(gym),
          }}
        >
          <Popup>
            <span className="font-semibold">{gym.nom}</span>
            <br />
            <span className="text-sm text-gray-600">{gym.adresse}</span>
            {gym.capacite_terrain != null && (
              <>
                <br />
                <span className="text-sm">
                  {gym.capacite_terrain} terrain{gym.capacite_terrain > 1 ? 's' : ''}
                </span>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
