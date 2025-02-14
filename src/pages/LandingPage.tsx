
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, ClipboardList, Building, BarChart3 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { FBORegistrationModal } from '../components/fbo/FBORegistrationModal';
import { useFBOStatus } from '../hooks/useFBOStatus';
import { supabase } from '../lib/supabase';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';

interface SingleFBOResponse {
  id: string;
  status: string;
  fbos: {
    id: string;
    name: string;
  };
}

export default function LandingPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { status: fboStatus } = useFBOStatus();
  const [fboName, setFBOName] = useState<string | null>(null);
  const [selectedFBO] = useLocalStorage(STORAGE_KEYS.FBOS, null);
  
  useEffect(() => {
    const fetchAndCacheFBO = async () => {
      if (!user) return;
      
      try {
        const { data: rawData, error } = await supabase
          .from('user_fbos')
          .select(`
            id,
            status,
            fbos!inner (
              id,
              name
            )
          `)
          .eq('user_id', user.id)
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching FBO:', error);
          return;
        }

        // Ensure we're getting a single FBO response
        const data = rawData as unknown as SingleFBOResponse;

        if (data?.fbos) {
          const fboData = {
            id: data.fbos.id,
            name: data.fbos.name,
            status: data.status
          };
          
          // Cache in localStorage
          localStorage.setItem('jetflyt_fbo', JSON.stringify(fboData));
          setFBOName(data.fbos.name);
        }
      } catch (err) {
        console.error('Error in fetchAndCacheFBO:', err);
      }
    };

    fetchAndCacheFBO();
  }, [user]);

  const canAccessFeatures = fboStatus === 'approved';
  const isPending = fboStatus === 'requested';
  const canAccessFBOFeatures = selectedFBO !== null;

  return (
    <>
      <SEO 
        title="Welcome"
        description="Streamline your aviation fuel procurement process with JetFlyt's comprehensive tender management system."
      />
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <Plane className="h-20 w-20 mx-auto mb-8" />
            <h1 className="text-5xl font-bold mb-4">{t('landing.title')}</h1>
            <p className="text-xl mb-6">{t('landing.subtitle')}</p>
            
            {user && fboName && (
              <div className="text-lg mb-6">
                Welcome to <span className="font-semibold">{fboName}</span>
              </div>
            )}
            
            {user && !canAccessFeatures && !isPending && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                {t('fbo.registration.registerButton')}
              </button>
            )}
            
            {isPending && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md inline-block">
                {t('fbo.registration.pendingApproval')}
              </div>
            )}

            {user && canAccessFeatures && !selectedFBO && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md inline-block">
                Please select an FBO from the dropdown above to access features
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {user ? (
              <>
                {/* FBO-specific cards */}
                <div
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${
                    !canAccessFBOFeatures && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {canAccessFBOFeatures ? (
                    <Link to="/fbo/tender-requests" className="block">
                      <ClipboardList className="h-12 w-12 mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboTenders.title')}</h2>
                      <p>{t('landing.features.fboTenders.description')}</p>
                    </Link>
                  ) : (
                    <div>
                      <ClipboardList className="h-12 w-12 mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboTenders.title')}</h2>
                      <p>{t('landing.features.fboTenders.description')}</p>
                    </div>
                  )}
                </div>

                <div
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${
                    !canAccessFBOFeatures && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {canAccessFBOFeatures ? (
                    <Link to="/fbo/handling-requests" className="block">
                      <Building className="h-12 w-12 mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboHandling.title')}</h2>
                      <p>{t('landing.features.fboHandling.description')}</p>
                    </Link>
                  ) : (
                    <div>
                      <Building className="h-12 w-12 mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboHandling.title')}</h2>
                      <p>{t('landing.features.fboHandling.description')}</p>
                    </div>
                  )}
                </div>

                <div
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${
                    !canAccessFBOFeatures && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {canAccessFBOFeatures ? (
                    <Link to="/fbo/reports" className="block">
                      <BarChart3 className="h-12 w-12 mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboReports.title')}</h2>
                      <p>{t('landing.features.fboReports.description')}</p>
                    </Link>
                  ) : (
                    <div>
                      <BarChart3 className="h-12 w-12 mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboReports.title')}</h2>
                      <p>{t('landing.features.fboReports.description')}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                  <ClipboardList className="h-12 w-12 mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboTenders.title')}</h2>
                  <p className="mb-4">{t('landing.features.fboTenders.description')}</p>
                  <Link to="/auth/login" className="text-sm text-blue-300 hover:text-blue-200">
                    {t('landing.auth.signInCta')}
                  </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                  <Building className="h-12 w-12 mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboHandling.title')}</h2>
                  <p className="mb-4">{t('landing.features.fboHandling.description')}</p>
                  <Link to="/auth/login" className="text-sm text-blue-300 hover:text-blue-200">
                    {t('landing.auth.signInCta')}
                  </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                  <BarChart3 className="h-12 w-12 mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">{t('landing.features.fboReports.title')}</h2>
                  <p className="mb-4">{t('landing.features.fboReports.description')}</p>
                  <Link to="/auth/login" className="text-sm text-blue-300 hover:text-blue-200">
                    {t('landing.auth.signInCta')}
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="mt-20 text-center">
            <img
              src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e"
              alt="Aircraft refueling"
              className="rounded-lg mx-auto max-w-4xl w-full object-cover h-96"
            />
          </div>
        </div>
      </div>

      <FBORegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}
