import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: 'dashboard', pathKey: 'inicio' },
  { to: '/facturas', label: 'Facturas', icon: 'receipt_long', pathKey: 'facturas' },
  { to: '/presupuestos', label: 'Presupuestos', icon: 'pie_chart', pathKey: 'presupuestos' },
  { to: '/informes', label: 'Informes', icon: 'bar_chart', pathKey: 'informes' },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(13,28,47,0.04)]"
      data-active-classes="text-secondary font-bold scale-105"
    >
      <div className="flex justify-around items-center h-16 px-space-xs max-w-2xl mx-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.pathKey}
            to={item.to}
            end={item.to === '/'}
            data-path={item.pathKey}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[64px] h-12 transition-all ${
                isActive
                  ? 'text-secondary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
            <span className="font-label-sm text-label-sm mt-0.5">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
