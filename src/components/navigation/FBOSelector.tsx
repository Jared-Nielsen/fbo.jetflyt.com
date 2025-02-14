
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/storage';

interface FBOResponse {
  id: string;
  status: string;
  fbos: {
    id: string;
    name: string;
  } | null;
}

interface SelectedFBO {
  id: string;
  name: string;
  status: string;
}

export function FBOSelector() {
  const { user } = useAuth();
  const [selectedFBO, setSelectedFBO] = useLocalStorage<SelectedFBO | null>(STORAGE_KEYS.FBOS, null);

  useEffect(() => {
    const fetchFBOs = async () => {
      if (!user) return;

      try {
        const { data: rawData, error } = await supabase
          .from('user_fbos')
          .select(`
            id,
            status,
            fbos (
              id,
              name
            )
          `)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching FBOs:', error);
          return;
        }

        if (rawData) {
          const data = rawData as unknown as FBOResponse[];
          const fbos = data
            .map(item => ({
              id: item.fbos?.id || item.id,
              name: item.fbos?.name || '',
              status: item.status
            }))
            .filter(fbo => fbo.name);
          
          if (!selectedFBO && fbos.length > 0) {
            const defaultFBO = fbos.find(fbo => fbo.status === 'approved') || fbos[0];
            console.log('Setting default FBO:', defaultFBO);
            setSelectedFBO(defaultFBO);
          }
        }
      } catch (err) {
        console.error('Error in fetchFBOs:', err);
      }
    };

    fetchFBOs();
  }, [user, setSelectedFBO]);

  if (!user || !selectedFBO) return null;

  return (
    <div className="text-sm font-medium text-white">
      {selectedFBO.name}
    </div>
  );
}
