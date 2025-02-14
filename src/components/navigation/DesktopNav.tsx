
import { Link } from 'react-router-dom';
import { LogOut, ClipboardList, Building, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/storage';

interface SelectedFBO {
  id: string;
  name: string;
  status: string;
}

export function DesktopNav() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [selectedFBO] = useLocalStorage<SelectedFBO | null>(STORAGE_KEYS.FBOS, null);

  return (
    <div className="hidden md:flex items-center">      
      <div className="flex items-center space-x-4">
        {user && (
          <>            
            <Link
              to="/fbo/tender-requests"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                selectedFBO ? 'hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={e => !selectedFBO && e.preventDefault()}
            >
              <ClipboardList className="h-4 w-4" />
              <span>{t('nav.fboTenders')}</span>
            </Link>

            <Link
              to="/fbo/handling-requests"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                selectedFBO ? 'hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={e => !selectedFBO && e.preventDefault()}
            >
              <Building className="h-4 w-4" />
              <span>{t('nav.fboHandling')}</span>
            </Link>

            <Link
              to="/fbo/reports"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                selectedFBO ? 'hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={e => !selectedFBO && e.preventDefault()}
            >
              <BarChart3 className="h-4 w-4" />
              <span>{t('nav.fboReports')}</span>
            </Link>

            <button
              onClick={() => signOut()}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              <LogOut className="h-4 w-4" />
              <span>{t('nav.signOut')}</span>
            </button>
          </>
        )}

        {!user && (
          <Link
            to="/auth/login"
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
          >
            <span>{t('nav.signIn')}</span>
          </Link>
        )}

        <LanguageSelector />
      </div>
    </div>
  );
}
