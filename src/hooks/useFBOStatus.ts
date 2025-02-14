
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useFBOStatus() {
  const { user } = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFBOStatus() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_fbos')
          .select('status')
          .eq('user_id', user.id)
          .maybeSingle(); // Changed from .single() to .maybeSingle()

        if (error) throw error;
        setStatus(data?.status || null);
      } catch (err) {
        console.error('Error checking FBO status:', err);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }

    checkFBOStatus();
  }, [user]);

  return {
    status,
    loading,
    isApproved: status === 'approved'
  };
}
