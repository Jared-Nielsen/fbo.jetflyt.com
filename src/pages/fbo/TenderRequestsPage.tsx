
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { SEO } from '../../components/SEO';
import type { FBOTender } from '../../types/tender';
import { TenderRequestTable } from '../../components/tender/TenderRequestTable';

type CachedFBO = {
  id: string;
  name: string;
  status: string;
};

export default function TenderRequestsPage() {
  const { t } = useTranslation();
  const [tenders, setTenders] = useState<FBOTender[]>([]);
  const [loading, setLoading] = useState(true);
  const [cachedFBO, setCachedFBO] = useState<CachedFBO | null>(null);

  useEffect(() => {
    // Get FBO from localStorage
    const storedFBO = localStorage.getItem('jetflyt_fbo');
    if (storedFBO) {
      setCachedFBO(JSON.parse(storedFBO));
    }
  }, []);

  useEffect(() => {
    const fetchTenders = async () => {
      if (!cachedFBO?.id) {
        setTenders([]);
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching tenders for FBO:', cachedFBO.id);
        
        const { data, error } = await supabase
          .from('fbo_tenders')
          .select(`
            *,
            tender:tenders (
              id,
              auth_id,
              gallons,
              aircraft:aircraft_id (
                id,
                tail_number,
                manufacturer,
                model
              )
            )
          `)
          .eq('fbo_id', cachedFBO.id);

        if (error) {
          console.error('Error fetching tenders:', error);
          return;
        }

        console.log('Fetched tenders with relations:', data);
        setTenders(data || []);
      } catch (err) {
        console.error('Error fetching tenders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, [cachedFBO]); // Add cachedFBO to dependencies

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!cachedFBO?.id) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please select an FBO from the dropdown in the header to view tender requests
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO 
        title={t('fbo.tenderRequests.title')}
        description={t('fbo.tenderRequests.description')}
      />
      
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('fbo.tenderRequests.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('fbo.tenderRequests.description')}
          </p>
        </div>
      </div>

      {tenders.length === 0 ? (
        <p className="mt-4 text-gray-500 text-center">
          {t('fbo.tenderRequests.noRequests')}
        </p>
      ) : (
        <TenderRequestTable 
          tenders={tenders}
        />
      )}
    </div>
  );
}
