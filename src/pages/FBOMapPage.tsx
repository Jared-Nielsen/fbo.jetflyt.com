import { useState, useEffect } from 'react';
import { TripFooter } from '../components/map/TripFooter';
import { SEO } from '../components/SEO';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { useTranslation } from 'react-i18next';
import type { Trip } from '../types/trip';
import { useTrip } from '../hooks/useTrip';

export default function FBOMapPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { t } = useTranslation();
  const { trips } = useTrip();

  // Set the first trip as selected when trips are loaded
  useEffect(() => {
    if (trips && trips.length > 0 && !selectedTrip) {
      setSelectedTrip(trips[0]);
    }
  }, [trips, selectedTrip]);

  if (!selectedTrip) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SEO 
        title={t('fboMap.title')}
        description={t('fboMap.subtitle')}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">{t('fboMap.title')}</h1>
        <p className="mt-2 text-sm text-gray-700">{t('fboMap.subtitle')}</p>
        <TripFooter trip={selectedTrip} />
      </div>
    </>
  );
}