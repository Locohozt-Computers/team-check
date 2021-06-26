export const paystackCharge = (amount: number) => {
  const chargeBelow100 = (1.5 / 50) * amount;
  if(amount <= 2500) {
    return chargeBelow100;
  }
  const charge = ((1.5 / 100) * amount) + 150;
  if (charge >= 2000) {
    return 2000;
  }

  return charge;
};
