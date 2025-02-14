
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { formatCurrency, formatNumber } from '../../utils/format';

interface KPIData {
  totalTenders: number;
  acceptedTenders: number;
  totalGallons: number;
  averagePrice: number;
  winRate: number;
}

interface CachedFBO {
  id: string;
  name: string;
  status: string;
}

export function FBOKPIMetrics() {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cachedFBO, setCachedFBO] = useState<CachedFBO | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Get FBO from localStorage
    const storedFBO = localStorage.getItem('jetflyt_fbo');
    if (storedFBO) {
      setCachedFBO(JSON.parse(storedFBO));
    }
  }, []);

  useEffect(() => {
    const fetchKPIData = async () => {
      if (!cachedFBO?.id) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching KPI data for FBO:', cachedFBO.id);
        
        // Get FBO tenders directly without checking user_fbos
        const { data: tenders, error } = await supabase
          .from('fbo_tenders')
          .select(`
            *,
            tender:tenders (
              gallons
            )
          `)
          .eq('fbo_id', cachedFBO.id);

        if (error) {
          console.error('Error fetching FBO tenders:', error);
          throw error;
        }

        const kpiData: KPIData = {
          totalTenders: tenders.length,
          acceptedTenders: tenders.filter(t => t.status === 'accepted').length,
          totalGallons: tenders.reduce((sum, t) => sum + (t.tender?.gallons || 0), 0),
          averagePrice: tenders.reduce((sum, t) => sum + (t.offer_price || 0), 0) / (tenders.length || 1),
          winRate: (tenders.filter(t => t.status === 'accepted').length / (tenders.length || 1)) * 100
        };

        console.log('Calculated KPI data:', kpiData);
        setData(kpiData);
      } catch (err) {
        console.error('Error fetching KPI data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIData();
  }, [cachedFBO]);

  if (!cachedFBO?.id) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-yellow-400">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please select an FBO to view metrics
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const metrics = [
    {
      label: t('fbo.reports.metrics.totalTenders'),
      value: formatNumber(data.totalTenders),
      description: t('fbo.reports.metrics.totalTendersDesc')
    },
    {
      label: t('fbo.reports.metrics.acceptedTenders'),
      value: formatNumber(data.acceptedTenders),
      description: t('fbo.reports.metrics.acceptedTendersDesc')
    },
    {
      label: t('fbo.reports.metrics.totalGallons'),
      value: formatNumber(data.totalGallons),
      description: t('fbo.reports.metrics.totalGallonsDesc')
    },
    {
      label: t('fbo.reports.metrics.averagePrice'),
      value: formatCurrency(data.averagePrice),
      description: t('fbo.reports.metrics.averagePriceDesc')
    },
    {
      label: t('fbo.reports.metrics.winRate'),
      value: `${data.winRate.toFixed(1)}%`,
      description: t('fbo.reports.metrics.winRateDesc')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">{metric.label}</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</div>
          <div className="mt-1 text-sm text-gray-500">{metric.description}</div>
        </div>
      ))}
    </div>
  );
}
