import { RatesActionTypes as _ } from '../actions/ratesActions';
import { calculateNewValue } from '../../helpers/helper';

const initialState = {
    firstCurrency: 'USD',
    secondCurrency: 'EUR',
    baseCurrency: 'USD',
    rates: {},
    firstValue: 0,
    secondValue: 0,
    error: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case _.GET_RATES_SUCCESS: {
            const { rawRates, baseCurrency } = action.payload;
            // we should add baseCurrency rate = 1 for the convert function
            return {
                ...state,
                baseCurrency,
                rates:  {
                    [baseCurrency]: 1,
                    ...rawRates,
                } ,
                secondValue: calculateNewValue(state)
            }
        }

        case _.SET_FIRST_CURRENCY: {
            return {
                ...state,
                ...action.payload,
                secondValue: calculateNewValue({...state, ...action.payload })
            }
        }

        case _.SET_SECOND_CURRENCY: {
            return {
                ...state,
                ...action.payload,
                secondValue: calculateNewValue({...state, ...action.payload })
            }
        }

        case _.SET_VALUE: {
            return {
                ...state,
                ...action.payload,
                secondValue: calculateNewValue({...state, ...action.payload })
            }
        }

        case _.NOTIFY_ERROR: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

