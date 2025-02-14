import { SEO } from '../components/SEO';
import { KPIMetrics } from '../components/reports/KPIMetrics';
import { TenderStatusChart } from '../components/reports/TenderStatusChart';
import { ServiceTenderStatusChart } from '../components/reports/ServiceTenderStatusChart';
import { useTranslation } from 'react-i18next';

export default function ReportsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO 
        title={t('reports.title')}
        description={t('reports.description')}
      />
      <h1 className="text-2xl font-semibold text-gray-900">{t('reports.title')}</h1>
      <p className="mt-2 text-sm text-gray-700">{t('reports.description')}</p>

      <div className="mt-8">
        <KPIMetrics />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">{t('reports.tenderStatus')}</h2>
        <TenderStatusChart />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">{t('reports.serviceTenderStatus')}</h2>
        <ServiceTenderStatusChart />
      </div>
    </div>
  );
}
