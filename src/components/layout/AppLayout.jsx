import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import ActionModals from '../modals/ActionModals';
import { useFinance } from '../../context/FinanceContext';

export default function AppLayout() {
  const { toast } = useFinance();

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col relative w-full max-w-2xl mx-auto pt-16 pb-24 bg-surface min-h-screen">
        <Outlet />
      </main>
      <ActionModals />
      {/* Global Toast Notification */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-surface-container-lowest px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-body-sm text-body-sm transition-opacity duration-300 ${
          toast.visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">verified</span>
        <span>{toast.message}</span>
      </div>
      <BottomNav />
    </div>
  );
}
