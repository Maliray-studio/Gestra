import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto py-4 px-4 md:px-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GESTRA. AI for Accessible Communication.</p>
      </div>
    </footer>
  );
};

export default Footer;