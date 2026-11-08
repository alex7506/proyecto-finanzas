import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function ReportsPage() {
  const { state, reclassifyUnplannedHighlight, showToast } = useFinance();
  const [period, setPeriod] = useState('mes'); // 'semana' | 'mes' | 'trimestre' | 'ano'

  const periodData = state.reportsByPeriod[period] || state.reportsByPeriod.mes;
  const categories = state.budgets.categories;
  const totalCategorySpent = categories.reduce((acc, c) => acc + c.spent, 0);

  const sortedCategories = [...categories].sort((a, b) => b.spent - a.spent);
  const topCategory = sortedCategories[0];
  const topPercent =
    totalCategorySpent > 0 ? Math.round((topCategory.spent / totalCategorySpent) * 100) : 0;

  const savedAmount = Math.max(0, periodData.previousAmount - periodData.currentAmount);
  const currentBarRatio =
    periodData.previousAmount > 0
      ? Math.min(100, ((periodData.currentAmount / periodData.previousAmount) * 100).toFixed(1))
      : 92.1;

  const handleExportCSV = () => {
    const headers = ['Categoría,Gastado (COP),Límite (COP),Porcentaje'];
    const rows = categories.map((c) => {
      const pct = totalCategorySpent > 0 ? Math.round((c.spent / totalCategorySpent) * 100) : 0;
      return `"${c.reportName || c.name}",${c.spent},${c.limit},${pct}%`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fintrack-informe-${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Archivo de datos Excel/CSV descargado con éxito 📊');
  };

  return (
    <div className="flex flex-col w-full px-gutter pb-space-xl gap-space-lg">
      {/* Selector Temporal de Píldoras */}
      <div
        className="flex items-center justify-between gap-space-xs bg-surface-container-low p-1.5 rounded-full shadow-sm mt-space-sm"
        id="time-filter-group"
      >
        {[
          { key: 'semana', label: 'Semana' },
          { key: 'mes', label: 'Mes' },
          { key: 'trimestre', label: 'Trimestre' },
          { key: 'ano', label: 'Año' },
        ].map((item) => {
          const isActive = period === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setPeriod(item.key)}
              className={`filter-pill flex-1 py-1.5 px-space-xs rounded-full text-center font-label-md text-label-md transition-all duration-200 ${
                isActive
                  ? 'active-pill bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tarjeta Métrica Destacada */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {periodData.label}
            </span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-tabular-figure-lg text-tabular-figure-lg text-on-surface tracking-tight tabular-nums">
                {formatCurrency(periodData.totalSpent)}
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-tertiary-container shadow-xs">
            <span
              className="material-symbols-outlined text-[16px] text-on-tertiary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              trending_down
            </span>
            <span className="font-label-sm text-label-sm font-semibold text-on-tertiary-container">
              {periodData.deltaPercent}
            </span>
          </div>
        </div>

        {/* Micrográfico de tendencia mensual continua */}
        <div className="w-full pt-space-xs flex flex-col gap-1">
          <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
            <span>Flujo continuo mensual</span>
            <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
              {periodData.efficiencyLabel}
            </span>
          </div>
          <div className="h-16 w-full flex items-end">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 60">
              <defs>
                <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4648d4" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#4648d4" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <path
                d="M 0,45 C 40,48 70,30 110,34 C 150,38 180,18 220,24 C 260,30 290,12 320,10 L 320,60 L 0,60 Z"
                fill="url(#curveGradient)"
              ></path>
              <path
                d="M 0,45 C 40,48 70,30 110,34 C 150,38 180,18 220,24 C 260,30 290,12 320,10"
                fill="none"
                stroke="#4648d4"
                strokeLinecap="round"
                strokeWidth="2.5"
              ></path>
              <circle className="animate-pulse" cx="320" cy="10" fill="#4648d4" r="4"></circle>
            </svg>
          </div>
          <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm pt-1">
            <span>{periodData.startLabel}</span>
            <span>{periodData.mid1Label}</span>
            <span>{periodData.mid2Label}</span>
            <span>{periodData.endLabel}</span>
          </div>
        </div>
      </div>

      {/* Desglose y Distribución de Gastos (Donut interactivo + Barras por Categoría) */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">donut_large</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Distribución de Gastos
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {categories.length} Categorías
          </span>
        </div>

        {/* Representación Visual Circular e Indicador Central */}
        <div className="flex items-center justify-center gap-space-lg py-space-sm">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#eff4ff" strokeWidth="12"></circle>
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#131b2e"
                strokeDasharray="124.2 238.8"
                strokeDashoffset="0"
                strokeWidth="12"
              ></circle>
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#4648d4"
                strokeDasharray="52.5 238.8"
                strokeDashoffset="-124.2"
                strokeWidth="12"
              ></circle>
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#6063ee"
                strokeDasharray="23.9 238.8"
                strokeDashoffset="-176.7"
                strokeWidth="12"
              ></circle>
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#bec6e0"
                strokeDasharray="21.5 238.8"
                strokeDashoffset="-200.6"
                strokeWidth="12"
              ></circle>
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#009668"
                strokeDasharray="16.7 238.8"
                strokeDashoffset="-222.1"
                strokeWidth="12"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Mayor cuota</span>
              <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-on-surface tabular-nums">
                {topPercent}%
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                {topCategory ? topCategory.name.split(' ')[0] : 'Vivienda'}
              </span>
            </div>
          </div>
        </div>

        {/* Lista Detallada de Categorías */}
        <div className="flex flex-col gap-space-sm">
          {categories.map((cat) => {
            const pct =
              totalCategorySpent > 0 ? Math.round((cat.spent / totalCategorySpent) * 100) : 0;
            return (
              <div
                key={cat.id}
                className="flex flex-col gap-1.5 p-space-sm rounded-lg hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center justify-between font-body-md text-body-md">
                  <div className="flex items-center gap-space-xs">
                    <span className={`w-3 h-3 rounded-full ${cat.reportDotColor}`}></span>
                    <span className="text-on-surface font-medium">
                      {cat.reportName || cat.name}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-space-xs tabular-nums">
                    <span className="font-tabular-figure-md text-tabular-figure-md text-on-surface font-semibold">
                      {formatCurrency(cat.spent)}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold w-9 text-right">
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.reportDotColor} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparativa Mes a Mes */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Comparativa Mensual
              </h3>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {periodData.previousPeriodLabel} vs {periodData.currentPeriodLabel}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
              Ahorro conseguido
            </span>
            <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-on-tertiary-container tabular-nums">
              {formatCurrency(savedAmount, { showSign: true })}
            </span>
          </div>
        </div>

        {/* Visual Bars Comparison */}
        <div className="flex flex-col gap-space-md pt-space-xs">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center font-label-md text-label-md tabular-nums">
              <span className="text-on-surface-variant font-medium">
                {periodData.previousPeriodLabel}
              </span>
              <span className="font-tabular-figure-md text-tabular-figure-md text-on-surface font-semibold">
                {formatCurrency(periodData.previousAmount)}
              </span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-outline-variant rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center font-label-md text-label-md tabular-nums">
              <span className="text-on-surface font-semibold flex items-center gap-1">
                {periodData.currentPeriodLabel}
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              </span>
              <span className="font-tabular-figure-md text-tabular-figure-md text-secondary font-bold">
                {formatCurrency(periodData.currentAmount)}
              </span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${currentBarRatio}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Nota de ahorro & progreso */}
        <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
          <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-on-tertiary-container">
            <span className="material-symbols-outlined text-[16px]">verified</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface">
            Has reducido tu nivel de gasto un{' '}
            <strong className="font-semibold text-on-tertiary-container">
              {periodData.reductionPercent}
            </strong>{' '}
            este periodo, cumpliendo con la meta de ahorro sugerida.
          </p>
        </div>
      </div>

      {/* Mayor Gasto No Planificado del Mes */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px] text-error">priority_high</span>
            Mayor imprevisto
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {state.unplannedHighlight.date}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-space-sm">
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-on-surface shrink-0">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {state.unplannedHighlight.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {state.unplannedHighlight.place}
              </span>
            </div>
          </div>
          <span className="font-tabular-figure-lg text-tabular-figure-lg font-bold text-on-surface tabular-nums">
            {formatCurrency(state.unplannedHighlight.amount)}
          </span>
        </div>

        <div className="mt-2 pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
          <span>
            Impacto en categoría {state.unplannedHighlight.category}:{' '}
            <strong className="text-on-surface font-semibold">
              {state.unplannedHighlight.impactPercent}%
            </strong>
          </span>
          <button
            type="button"
            onClick={reclassifyUnplannedHighlight}
            className="inline-flex items-center gap-1 text-secondary font-medium cursor-pointer hover:underline"
          >
            Reclasificar
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Botones de Acción y Exportación */}
      <div className="flex flex-col gap-space-xs pt-space-xs">
        <div className="grid grid-cols-2 gap-space-sm">
          <button
            onClick={() => {
              showToast('Preparando vista de impresión / PDF...');
              setTimeout(() => window.print(), 300);
            }}
            className="w-full flex items-center justify-center gap-space-xs py-3 px-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low shadow-sm active:scale-95 transition-all text-on-surface font-label-lg text-label-lg"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-error">picture_as_pdf</span>
            Reporte PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="w-full flex items-center justify-center gap-space-xs py-3 px-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low shadow-sm active:scale-95 transition-all text-on-surface font-label-lg text-label-lg"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
              table_view
            </span>
            Datos Excel
          </button>
        </div>
        <button
          onClick={handleExportCSV}
          className="w-full mt-2 flex items-center justify-center gap-space-xs py-3.5 px-space-lg rounded-lg bg-primary-container text-on-primary hover:opacity-90 active:scale-98 shadow-md transition-all font-label-lg text-label-lg"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          Descargar Informe Detallado Completo
        </button>
      </div>
    </div>
  );
}
