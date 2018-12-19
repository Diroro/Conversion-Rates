export const exampleRates = {
    disclaimer: 'https://openexchangerates.org/terms/',
    license: 'https://openexchangerates.org/license/',
    timestamp: 1449877801,
    base: 'USD',
    rates: {
        EUR: 0.88,
        GBP: 0.79,
        USD: 1
    },
}

const key = '28ffa4e26e514173844989cb339a3502';

export const getRatesRequest = (baseCurrency = 'USD') =>
    fetch(`https://openexchangerates.org/api/latest.json?app_id=${key}&base=${baseCurrency}`)
        .then((response) => response.json())
        .then(res => {
            const { EUR, GBP } = res.rates;
            return {...res, rates: { EUR, GBP }};
        });

export const exampleRatesRequest = () => {
    const random1 = (Math.random() - 0.5)/10;
    const random2 = (Math.random() - 0.5)/10;
    const newExample = {
        ...exampleRates,
        rates: {
            EUR: exampleRates.rates.EUR + random1,
            GBP: exampleRates.rates.GBP + random2
        }
    }
    return Promise.resolve(newExample);
}
