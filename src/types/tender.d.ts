export interface Tender {
  id: string;
  auth_id: string;
  aircraft_id: string;
  icao_id: string;
  gallons: number;
  target_price: number;
  description: string;
  status: 'pending' | 'active' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  start_date?: string;
  end_date?: string;
  selected_fbos?: string[];
}