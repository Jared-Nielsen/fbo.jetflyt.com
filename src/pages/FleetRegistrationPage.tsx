import { useState } from 'react';
import { AircraftForm } from '../components/fleet/AircraftForm';
import { AircraftList } from '../components/fleet/AircraftList';
import { useAircraft } from '../hooks/useAircraft';
import { SEO } from '../components/SEO';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { useTranslation } from 'react-i18next';

export default function FleetRegistrationPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { aircraft, loading, error, addAircraft, updateAircraft, deleteAircraft, refresh } = useAircraft();
  const { t } = useTranslation();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SEO 
        title={t('fleet.title')}
        description={t('fleet.subtitle')}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{t('fleet.title')}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {t('fleet.subtitle')}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {t('fleet.addAircraft')}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="mt-8">
          {showAddForm ? (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {t('fleet.form.add')}
                </h2>
                <AircraftForm
                  onSubmit={async (data) => {
                    await addAircraft(data);
                    setShowAddForm(false);
                    refresh();
                  }}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          ) : (
            <AircraftList
              aircraft={aircraft}
              onEdit={async (aircraft) => {
                await updateAircraft(aircraft.id, aircraft);
                refresh();
              }}
              onDelete={async (id) => {
                await deleteAircraft(id);
                refresh();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}