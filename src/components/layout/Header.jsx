import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFinance } from '../../context/FinanceContext';

const SECTION_NAMES = {
  '/': 'Inicio',
  '/facturas': 'Facturas',
  '/presupuestos': 'Presupuestos',
  '/informes': 'Informes',
};

export default function Header() {
  const location = useLocation();
  const { resetDemoData, showToast, state } = useFinance();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentSubtitle = SECTION_NAMES[location.pathname] || 'Inicio';
  const pendingBillsCount = state.bills.filter((b) => b.status !== 'pagado').length;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-gutter max-w-2xl mx-auto flex items-center justify-between relative">
        <div className="flex items-center gap-space-sm">
          <img
            alt="Koinly Finance Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/ALJJyrBt7CUW-00uUb5z06mRNAJTiWEr0YizSxkZdFTpANrlhSXx93Mad_5GkfCY7Ad-yo1DX8Cqljsp29TL3AqMCWYMrUGeqrUKFdbrRLd0WvkRD4pLsaOWyAyWJ7FRKGSRg1TOpENrPqwZBl1AZ5EHu5bHqGGuwQ8Gia5J0pZ7X-9RUxUwQQ1Slf9TlGRvVL2yrzYTr6QaTHSQlatV_ygEbllzJ9Cp7xDWwwL_jBMpi-hS"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-none tracking-tight">
              FinTrack
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
              {currentSubtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Notificaciones"
            onClick={() =>
              showToast(
                pendingBillsCount > 0
                  ? `Tienes ${pendingBillsCount} facturas pendientes por vencer este mes`
                  : 'Estás al día con todos tus compromisos financieros'
              )
            }
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {pendingBillsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error"></span>
            )}
          </button>

          <button
            aria-label="Perfil"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnrGVgmLwQjmUG7xYQL7KgLI2hPVj_Y0tpw9j3cStnyAKzqvc-ZdZOpXb9U5JNrvUeRSXFBLsAScxZrw2qiTfVM_XJcwvGDzxbr6YalgiQhn0WgKj9u4h7O-HKeEH8GTzLjsHjxbf5sKygYA98h3l7TaXehI4f_Fvefp3rtMHwNI7wMnMAX6w-Dx4o7HSkxJpS5u33fNHHnzbnxCvig12QCePdNDh7_bC4FFbJUfI"
            />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute right-4 top-16 w-60 rounded-xl bg-surface-container-lowest shadow-lg border border-outline-variant/40 p-2 z-50">
            <div className="px-3 py-2 border-b border-surface-container">
              <p className="font-label-lg text-label-lg text-on-surface font-bold">Alex — Kinetic Capital</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Cuenta Personal COP</p>
            </div>
            <button
              onClick={() => {
                resetDemoData();
                setMenuOpen(false);
              }}
              className="w-full mt-1 px-3 py-2 rounded-lg text-left font-label-md text-label-md text-on-surface hover:bg-surface-container-low flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">restart_alt</span>
              Restaurar datos del prototipo
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
