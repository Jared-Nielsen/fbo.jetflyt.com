
import { useState, useEffect } from 'react';
import { CACHE_DURATION } from '../utils/storage';

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export function useLocalStorageCache<T>(
  key: string,
  fetchData: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Try to get from cache first
        const cached = localStorage.getItem(key);
        if (cached) {
          try {
            const { data: cachedData, timestamp }: CacheData<T> = JSON.parse(cached);
            const now = Date.now();
            
            // Check if cache is still valid and contains data
            if (cachedData && now - timestamp < CACHE_DURATION) {
              setData(cachedData);
              setLoading(false);
              return;
            }
          } catch (parseError) {
            console.error(`Error parsing cache for ${key}:`, parseError);
            // Continue to fetch fresh data if parse fails
          }
        }

        // Fetch fresh data
        const freshData = await fetchData();
        if (!freshData) {
          throw new Error('No data received');
        }
        
        // Save to cache
        const cacheData: CacheData<T> = {
          data: freshData,
          timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
        
        setData(freshData);
      } catch (err) {
        console.error(`Error loading ${key}:`, err);
        setError(`Failed to load ${key}`);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, dependencies);

  return { data, loading, error };
}
