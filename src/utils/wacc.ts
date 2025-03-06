export function calculateWAC(
  data: { balance: number; purchase_usd_amount: number }[]
) {
  const totalCost: number = data.reduce(
    (sum, entry) => sum + entry.purchase_usd_amount,
    0
  );
  const totalQuantity: number = data.reduce(
    (sum, entry) => sum + entry.balance,
    0
  );
  if (totalQuantity === 0) {
    return {
      wac: 0,
      totalQuantity: 0,
    };
  }

  const wac: number = totalCost / totalQuantity;

  return { wac, totalQuantity };
}
