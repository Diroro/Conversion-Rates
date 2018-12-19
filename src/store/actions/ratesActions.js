import { exampleRatesRequest, getRatesRequest } from "../api/ratesApi";

export const RatesActionTypes = {
    GET_RATES: '[Rates] Get rates',
    GET_RATES_STARTED: '[Rates] Get rates request started',
    GET_RATES_FAILED: '[Rates] Get rates request error',
    GET_RATES_SUCCESS: '[Rates] Get rates request success',

    SET_FIRST_CURRENCY: '[Rates] Set first currency',
    SET_SECOND_CURRENCY: '[Rates] Set second currency',

    SET_VALUE: '[Rates] Set value to input',
    //NOTIFY_ERROR: '[Rates] Notify error'
}

export const getRates = (baseCurrency = 'USD') => {
    if (baseCurrency !== 'USD') {
        throw new Error('Only USD is available as the base currency')
    }
    // It's possible to get just convertsions, 
    // but it will lead to more request sent and the plan will be expired sooner
    return (dispatch) => {
        dispatch(getRatesStarted());
        getRatesRequest(baseCurrency)
        // exampleRatesRequest()
            .then((res) => {
                dispatch(getRatesSuccess({rawRates: res.rates, baseCurrency}));
            })
            .catch(error => {
                dispatch(getRatesFailed(error));
            });
    }
}

export const getRatesStarted = () => ({
    type: RatesActionTypes.GET_RATES_STARTED
});

export const getRatesSuccess = ({ rawRates, baseCurrency }) => ({
    type: RatesActionTypes.GET_RATES_SUCCESS,
    payload: { rawRates, baseCurrency }
});

export const getRatesFailed = (error) => ({
    type: RatesActionTypes.GET_RATES_FAILED,
    payload: { error }
});

export const selectFirstCurrency = (firstCurrency) => ({
    type: RatesActionTypes.SET_FIRST_CURRENCY,
    payload: { firstCurrency }
});

export const selectSecondCurrency = (secondCurrency) => ({
    type: RatesActionTypes.SET_SECOND_CURRENCY,
    payload: { secondCurrency }
});

export const setValue = (firstValue) => ({
    type: RatesActionTypes.SET_VALUE,
    payload: { firstValue }
});
