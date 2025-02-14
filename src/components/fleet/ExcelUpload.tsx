import { Aircraft } from '../../types/aircraft';
import * as XLSX from 'xlsx';

export function ExcelUpload({ onUpload }: { onUpload: (data: Aircraft[]) => void }) {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const aircraftData = jsonData.map((row: any) => ({
        tail_number: row.tail_number || '',
        type_id: row.type_id || '',
        manufacturer: row.manufacturer || '',
        model: row.model || '',
        year: Number(row.year) || 0,
        max_range: Number(row.max_range) || 0,
        fuel_type_id: row.fuel_type_id || '',
        fuel_capacity: Number(row.fuel_capacity) || 0,
        engine_type_id: row.engine_type_id || '',
        latitude: Number(row.latitude) || 0,
        longitude: Number(row.longitude) || 0
      }));

      onUpload(aircraftData as Aircraft[]);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Upload Excel File</label>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
}
