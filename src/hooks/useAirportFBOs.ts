import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { FBO } from '../types/fbo';

export function useAirportFBOs(icaoId: string) {
  const [fbos, setFbos] = useState<FBO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFBOs() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('fbos')
          .select(`
            id,
            name,
            icao_id,
            latitude,
            longitude,
            address,
            country,
            state
          `)
          .eq('icao_id', icaoId);

        if (supabaseError) throw supabaseError;
        
        const typedData: FBO[] = data?.map(item => ({
          id: item.id,
          name: item.name,
          icao_id: item.icao_id,
          latitude: item.latitude,
          longitude: item.longitude,
          address: item.address,
          country: item.country,
          state: item.state
        })) || [];
        
        setFbos(typedData);
      } catch (err) {
        console.error('Error fetching FBOs:', err);
        setError('Failed to load FBO data');
      } finally {
        setLoading(false);
      }
    }

    if (icaoId) {
      fetchFBOs();
    }
  }, [icaoId]);

  return { fbos, loading, error };
}