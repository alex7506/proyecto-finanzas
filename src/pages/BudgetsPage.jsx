import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function BudgetsPage() {
  const {
    state,
    setMonthIndex,
    applySmartAdjustment,
    dismissSmartTip,
    setActiveModal,
  } = useFinance();

  const { budgets, months, selectedMonthIndex, smartTipDismissed } = state;

  const globalPercent =
    budgets.globalLimit > 0
      ? Math.round((budgets.globalSpent / budgets.globalLimit) * 100)
      : 0;
  const remainingGlobal = Math.max(0, budgets.globalLimit - budgets.globalSpent);

  return (
    <div className="flex flex-col w-full">
      <div className="px-gutter pt-space-md pb-space-lg flex flex-col gap-space-lg">
        {/* 1. Month Period Selector */}
        <section className="flex items-center justify-between bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
          <button
            aria-label="Mes anterior"
            onClick={() => setMonthIndex(selectedMonthIndex - 1)}
            disabled={selectedMonthIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 disabled:opacity-40"
            id="prevMonth"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <div className="flex items-center gap-space-xs cursor-pointer select-none">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              calendar_today
            </span>
            <span
              className="font-headline-sm text-headline-sm text-on-surface"
              id="currentPeriodLabel"
            >
              {months[selectedMonthIndex]}
            </span>
            <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
          </div>

          <button
            aria-label="Mes siguiente"
            onClick={() => setMonthIndex(selectedMonthIndex + 1)}
            disabled={selectedMonthIndex === months.length - 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 disabled:opacity-40"
            id="nextMonth"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </section>

        {/* 2. Circular / Gauge Overview Card */}
        <section className="relative bg-surface-container-lowest p-space-lg rounded-xl shadow-sm overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-center gap-space-lg relative z-10">
            {/* Circular Progress Chart */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="stroke-surface-container-high"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  strokeWidth="10"
                ></circle>
                <circle
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="#4648d4"
                  strokeDasharray="301.59"
                  strokeDashoffset="176.4"
                  strokeLinecap="round"
                  strokeWidth="10"
                ></circle>
                <circle
                  className="opacity-90"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="#009668"
                  strokeDasharray="301.59"
                  strokeDashoffset="246"
                  strokeLinecap="round"
                  strokeWidth="10"
                  style={{ transform: 'rotate(149deg)', transformOrigin: '60px 60px' }}
                ></circle>
                <circle
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="#ba1a1a"
                  strokeDasharray="301.59"
                  strokeDashoffset="282"
                  strokeLinecap="round"
                  strokeWidth="10"
                  style={{ transform: 'rotate(268deg)', transformOrigin: '60px 60px' }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight tabular-nums">
                  {globalPercent}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Gastado
                </span>
              </div>
            </div>

            {/* Metric Details */}
            <div className="flex flex-col w-full text-center sm:text-left">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Presupuesto global
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-space-xs mt-0.5 tabular-nums">
                <span className="font-tabular-figure-lg text-tabular-figure-lg text-on-surface">
                  {formatCurrency(budgets.globalSpent)}
                </span>
                <span className="font-body-md text-body-md text-outline">
                  / {formatCurrency(budgets.globalLimit)}
                </span>
              </div>

              {/* Countdown Pill */}
              <div className="mt-space-sm inline-flex items-center justify-center sm:justify-start gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low w-fit mx-auto sm:mx-0">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-md text-label-md text-on-surface">
                  Te quedan{' '}
                  <strong className="text-secondary tabular-nums">
                    {formatCurrency(remainingGlobal)}
                  </strong>{' '}
                  para {budgets.remainingDays} días
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-space-sm mt-space-lg pt-space-md bg-surface-container-low/60 rounded-lg p-space-sm">
            <div className="flex flex-col items-center sm:items-start pl-space-xs">
              <span className="font-label-sm text-label-sm text-outline">
                Gasto promedio diario
              </span>
              <span className="font-tabular-figure-md text-tabular-figure-md text-on-surface font-semibold tabular-nums">
                {formatCurrency(budgets.dailyAverageSpent)} / día
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-start pl-space-xs">
              <span className="font-label-sm text-label-sm text-outline">
                Límite sugerido restante
              </span>
              <span className="font-tabular-figure-md text-tabular-figure-md text-on-tertiary-container font-semibold tabular-nums">
                {formatCurrency(budgets.suggestedDailyLimit)} / día
              </span>
            </div>
          </div>
        </section>

        {/* 4. Smart Tip AI Suggestion */}
        {!smartTipDismissed && (
          <section className="bg-error-container/40 p-space-md rounded-xl shadow-sm flex items-start gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center shrink-0 text-error">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-error-container font-bold">
                  Consejo de Ahorro Inteligente
                </span>
                <span className="font-label-sm text-label-sm text-error font-medium">
                  FinTrack AI
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Has superado el presupuesto de <strong className="text-on-surface">Ocio</strong>. Te
                sugerimos reasignar <strong className="text-on-surface">$20,000</strong> de la
                categoría <strong className="text-on-surface">Transporte</strong> para mantener tu
                meta mensual intacta.
              </p>
              <div className="mt-space-sm flex items-center gap-space-sm">
                <button
                  onClick={applySmartAdjustment}
                  className="bg-primary text-on-primary font-label-sm text-label-sm px-space-md py-1.5 rounded-lg active:scale-95 transition-transform"
                >
                  Aplicar reajuste
                </button>
                <button
                  onClick={dismissSmartTip}
                  className="text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm px-space-sm py-1.5 transition-colors"
                >
                  Descartar
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 3. Category Breakdown */}
        <section className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Categorías activas
            </h2>
            <span className="font-label-sm text-label-sm text-outline font-medium">
              {budgets.categories.length} categorías
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {budgets.categories.map((cat) => {
              const rawPercent = cat.limit > 0 ? (cat.spent / cat.limit) * 100 : 0;
              const isExceeded = cat.spent > cat.limit;
              const barWidth = Math.min(100, rawPercent);
              const remaining = cat.limit - cat.spent;

              return (
                <article
                  key={cat.id}
                  className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg ${
                          isExceeded ? 'bg-error-container/60 text-error' : `bg-surface-container-high ${cat.iconColor}`
                        } flex items-center justify-center shrink-0`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          {cat.name}
                        </span>
                        <span
                          className={`font-body-sm text-body-sm ${
                            isExceeded ? 'text-error font-medium' : 'text-on-surface-variant'
                          }`}
                        >
                          {isExceeded
                            ? `Excedido en ${formatCurrency(cat.spent - cat.limit)}`
                            : cat.subtitle}
                        </span>
                      </div>
                    </div>

                    {isExceeded ? (
                      <span className="px-space-sm py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        {Math.round(rawPercent)}% Superado
                      </span>
                    ) : (
                      <span
                        className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm ${cat.badgeStyle}`}
                      >
                        {cat.badgeText || `${rawPercent.toFixed(1)}%`}
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div
                    className={`w-full ${
                      isExceeded ? 'bg-error-container/40' : 'bg-surface-container-high'
                    } h-2 rounded-full overflow-hidden mt-space-xs`}
                  >
                    <div
                      className={`${
                        isExceeded ? 'bg-error' : cat.barColor
                      } h-full rounded-full transition-all duration-500`}
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center mt-1 tabular-nums">
                    <span
                      className={`font-tabular-figure-md text-tabular-figure-md ${
                        isExceeded ? 'text-error font-bold' : 'text-on-surface'
                      }`}
                    >
                      {formatCurrency(cat.spent)}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      {isExceeded
                        ? `Límite: ${formatCurrency(cat.limit)}`
                        : remaining > 0
                        ? `de ${formatCurrency(cat.limit)} (Resta: ${formatCurrency(remaining)})`
                        : `de ${formatCurrency(cat.limit)}`}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 5. CTA Button: Create New Category */}
        <div className="pt-space-xs pb-space-md">
          <button
            onClick={() => setActiveModal('category')}
            className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform"
            id="btnNewCategory"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Crear nueva categoría de presupuesto</span>
          </button>
        </div>
      </div>
    </div>
  );
}
