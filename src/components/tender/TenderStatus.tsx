
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TenderStatusProps {
  status: string;
}

export function TenderStatus({ status }: TenderStatusProps) {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'submitted':
        return <Clock className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon(status)}
      <span>
        {t(`fbo.tenderRequests.status.${status}`)}
      </span>
    </div>
  );
}
