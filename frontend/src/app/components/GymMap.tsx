import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

export interface GymMapGym {
  id: number;
  name: string;
  address: string;
  courts: number;
  lat: number;
  lng: number;
}

const PRIMARY = '#0153b6';
const SECONDARY = '#da9619';

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
  gyms: GymMapGym[];
  selectedGym: GymMapGym | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedGym) {
      map.flyTo([selectedGym.lat, selectedGym.lng], 16, { duration: 0.6 });
      return;
    }

    if (gyms.length === 0) return;

    const bounds = L.latLngBounds(gyms.map((gym) => [gym.lat, gym.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 14 });
  }, [map, gyms, selectedGym]);

  return null;
}

export function GymMap({
  gyms,
  selectedGym,
  onSelectGym,
}: {
  gyms: GymMapGym[];
  selectedGym: GymMapGym | null;
  onSelectGym: (gym: GymMapGym) => void;
}) {
  const center = useMemo(() => {
    const avgLat = gyms.reduce((sum, gym) => sum + gym.lat, 0) / gyms.length;
    const avgLng = gyms.reduce((sum, gym) => sum + gym.lng, 0) / gyms.length;
    return [avgLat, avgLng] as [number, number];
  }, [gyms]);

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
      <MapViewController gyms={gyms} selectedGym={selectedGym} />
      {gyms.map((gym) => (
        <Marker
          key={gym.id}
          position={[gym.lat, gym.lng]}
          icon={createMarkerIcon(selectedGym?.id === gym.id)}
          eventHandlers={{
            click: () => onSelectGym(gym),
          }}
        >
          <Popup>
            <span className="font-semibold">{gym.name}</span>
            <br />
            <span className="text-sm text-gray-600">{gym.address}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
