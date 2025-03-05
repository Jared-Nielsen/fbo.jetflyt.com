import type { FBOTender } from '../../types/tender';
import { TenderStatus } from './TenderStatus';
import { formatCurrency } from '../../utils/format';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

interface TenderRequestRowProps {
  tender: FBOTender;
  onUpdate?: () => void; // Add callback prop
}

export function TenderRequestRow({ tender, onUpdate }: TenderRequestRowProps) {
  const [priceInput, setPriceInput] = useState(tender.counter_price ? tender.counter_price.toString() : '');
  const [taxesInput, setTaxesInput] = useState(tender.counter_taxes_and_fees ? tender.counter_taxes_and_fees.toString() : '');
  const [totalCost, setTotalCost] = useState(tender.counter_total_cost || null);
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const price = parseFloat(priceInput);
    const taxes = parseFloat(taxesInput) || 0;
    const gallons = tender.tender?.gallons || 0;
    
    if (!isNaN(price)) {
      const newTotal = (price * gallons) + taxes;
      setTotalCost(newTotal);
    } else {
      setTotalCost(null);
    }
  }, [priceInput, taxesInput, tender.tender?.gallons]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const { error } = await supabase
        .rpc('update_fbo_tender', {
          p_tender_id: tender.id,
          p_status: 'submitted',
          p_counter_price: parseFloat(priceInput),
          p_taxes_and_fees: parseFloat(taxesInput) || 0
        });

      if (error) throw error;
      
      onUpdate?.();
    } catch (error) {
      console.error('Error updating tender:', error);
      window.alert(t('common.errors.updateFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  const getAircraftDisplay = () => {
    const aircraft = tender.tender?.aircraft;
    if (!aircraft) return '-';
    return `${aircraft.tail_number} - ${aircraft.manufacturer} ${aircraft.model}`;
  };

  const canSubmit = parseFloat(priceInput) > 0 && !submitting && tender.status === 'pending';

  return (
    <tr>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
        {getAircraftDisplay()}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
        {tender.tender?.gallons?.toLocaleString() || '-'} gal
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm w-72">
        <input
          type="number"
          step="0.01"
          min="0"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          placeholder="Enter per gallon price"
          disabled={tender.status !== 'pending'}
        />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm w-48">
        <input
          type="number"
          step="0.01"
          min="0"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          value={taxesInput}
          onChange={(e) => setTaxesInput(e.target.value)}
          placeholder="Enter taxes"
          disabled={tender.status !== 'pending'}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
        {totalCost !== null ? formatCurrency(totalCost) : '-'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <TenderStatus status={tender.status || 'pending'} />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            canSubmit
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </td>
    </tr>
  );
}
