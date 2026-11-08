# FinTrack — Kinetic Capital (React + Vite + Tailwind CSS)

Aplicación web de gestión financiera personal refactorizada a una arquitectura modular en **React 18**, **Vite**, **Tailwind CSS**, **React Router v6** y **Context API** con persistencia en `localStorage`, siguiendo el sistema de diseño **Kinetic Capital** (`prototipo/kinetic_capital/DESIGN.md`).

## 🚀 Características Principales

- **Inicio (`/` - `DashboardPage.jsx`)**:
  - Tarjeta de Balance Total Disponible con modo privacidad (ocultar/mostrar saldos) y desglose de Ingresos vs. Gastos.
  - Acciones rápidas ergonómicas para registrar gastos, transferencias/ingresos, pagar servicios o escanear facturas.
  - Alerta dinámica de compromisos urgentes por vencer.
  - Visualizador interactivo de flujo semanal (Lunes a Domingo) y listado de transacciones recientes en tiempo real.
- **Facturas (`/facturas` - `BillsPage.jsx`)**:
  - Filtros dinámicos (`Todos`, `Pendientes`, `Pagados`, `Recurrentes`).
  - Tarjeta de compromiso mensual con barra de progreso calculada automáticamente.
  - Pago simulado PSE y marcación de recibos pagados con actualización automática del balance y generación de comprobante.
  - Modal para programar nuevas facturas o recordatorios.
- **Presupuestos (`/presupuestos` - `BudgetsPage.jsx`)**:
  - Selector de periodo mensual y gráfico circular SVG del presupuesto global.
  - Sugerencia inteligente **FinTrack AI** con reajuste automático de presupuesto (`$20,000` de Transporte a Ocio).
  - Desglose de categorías activas con barras de progreso dinámicas y modal para crear nuevas categorías.
- **Informes (`/informes` - `ReportsPage.jsx`)**:
  - Selector temporal (`Semana`, `Mes`, `Trimestre`, `Año`) con métricas reactivas.
  - Gráfico de tendencia continua y anillo de distribución porcentual por categorías.
  - Comparativa periodo a periodo, alerta de mayor gasto imprevisto con reclasificación interactiva y exportación a CSV/Excel o vista de impresión PDF.

## 📁 Estructura del Proyecto

```text
finanzas/
├── prototipo/                  # Prototipos originales y DESIGN.md de Kinetic Capital
├── src/
│   ├── components/
│   │   ├── layout/             # Header.jsx, BottomNav.jsx, AppLayout.jsx
│   │   └── modals/             # ActionModals.jsx (Gasto, Transferencia, Factura, Categoría)
│   ├── context/                # FinanceContext.jsx (Estado global + localStorage)
│   ├── data/                   # initialData.ts / initialData.js (Datos iniciales COP)
│   ├── pages/                  # DashboardPage, BillsPage, BudgetsPage, ReportsPage
│   ├── utils/                  # formatCurrency.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🛠️ Instalación y Ejecución Local

```bash
npm install
npm run dev
```
