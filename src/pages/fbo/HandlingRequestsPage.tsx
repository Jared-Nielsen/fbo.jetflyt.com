
import { SEO } from '../../components/SEO';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

type CachedFBO = {
  id: string;
  name: string;
  status: string;
};

export default function HandlingRequestsPage() {
  const { t } = useTranslation();
  const [cachedFBO, setCachedFBO] = useState<CachedFBO | null>(null);

  useEffect(() => {
    // Get FBO from localStorage
    const storedFBO = localStorage.getItem('jetflyt_fbo');
    if (storedFBO) {
      setCachedFBO(JSON.parse(storedFBO));
    }
  }, []);

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
                Please select an FBO from the dropdown in the header to view handling requests
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
        title={t('fbo.handlingRequests.title')}
        description={t('fbo.handlingRequests.description')}
      />
      <h1 className="text-2xl font-semibold text-gray-900">{t('fbo.handlingRequests.title')}</h1>
      <p className="mt-2 text-sm text-gray-700">{t('fbo.handlingRequests.description')}</p>
    </div>
  );
}
