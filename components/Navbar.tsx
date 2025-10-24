import React from 'react';
import { ActiveTab } from '../types';
import { IconBook, IconSwitch, IconUser, IconLogo } from './Icons';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const NavItem: React.FC<{
  label: string;
  tab: ActiveTab;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  children: React.ReactNode;
}> = ({ label, tab, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-green-100 text-primary'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
};

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <IconLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-slate-800">GESTRA</span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <NavItem label="Learn" tab="learn" activeTab={activeTab} setActiveTab={setActiveTab}>
            <IconBook className="h-5 w-5" />
          </NavItem>
          <NavItem label="Translate" tab="translate" activeTab={activeTab} setActiveTab={setActiveTab}>
            <IconSwitch className="h-5 w-5" />
          </NavItem>
          <NavItem label="Profile" tab="profile" activeTab={activeTab} setActiveTab={setActiveTab}>
            <IconUser className="h-5 w-5" />
          </NavItem>
        </div>
        <div className="md:hidden">
            {/* Mobile menu button could be added here */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;