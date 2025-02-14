export interface ICAO {
  id: string;
  code: string;
  name: string;
  state?: string;
  country?: string;
  latitude: number;
  longitude: number;
  icao_type?: {
    id: string;
    name: string;
    description?: string;
  };
}