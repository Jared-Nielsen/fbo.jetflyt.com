
import { MobileNav } from './navigation/MobileNav';
import { DesktopNav } from './navigation/DesktopNav';
import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-[9999] shadow-md w-full">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Plane className="h-8 w-8" />
            <span className="font-bold text-xl">JetFlyt</span>
          </Link>
          <div className="flex items-center space-x-4">
            <DesktopNav />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
