import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_FINANCE_DATA } from '../data/initialData';

const STORAGE_KEY = 'fintrack_kinetic_capital_state_v1';

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading FinTrack state from localStorage:', e);
    }
    return INITIAL_FINANCE_DATA;
  });

  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [activeModal, setActiveModal] = useState(null); // 'expense' | 'transfer' | 'bill' | 'category' | 'scanner' | null

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving FinTrack state to localStorage:', e);
    }
  }, [state]);

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast((prev) => (prev.message === message ? { ...prev, visible: false } : prev));
    }, 2800);
  }, []);

  const togglePrivacy = useCallback(() => {
    setIsBalanceHidden((prev) => !prev);
  }, []);

  const setMonthIndex = useCallback((newIndex) => {
    setState((prev) => {
      const clamped = Math.max(0, Math.min(prev.months.length - 1, newIndex));
      return { ...prev, selectedMonthIndex: clamped };
    });
  }, []);

  const addTransaction = useCallback(
    ({ title, category, budgetId, amount, icon = 'shopping_cart', type = 'expense' }) => {
      const numericAmount = Math.abs(Number(amount) || 0);
      if (!title || numericAmount <= 0) return;

      const signedAmount = type === 'income' ? numericAmount : -numericAmount;

      const newTx = {
        id: `tx-${Date.now()}`,
        title,
        category: category || 'General',
        budgetId: budgetId || 'cat-alimentacion',
        timestamp: 'Ahora mismo',
        amount: signedAmount,
        icon,
        iconBg:
          type === 'income'
            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
            : 'bg-secondary-fixed text-on-secondary-fixed',
      };

      setState((prev) => {
        const updatedCategories = prev.budgets.categories.map((cat) => {
          if (type === 'expense' && cat.id === newTx.budgetId) {
            return { ...cat, spent: cat.spent + numericAmount };
          }
          return cat;
        });

        const updatedGlobalSpent =
          type === 'expense' ? prev.budgets.globalSpent + numericAmount : prev.budgets.globalSpent;

        return {
          ...prev,
          balance: prev.balance + signedAmount,
          monthlyIncome: type === 'income' ? prev.monthlyIncome + numericAmount : prev.monthlyIncome,
          monthlyExpenses:
            type === 'expense' ? prev.monthlyExpenses + numericAmount : prev.monthlyExpenses,
          transactions: [newTx, ...prev.transactions],
          budgets: {
            ...prev.budgets,
            globalSpent: updatedGlobalSpent,
            categories: updatedCategories,
          },
        };
      });

      showToast(
        type === 'income'
          ? '¡Ingreso registrado correctamente!'
          : '¡Gasto registrado y descontado del balance!'
      );
      setActiveModal(null);
    },
    [showToast]
  );

  const markBillAsPaid = useCallback(
    (billId, viaPSE = false) => {
      setState((prev) => {
        const targetBill = prev.bills.find((b) => b.id === billId);
        if (!targetBill || targetBill.status === 'pagado') return prev;

        const updatedBills = prev.bills.map((bill) =>
          bill.id === billId
            ? {
                ...bill,
                status: 'pagado',
                subtitle: `${bill.subtitle.split('•')[0].trim()} • Pagado hoy`,
                receiptNote: `Comprobante #${Math.floor(1000 + Math.random() * 9000)}`,
              }
            : bill
        );

        const newTx = {
          id: `tx-${Date.now()}`,
          title: targetBill.title,
          category: 'Servicios',
          budgetId: targetBill.budgetId || 'cat-servicios',
          timestamp: 'Hoy',
          amount: -targetBill.amount,
          icon: targetBill.icon || 'receipt_long',
          iconBg: 'bg-tertiary-fixed/40 text-on-tertiary-container',
        };

        return {
          ...prev,
          balance: Math.max(0, prev.balance - targetBill.amount),
          monthlyExpenses: prev.monthlyExpenses + targetBill.amount,
          bills: updatedBills,
          transactions: [newTx, ...prev.transactions],
        };
      });

      if (viaPSE) {
        showToast('Pago PSE procesado con éxito. Factura marcada al día 🎉');
      } else {
        showToast('¡Pago registrado! Felicitaciones por mantenerte al día 🎉');
      }
    },
    [showToast]
  );

  const addBill = useCallback(
    ({ title, subtitle, dueDate, amount, recurring = true, icon = 'receipt_long' }) => {
      const numericAmount = Math.abs(Number(amount) || 0);
      if (!title || numericAmount <= 0) return;

      const newBill = {
        id: `bill-${Date.now()}`,
        title,
        subtitle: subtitle || 'Servicio programado',
        dueDate: dueDate || '28 Octubre',
        amount: numericAmount,
        status: 'pendiente',
        recurring,
        icon,
        iconStyle: 'bg-secondary-fixed text-on-secondary-fixed',
        metaIcon: recurring ? 'cached' : undefined,
        metaText: recurring ? 'Recurrente mensual' : 'Pago único programado',
        budgetId: 'cat-servicios',
      };

      setState((prev) => ({
        ...prev,
        bills: [newBill, ...prev.bills],
      }));

      showToast('Factura programada con recordatorio activo');
      setActiveModal(null);
    },
    [showToast]
  );

  const applySmartAdjustment = useCallback(() => {
    setState((prev) => {
      if (prev.smartTipApplied) return prev;
      const updatedCategories = prev.budgets.categories.map((cat) => {
        if (cat.id === 'cat-transporte') {
          return {
            ...cat,
            limit: cat.limit - 20000,
            subtitle: 'Reasignado (-$20,000 a Ocio)',
          };
        }
        if (cat.id === 'cat-ocio') {
          return {
            ...cat,
            limit: cat.limit + 20000,
            subtitle: 'Meta equilibrada con IA',
          };
        }
        return cat;
      });

      return {
        ...prev,
        smartTipApplied: true,
        smartTipDismissed: true,
        budgets: {
          ...prev.budgets,
          categories: updatedCategories,
        },
      };
    });

    showToast('Reajuste inteligente de $20,000 aplicado con éxito ✨');
  }, [showToast]);

  const dismissSmartTip = useCallback(() => {
    setState((prev) => ({ ...prev, smartTipDismissed: true }));
    showToast('Sugerencia descartada');
  }, [showToast]);

  const addBudgetCategory = useCallback(
    ({ name, subtitle, limit, icon = 'savings' }) => {
      const numericLimit = Math.abs(Number(limit) || 0);
      if (!name || numericLimit <= 0) return;

      const newCategory = {
        id: `cat-${Date.now()}`,
        name,
        reportName: name,
        subtitle: subtitle || 'Nueva meta mensual',
        spent: 0,
        limit: numericLimit,
        icon,
        iconColor: 'text-secondary',
        barColor: 'bg-secondary',
        reportDotColor: 'bg-secondary',
        strokeColor: '#4648d4',
        badgeStyle: 'bg-secondary-fixed text-on-secondary-fixed font-semibold',
      };

      setState((prev) => ({
        ...prev,
        budgets: {
          ...prev.budgets,
          globalLimit: prev.budgets.globalLimit + numericLimit,
          categories: [...prev.budgets.categories, newCategory],
        },
      }));

      showToast(`Categoría "${name}" creada exitosamente`);
      setActiveModal(null);
    },
    [showToast]
  );

  const reclassifyUnplannedHighlight = useCallback(() => {
    setState((prev) => {
      const nextCat =
        prev.unplannedHighlight.category === 'Ocio' ? 'Alimentación y Familia' : 'Ocio';
      const nextImpact = nextCat === 'Ocio' ? 46 : 18;
      return {
        ...prev,
        unplannedHighlight: {
          ...prev.unplannedHighlight,
          category: nextCat,
          impactPercent: nextImpact,
        },
      };
    });
    showToast('Gasto reclasificado y métricas actualizadas');
  }, [showToast]);

  const resetDemoData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_FINANCE_DATA);
    showToast('Datos restaurados al estado original del prototipo');
  }, [showToast]);

  return (
    <FinanceContext.Provider
      value={{
        state,
        isBalanceHidden,
        togglePrivacy,
        setMonthIndex,
        addTransaction,
        markBillAsPaid,
        addBill,
        applySmartAdjustment,
        dismissSmartTip,
        addBudgetCategory,
        reclassifyUnplannedHighlight,
        resetDemoData,
        toast,
        showToast,
        activeModal,
        setActiveModal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error('useFinance debe usarse dentro de un FinanceProvider');
  }
  return ctx;
}
