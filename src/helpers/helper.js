
// caluclate rate for currency using rates object
export const getRateForCurrency = (rates, firstCurrency, secondCurrency ) =>
    rates && rates[firstCurrency] && rates[secondCurrency] ? rates[secondCurrency] / rates[firstCurrency] : 0;

export const truncateToTwoSigns = (num) => Math.trunc(num * 100) / 100;

// show empty string instead of 0
export const emptifyValue = (value) => value === 0 ? '' : value;

// return true if we can use this value in application as number
// empty string is also allowed
export const isNumber = (value) => (value || value === 0 || value === '') && !isNaN(value);

export const calculateNewValue = ({firstValue, rates, firstCurrency, secondCurrency}) =>  firstValue * getRateForCurrency(rates, firstCurrency, secondCurrency);
