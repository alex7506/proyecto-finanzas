import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    state,
    isBalanceHidden,
    togglePrivacy,
    markBillAsPaid,
    setActiveModal,
    showToast,
  } = useFinance();

  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const urgentBill =
    state.bills.find((b) => b.status === 'urgente') ||
    state.bills.find((b) => b.status === 'pendiente');

  const visibleTransactions = showAllTransactions
    ? state.transactions
    : state.transactions.slice(0, 4);

  return (
    <div className="flex flex-col w-full px-gutter space-y-space-md">
      {/* 1. TARJETA PRINCIPAL: BALANCE TOTAL DISPONIBLE */}
      <div className="relative overflow-hidden rounded-xl bg-primary-container text-surface-container-lowest p-space-md shadow-md">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-tertiary-fixed-dim/15 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col space-y-space-md">
          {/* Encabezado de la tarjeta con Switch de privacidad */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider">
                Balance Total Disponible
              </span>
              <button
                aria-label="Ocultar o mostrar balance"
                onClick={togglePrivacy}
                className="w-7 h-7 flex items-center justify-center rounded-full text-on-primary-container hover:text-surface-container-lowest transition-colors"
                id="toggle-privacy-btn"
              >
                <span className="material-symbols-outlined text-[18px]" id="eye-icon">
                  {isBalanceHidden ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/10 text-tertiary-fixed-dim font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +{state.monthlyGrowthPercent}% este mes
            </span>
          </div>

          {/* Cifra destacada */}
          <div className="flex items-baseline gap-space-xs">
            <span
              className="font-headline-xl-mobile text-headline-xl-mobile font-bold tracking-tight text-surface-container-lowest tabular-nums"
              id="main-balance"
            >
              {isBalanceHidden ? '••••••••' : formatCurrency(state.balance)}{' '}
              <span className="font-label-md text-label-md text-on-primary-container font-medium">
                COP
              </span>
            </span>
          </div>

          {/* Micro desglose: Ingresos vs Gastos */}
          <div className="grid grid-cols-2 gap-space-xs pt-space-xs">
            <div className="flex items-center gap-space-xs p-2.5 rounded-lg bg-surface-container-lowest/5">
              <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary-fixed shrink-0">
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-primary-container">Ingresos</span>
                <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-surface-container-lowest truncate tabular-nums">
                  {isBalanceHidden ? '••••••' : formatCurrency(state.monthlyIncome, { showSign: true })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-xs p-2.5 rounded-lg bg-surface-container-lowest/5">
              <div className="w-8 h-8 rounded-full bg-error-container/20 flex items-center justify-center text-error shrink-0">
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-primary-container">Gastos</span>
                <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-surface-container-lowest truncate tabular-nums">
                  {isBalanceHidden
                    ? '••••••'
                    : formatCurrency(-state.monthlyExpenses, { showSign: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACCIONES RÁPIDAS EN GRID ERGONÓMICO */}
      <div className="grid grid-cols-4 gap-space-xs">
        <button
          onClick={() => setActiveModal('expense')}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow active:scale-95 transition-all text-center"
        >
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary mb-1.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface leading-tight font-semibold">
            Gasto
          </span>
        </button>

        <button
          onClick={() => setActiveModal('transfer')}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow active:scale-95 transition-all text-center"
        >
          <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-1.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface leading-tight font-semibold">
            Transferir
          </span>
        </button>

        <button
          onClick={() => navigate('/facturas')}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow active:scale-95 transition-all text-center"
        >
          <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-1.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">receipt</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface leading-tight font-semibold">
            Pagar
          </span>
        </button>

        <button
          onClick={() => {
            showToast('Escáner inteligente activado: selecciona o captura tu factura');
            navigate('/facturas');
          }}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow active:scale-95 transition-all text-center"
        >
          <div className="w-11 h-11 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-1.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">document_scanner</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface leading-tight font-semibold">
            Escanear
          </span>
        </button>
      </div>

      {/* 3. ALERTA DE VENCIMIENTO URGENTE */}
      {urgentBill && (
        <div className="relative overflow-hidden rounded-xl bg-error-container p-space-md shadow-sm">
          <div className="flex items-start gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-on-error flex items-center justify-center text-error shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-space-xs">
                <span className="font-label-sm text-label-sm text-error uppercase tracking-wider">
                  Compromiso Urgente
                </span>
                <span className="px-2 py-0.5 rounded-full bg-on-error font-label-sm text-label-sm text-on-error-container">
                  {urgentBill.status === 'urgente' ? 'Vence en 3 días' : `Vence ${urgentBill.dueDate}`}
                </span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-error-container mt-1 font-bold">
                {urgentBill.title}
              </p>
              <p className="font-body-sm text-body-sm text-on-error-container/80 mt-0.5">
                {urgentBill.dueShort || urgentBill.dueDate} • Monto pendiente:{' '}
                <span className="font-semibold text-on-error-container tabular-nums">
                  {formatCurrency(urgentBill.amount)}
                </span>
              </p>
              <div className="mt-space-sm flex items-center gap-space-xs">
                <button
                  onClick={() => markBillAsPaid(urgentBill.id, true)}
                  className="px-3.5 py-1.5 rounded-lg bg-error text-on-error font-label-md text-label-md font-semibold hover:bg-error/90 active:scale-95 transition-all shadow-sm"
                >
                  Pagar ahora
                </button>
                <button
                  onClick={() => showToast('Recordatorio pospuesto para mañana a las 9:00 AM')}
                  className="px-3 py-1.5 rounded-lg bg-on-error/80 text-on-error-container font-label-md text-label-md hover:bg-on-error transition-colors"
                >
                  Recordar luego
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. GRÁFICO DE DISTRIBUCIÓN SEMANAL DEL FLUJO DE EFECTIVO */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Flujo Semanal
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Lunes a Domingo
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Semana actual
          </div>
        </div>

        {/* Mini visualizador de barras adaptativo */}
        <div className="pt-space-sm">
          <div className="flex items-end justify-between h-32 px-1 gap-2">
            {state.weeklyFlow.map((item) => (
              <div
                key={item.day}
                onClick={() =>
                  showToast(`${item.label}: ${formatCurrency(item.amount, { withCode: true })}`)
                }
                className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
              >
                <div
                  className={`w-full max-w-[28px] ${
                    item.isPeak
                      ? 'bg-secondary-fixed'
                      : 'bg-surface-container group-hover:bg-secondary-fixed'
                  } rounded-t-md relative flex items-end justify-center transition-all duration-300`}
                  style={{ height: `${item.outerHeight}%` }}
                >
                  <div
                    className={`w-full ${
                      item.muted ? 'bg-secondary/50' : 'bg-secondary'
                    } rounded-t-md transition-all duration-300`}
                    style={{ height: `${item.innerHeight}%` }}
                  ></div>
                  {item.isPeak && (
                    <div className="absolute -top-7 px-1.5 py-0.5 rounded bg-primary-container text-surface-container-lowest font-label-sm text-[10px] whitespace-nowrap shadow-sm">
                      {item.badge}
                    </div>
                  )}
                </div>
                <span
                  className={`font-label-sm text-label-sm mt-2 ${
                    item.isPeak ? 'text-secondary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          {/* Sumario semanal rápido */}
          <div className="mt-space-md pt-space-xs flex items-center justify-between bg-surface-container-low rounded-lg p-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[20px]">insights</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Promedio diario:
              </span>
            </div>
            <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-on-surface tabular-nums">
              {formatCurrency(state.dailyAverage, { withCode: true })}
            </span>
          </div>
        </div>
      </div>

      {/* 5. SECCIÓN: GASTOS RECIENTES */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Gastos Recientes
          </span>
          <button
            type="button"
            onClick={() => setShowAllTransactions((prev) => !prev)}
            className="font-label-md text-label-md font-semibold text-secondary hover:underline flex items-center gap-0.5"
          >
            {showAllTransactions ? 'Ver menos' : 'Ver todos'}
            <span className="material-symbols-outlined text-[16px]">
              {showAllTransactions ? 'expand_less' : 'chevron_right'}
            </span>
          </button>
        </div>

        {/* Lista de Transacciones */}
        <div className="space-y-space-xs">
          {visibleTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl ${tx.iconBg} flex items-center justify-center shrink-0`}
                >
                  <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg font-bold text-on-surface truncate">
                    {tx.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block px-1.5 py-0.2 rounded bg-surface-container font-label-sm text-[10px] text-on-surface-variant">
                      {tx.category}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant truncate">
                      {tx.timestamp}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 pl-space-xs">
                <span
                  className={`font-tabular-figure-md text-tabular-figure-md font-bold tabular-nums ${
                    tx.amount > 0 ? 'text-on-tertiary-container' : 'text-on-surface'
                  }`}
                >
                  {formatCurrency(tx.amount, { showSign: tx.amount > 0 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
