import type { ICAO } from '../../types/icao';

interface TableRowProps {
  airport: ICAO;
}

export function TableRow({ airport }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {airport.code}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {airport.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {airport.state}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {airport.latitude != null ? airport.latitude.toFixed(4) : 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {airport.longitude != null ? airport.longitude.toFixed(4) : 'N/A'}
      </td>
    </tr>
  );
}