
import { useTranslation } from 'react-i18next';
import type { FBOTender } from '../../types/tender';
import { TenderRequestRow } from './TenderRequestRow';

interface TenderRequestTableProps {
  tenders: FBOTender[];
}

export function TenderRequestTable({ tenders }: TenderRequestTableProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {t('fbo.tenderRequests.table.aircraft')}
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {t('fbo.tenderRequests.table.quantity')}
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Counter Price
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Taxes & Fees
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Total Cost
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {t('fbo.tenderRequests.table.status')}
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tenders.map((tender) => (
                <TenderRequestRow 
                  key={tender.id} 
                  tender={tender}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
