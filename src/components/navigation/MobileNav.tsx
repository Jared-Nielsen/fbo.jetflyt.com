
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, ClipboardList, Building, BarChart3 } from 'lucide-react';
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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [selectedFBO] = useLocalStorage<SelectedFBO | null>(STORAGE_KEYS.FBOS, null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden flex items-center space-x-2">
      <LanguageSelector />
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 inset-x-0 bg-blue-900 shadow-lg z-[99]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && (
              <>
                <Link
                  to="/fbo/tender-requests"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full ${
                    selectedFBO ? 'hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!selectedFBO) {
                      e.preventDefault();
                    } else {
                      toggleMenu();
                    }
                  }}
                >
                  <ClipboardList className="h-5 w-5" />
                  <span>{t('nav.fboTenders')}</span>
                </Link>

                <Link
                  to="/fbo/handling-requests"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full ${
                    selectedFBO ? 'hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!selectedFBO) {
                      e.preventDefault();
                    } else {
                      toggleMenu();
                    }
                  }}
                >
                  <Building className="h-5 w-5" />
                  <span>{t('nav.fboHandling')}</span>
                </Link>

                <Link
                  to="/fbo/reports"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full ${
                    selectedFBO ? 'hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!selectedFBO) {
                      e.preventDefault();
                    } else {
                      toggleMenu();
                    }
                  }}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>{t('nav.fboReports')}</span>
                </Link>

                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('nav.signOut')}</span>
                </button>
              </>
            )}

            {!user && (
              <Link
                to="/auth/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 w-full"
                onClick={toggleMenu}
              >
                <span>{t('nav.signIn')}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
