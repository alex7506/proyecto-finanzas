/**
 * Formatea valores numéricos al formato de moneda empleado en el prototipo ($X,XXX,XXX)
 * @param {number} amount
 * @param {object} options
 */
export function formatCurrency(amount, { showSign = false, withCode = false } = {}) {
  const absAmount = Math.abs(Math.round(Number(amount) || 0));
  const formatted = absAmount.toLocaleString('en-US');
  let prefix = '$';
  if (showSign) {
    prefix = amount >= 0 ? '+$' : '-$';
  } else if (amount < 0) {
    prefix = '-$';
  }
  return withCode ? `${prefix}${formatted} COP` : `${prefix}${formatted}`;
}
