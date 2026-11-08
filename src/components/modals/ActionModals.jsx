import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

const CATEGORY_OPTIONS = [
  { id: 'cat-alimentacion', label: 'Alimentación', icon: 'shopping_cart' },
  { id: 'cat-servicios', label: 'Servicios', icon: 'bolt' },
  { id: 'cat-transporte', label: 'Transporte', icon: 'local_gas_station' },
  { id: 'cat-ocio', label: 'Ocio', icon: 'restaurant' },
  { id: 'cat-vivienda', label: 'Vivienda', icon: 'home' },
];

export default function ActionModals() {
  const { activeModal, setActiveModal, addTransaction, addBill, addBudgetCategory } = useFinance();

  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState(CATEGORY_OPTIONS[0]);
  const [txType, setTxType] = useState('expense');

  const [billTitle, setBillTitle] = useState('');
  const [billSubtitle, setBillSubtitle] = useState('');
  const [billDueDate, setBillDueDate] = useState('28 Octubre');
  const [billAmount, setBillAmount] = useState('');
  const [billRecurring, setBillRecurring] = useState(true);

  const [catName, setCatName] = useState('');
  const [catSubtitle, setCatSubtitle] = useState('');
  const [catLimit, setCatLimit] = useState('');

  if (!activeModal) return null;

  const closeModal = () => setActiveModal(null);

  const handleTxSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      title: txTitle,
      amount: Number(txAmount),
      category: txCategory.label,
      budgetId: txCategory.id,
      icon: txCategory.icon,
      type: txType,
    });
    setTxTitle('');
    setTxAmount('');
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    addBill({
      title: billTitle,
      subtitle: billSubtitle || 'Proveedor registrado',
      dueDate: billDueDate,
      amount: Number(billAmount),
      recurring: billRecurring,
      icon: 'receipt_long',
    });
    setBillTitle('');
    setBillSubtitle('');
    setBillAmount('');
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    addBudgetCategory({
      name: catName,
      subtitle: catSubtitle || 'Meta personalizada',
      limit: Number(catLimit),
      icon: 'savings',
    });
    setCatName('');
    setCatSubtitle('');
    setCatLimit('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-xl p-space-lg shadow-xl border border-outline-variant/40"
        onClick={(e) => e.stopPropagation()}
      >
        {(activeModal === 'expense' || activeModal === 'transfer') && (
          <form onSubmit={handleTxSubmit} className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {activeModal === 'transfer' ? 'Registrar Movimiento / Transferencia' : 'Registrar Nuevo Gasto'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-space-xs bg-surface-container-low p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setTxType('expense')}
                className={`py-1.5 rounded-md font-label-md text-label-md transition-all ${
                  txType === 'expense'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                    : 'text-on-surface-variant'
                }`}
              >
                Gasto / Salida
              </button>
              <button
                type="button"
                onClick={() => setTxType('income')}
                className={`py-1.5 rounded-md font-label-md text-label-md transition-all ${
                  txType === 'income'
                    ? 'bg-surface-container-lowest text-on-tertiary-container shadow-sm font-bold'
                    : 'text-on-surface-variant'
                }`}
              >
                Ingreso / Abono
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Concepto o comercio
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Supermercado, Restaurante, Uber..."
                value={txTitle}
                onChange={(e) => setTxTitle(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Monto en COP ($)
              </label>
              <input
                type="number"
                min="100"
                step="100"
                required
                placeholder="Ej. 45000"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-tabular-figure-md focus:outline-none focus:border-secondary"
              />
            </div>

            {txType === 'expense' && (
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Categoría de presupuesto
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTxCategory(opt)}
                      className={`p-2 rounded-lg font-label-sm text-label-sm flex items-center gap-1 justify-center border transition-all ${
                        txCategory.id === opt.id
                          ? 'bg-secondary-fixed border-secondary text-on-secondary-fixed font-bold'
                          : 'bg-surface-container-low border-transparent text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary-container text-surface-container-lowest font-label-lg text-label-lg font-bold hover:bg-inverse-surface active:scale-95 transition-all shadow-sm"
            >
              Guardar movimiento
            </button>
          </form>
        )}

        {activeModal === 'bill' && (
          <form onSubmit={handleBillSubmit} className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Programar Factura o Servicio
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Nombre del servicio o factura
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Plan Celular Movistar"
                value={billTitle}
                onChange={(e) => setBillTitle(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Entidad / Referencia
              </label>
              <input
                type="text"
                placeholder="Ej. Movistar • Ref: 300123456"
                value={billSubtitle}
                onChange={(e) => setBillSubtitle(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Fecha límite
                </label>
                <input
                  type="text"
                  required
                  value={billDueDate}
                  onChange={(e) => setBillDueDate(e.target.value)}
                  className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Valor ($ COP)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  required
                  placeholder="55900"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-tabular-figure-md focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={billRecurring}
                onChange={(e) => setBillRecurring(e.target.checked)}
                className="w-4 h-4 accent-secondary"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Activar recordatorio mensual recurrente
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary-container text-surface-container-lowest font-label-lg text-label-lg font-bold hover:bg-inverse-surface active:scale-95 transition-all shadow-sm"
            >
              Programar recordatorio
            </button>
          </form>
        )}

        {activeModal === 'category' && (
          <form onSubmit={handleCategorySubmit} className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Nueva Categoría de Presupuesto
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Nombre de la categoría
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Educación y Cursos"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Descripción corta
              </label>
              <input
                type="text"
                placeholder="Ej. Libros, certificaciones, idiomas"
                value={catSubtitle}
                onChange={(e) => setCatSubtitle(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Tope mensual asignado ($ COP)
              </label>
              <input
                type="number"
                min="10000"
                step="5000"
                required
                placeholder="Ej. 300000"
                value={catLimit}
                onChange={(e) => setCatLimit(e.target.value)}
                className="h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-tabular-figure-md focus:outline-none focus:border-secondary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Crear categoría
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
