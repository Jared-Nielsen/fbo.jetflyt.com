import { useState } from 'react';
import { AddTripModal } from '../dispatch/AddTripModal';
import type { Trip } from '../../types/trip';
import { useTranslation } from 'react-i18next';

interface TripFooterProps {
  trip?: Trip;
}

export function TripFooter({ trip }: TripFooterProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { t } = useTranslation();

  const handleTripAdded = async () => {
    setShowAddModal(false);
    window.location.reload();
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {trip && (
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {trip.name}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(trip.start_date).toLocaleDateString()}
                {trip.end_date && (
                  <> → {new Date(trip.end_date).toLocaleDateString()}</>
                )}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          {t('trip.management.newTrip')}
        </button>
      </div>

      <AddTripModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onTripAdded={handleTripAdded}
      />
    </div>
  );
}