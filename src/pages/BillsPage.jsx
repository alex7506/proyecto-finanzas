import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function BillsPage() {
  const { state, markBillAsPaid, setActiveModal, showToast } = useFinance();
  const [activeFilter, setActiveFilter] = useState('todos'); // 'todos' | 'pendientes' | 'pagados' | 'recurrentes'

  const pendingBills = state.bills.filter((b) => {
    if (activeFilter === 'recurrentes') return b.status !== 'pagado' && b.recurring;
    return b.status !== 'pagado';
  });

  const paidBills = state.bills.filter((b) => {
    if (activeFilter === 'recurrentes') return b.status === 'pagado' && b.recurring;
    return b.status === 'pagado';
  });

  const totalPendingAmount = state.bills
    .filter((b) => b.status !== 'pagado')
    .reduce((acc, b) => acc + b.amount, 0);

  const totalPaidAmount = state.bills
    .filter((b) => b.status === 'pagado')
    .reduce((acc, b) => acc + b.amount, 0);

  const totalMonthBills = totalPendingAmount + totalPaidAmount;
  const paidPercent =
    totalMonthBills > 0 ? Math.round((totalPaidAmount / totalMonthBills) * 100) : 100;
  const pendingPercent = 100 - paidPercent;

  const showPendingSection = activeFilter === 'todos' || activeFilter === 'pendientes' || activeFilter === 'recurrentes';
  const showPaidSection = activeFilter === 'todos' || activeFilter === 'pagados' || activeFilter === 'recurrentes';

  return (
    <div className="flex flex-col w-full px-gutter pb-space-xl">
      {/* Interactive Filter Tabs */}
      <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-space-sm mb-space-sm">
        {[
          { key: 'todos', label: `Todos (${state.bills.length})` },
          {
            key: 'pendientes',
            label: `Pendientes (${state.bills.filter((b) => b.status !== 'pagado').length})`,
          },
          {
            key: 'pagados',
            label: `Pagados (${state.bills.filter((b) => b.status === 'pagado').length})`,
          },
          { key: 'recurrentes', label: 'Recurrentes' },
        ].map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`filter-tab px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'active bg-primary-container text-surface-container-lowest shadow-sm hover:scale-105'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Monthly Commitment Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container to-inverse-surface text-surface-container-lowest p-space-lg shadow-md mb-space-lg">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary/15 blur-2xl pointer-events-none"></div>
        <div className="flex justify-between items-start mb-space-sm relative z-10">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-surface-variant/80 uppercase tracking-wider">
              Total por pagar este mes
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-tabular-figure-lg text-tabular-figure-lg font-bold tracking-tight text-surface-container-lowest tabular-nums">
                {formatCurrency(totalPendingAmount)}
              </span>
              <span className="font-label-sm text-label-sm text-surface-variant font-medium">
                COP
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest/10 backdrop-blur-md flex items-center justify-center text-tertiary-fixed-dim">
            <span className="material-symbols-outlined text-[24px]">calendar_clock</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-space-xs text-surface-variant/90 text-body-sm font-body-sm relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            <span>Próximo corte crítico:</span>
            <strong className="text-surface-container-lowest font-semibold">15 Octubre</strong>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/15 font-label-sm text-label-sm text-surface-container-lowest font-semibold">
            {state.bills.filter((b) => b.status !== 'pagado').length} recibos
          </span>
        </div>

        {/* Micro-progress visual */}
        <div className="w-full bg-surface-container-lowest/20 h-1.5 rounded-full mt-space-md overflow-hidden relative z-10">
          <div
            className="bg-tertiary-fixed h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(10, paidPercent)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-1 text-[11px] font-label-sm text-surface-variant/70 relative z-10 tabular-nums">
          <span>Pagado: {formatCurrency(totalPaidAmount)}</span>
          <span>Pendiente: {pendingPercent}%</span>
        </div>
      </div>

      {/* Quick Action & Smart Scan Banner */}
      <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low shadow-sm mb-space-lg">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
            <span className="material-symbols-outlined text-[20px]">document_scanner</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-body-md font-bold text-on-surface truncate">
              Escanear factura física
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Sube recibo PDF o foto con cámara
            </span>
          </div>
        </div>
        <button
          aria-label="Escanear recibo"
          onClick={() => setActiveModal('bill')}
          className="p-2 rounded-full bg-surface-container-lowest text-secondary shadow-sm hover:scale-105 active:scale-95 transition-transform shrink-0"
        >
          <span className="material-symbols-outlined text-[22px]">photo_camera</span>
        </button>
      </div>

      {/* Section: Pagos Urgentes / Por Vencer */}
      {showPendingSection && (
        <div className="flex flex-col mb-space-xl bill-section" data-section="pendientes">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Pagos Urgentes y Por Vencer
              </h2>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-error bg-error-container/60 px-2.5 py-0.5 rounded-full">
              {pendingBills.length} cuentas
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {pendingBills.map((bill) => {
              const isUrgent = bill.status === 'urgente';
              return (
                <div
                  key={bill.id}
                  className="bill-card group relative p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                    <div className="flex items-start gap-space-sm min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl ${
                          bill.iconStyle || 'bg-secondary-fixed text-on-secondary-fixed'
                        } flex items-center justify-center shrink-0`}
                      >
                        <span className="material-symbols-outlined text-[22px]">{bill.icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                          {bill.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          {bill.subtitle}
                        </span>
                      </div>
                    </div>

                    {isUrgent ? (
                      <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1 shrink-0">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        Por vencer
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold shrink-0">
                        Pendiente
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-space-xs mb-space-sm">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {isUrgent ? 'Vencimiento' : 'Vence'}
                      </span>
                      {isUrgent ? (
                        <span className="font-label-md text-label-md text-error font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>{' '}
                          {bill.dueDate}
                        </span>
                      ) : (
                        <span className="font-body-md text-body-md font-semibold text-on-surface">
                          {bill.dueDate}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {isUrgent ? 'Monto' : 'Total'}
                      </span>
                      <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-on-surface tabular-nums">
                        {formatCurrency(bill.amount)}
                      </span>
                    </div>
                  </div>

                  {isUrgent ? (
                    <div className="grid grid-cols-2 gap-space-xs pt-space-xs">
                      <button
                        onClick={() => markBillAsPaid(bill.id, true)}
                        className="pay-btn flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-secondary text-surface-container-lowest font-label-md text-label-md font-semibold hover:bg-secondary-container transition-all active:scale-95 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">credit_card</span>
                        Pagar PSE
                      </button>
                      <button
                        onClick={() => markBillAsPaid(bill.id, false)}
                        className="mark-paid-btn flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md font-medium hover:bg-surface-container hover:text-on-surface transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        Marcar pagado
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <span
                        className={`font-label-sm text-label-sm flex items-center gap-1 ${
                          bill.metaIcon === 'cached'
                            ? 'text-secondary font-medium'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {bill.metaIcon && (
                          <span
                            className={`material-symbols-outlined text-[16px] ${
                              bill.metaIcon === 'eco' ? 'text-tertiary-fixed-dim' : ''
                            }`}
                          >
                            {bill.metaIcon}
                          </span>
                        )}
                        {bill.metaText}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            showToast('Redirigiendo a pasarela segura de pago...');
                            markBillAsPaid(bill.id, true);
                          }}
                          className="pay-btn px-4 py-2 rounded-lg bg-primary-container text-surface-container-lowest font-label-md text-label-md font-medium hover:bg-inverse-surface transition-all active:scale-95"
                        >
                          Pagar
                        </button>
                        <button
                          onClick={() => markBillAsPaid(bill.id, false)}
                          className="mark-paid-btn p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all"
                          title="Marcar pagado"
                        >
                          <span className="material-symbols-outlined text-[18px]">done</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section: Servicios Pagados Recientemente */}
      {showPaidSection && (
        <div className="flex flex-col mb-space-xl bill-section" data-section="pagados">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container"></span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Pagados Recientemente
              </h2>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-on-tertiary-container bg-tertiary-fixed/30 px-2.5 py-0.5 rounded-full">
              {paidBills.length} de este mes
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {paidBills.map((paid) => (
              <div
                key={paid.id}
                className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-on-tertiary-container shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{paid.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                        {paid.title}
                      </span>
                      <span
                        className="material-symbols-outlined text-on-tertiary-container text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {paid.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="font-tabular-figure-md text-tabular-figure-md font-bold text-on-surface tabular-nums">
                    {formatCurrency(paid.amount)}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                    {paid.receiptNote || 'Pagado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Action Card: Programar nueva factura */}
      <div className="p-space-lg rounded-xl bg-surface-container text-on-surface shadow-sm flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-secondary text-surface-container-lowest flex items-center justify-center mb-space-xs shadow-md">
          <span className="material-symbols-outlined text-[26px]">add_task</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          ¿Tienes otro servicio o factura?
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-space-md max-w-xs">
          Configura recordatorios antes del corte y evita penalidades por reconexión o mora.
        </p>
        <button
          onClick={() => setActiveModal('bill')}
          className="w-full py-3 px-space-lg rounded-xl bg-primary-container text-surface-container-lowest font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-inverse-surface active:scale-95 transition-all shadow-sm"
          id="add-bill-btn"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Programar factura o recordatorio
        </button>
      </div>
    </div>
  );
}
