import { MapContainer, TileLayer } from 'react-leaflet';
import type { ICAO } from '../../types/icao';

interface CustomMapProps extends React.ComponentProps<typeof MapContainer> {
  children?: React.ReactNode;
  airports?: ICAO[];
}

export function LeafletMap({ children, airports, ...props }: CustomMapProps) {
  return (
    <MapContainer {...props}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
}