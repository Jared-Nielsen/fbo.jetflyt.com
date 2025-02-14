import { useState } from 'react';
import { FormField } from '../shared/FormField';
import { FormSelect } from '../shared/FormSelect';
import { useTransitTypes } from '../../hooks/useTransitTypes';
import type { Route, TransitType } from '../../types/trip';

interface RouteFormProps {
  initialData?: Route;
  onSubmit: (data: Omit<Route, 'id' | 'auth_id' | 'created_at' | 'updated_at' | 'legs'>) => Promise<void>;
  onCancel: () => void;
  tripId: string; // Add this prop
}

export function RouteForm({ initialData, onSubmit, onCancel, tripId }: RouteFormProps) {
  const { transitTypes, loading } = useTransitTypes();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    transit_type_id: initialData?.transit_type_id || '',
    trip_id: tripId,
    transit_type: initialData?.transit_type || null as TransitType | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTransitType = transitTypes.find(t => t.id === formData.transit_type_id);
    if (!selectedTransitType) {
      console.error('Transit type not found');
      return;
    }
    await onSubmit({
      ...formData,
      transit_type: selectedTransitType
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Route Name"
        name="name"
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />

      <FormSelect
        label="Transit Type"
        value={formData.transit_type_id}
        onChange={e => setFormData(prev => ({ ...prev, transit_type_id: e.target.value }))}
        required
      >
        <option value="">Select transit type</option>
        {transitTypes.map(type => (
          <option key={type.id} value={type.id}>
            {type.name.replace('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase())}
          </option>
        ))}
      </FormSelect>

      <FormField
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
      />

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'} Route
        </button>
      </div>
    </form>
  );
}