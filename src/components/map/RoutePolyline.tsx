import { Polyline, Popup } from 'react-leaflet';
import type { Leg, Route } from '../../types/trip';
import { LegPopup } from './LegPopup';
import type { LatLngTuple } from 'leaflet';

interface RoutePolylineProps {
  leg: Leg;
  route: Route;
  color: string;
}

export function RoutePolyline({ leg, route, color }: RoutePolylineProps) {
  const coordinates: [LatLngTuple, LatLngTuple] = [
    [leg.origin.latitude, leg.origin.longitude],
    [leg.destination.latitude, leg.destination.longitude]
  ];

  return (
    <Polyline
      positions={coordinates}
      pathOptions={{ color, weight: 3, opacity: 0.8 }}
    >
      <Popup>
        <LegPopup 
          leg={leg} 
          transitCategory={route.transit_type.category}
          transitType={route.transit_type}
        />
      </Popup>
    </Polyline>
  );
}