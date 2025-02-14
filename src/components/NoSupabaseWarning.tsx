import React from 'react';

const NoSupabaseWarning: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h2 className="font-medium text-yellow-800">Warning</h2>
        <p className="mt-2 text-sm text-yellow-700">
          Supabase is not configured. Please check your environment settings.
        </p>
      </div>
    </div>
  );
};

export default NoSupabaseWarning;
