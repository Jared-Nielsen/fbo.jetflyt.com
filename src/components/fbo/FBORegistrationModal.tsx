
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { SearchableSelect } from '../shared/SearchableSelect';
import { useFBOData } from '../../hooks/useFBOData';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import type { FBO } from '../../types/fbo';

interface FBORegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function FBORegistrationModal({ isOpen, onClose, onSuccess }: FBORegistrationModalProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: fbos, loading, error } = useFBOData();
  const [selectedFBO, setSelectedFBO] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFBO || !user) return;

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('user_fbos')
        .insert([{ 
          fbo_id: selectedFBO,
          user_id: user.id
        }]);

      if (error) throw error;
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error registering FBO:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const options = fbos?.map((fbo: FBO) => ({
    id: fbo.id,
    label: fbo.name,
    sublabel: fbo.icao?.code || '',
  })) || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('fbo.registration.title')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <SearchableSelect
          options={options}
          value={selectedFBO}
          onChange={setSelectedFBO}
          label={t('fbo.registration.selectFBO')}
          placeholder={t('fbo.registration.searchPlaceholder')}
          disabled={loading || submitting}
        />

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={submitting}
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={!selectedFBO || submitting}
          >
            {submitting ? t('common.submitting') : t('common.submit')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
