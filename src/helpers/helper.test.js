import { 
    getRateForCurrency,
    truncateToTwoSigns, 
    emptifyValue,
    isNumber,
    calculateNewValue
} from './helper';
import { exampleRates } from '../store/api/ratesApi';

describe('getRateForCurrency ', () => {
    let firstCur;
    let secondCur;

    beforeEach(() => {
        firstCur = 'EUR';
        secondCur = 'USD';
    });

    it('calculated correctly', () => {
        const rates = { EUR: 2, USD: 4 }
        const expected = 2;
        expect(getRateForCurrency(rates, firstCur, secondCur)).toBe(expected);
    });

    it('will return 0 in case of empty rates', () => {
        const rates = {};
        const expected = 0;
        expect(getRateForCurrency(rates, firstCur, secondCur)).toBe(expected);
    });

    it('will return 0 in case of lack of first currency', () => {
        const rates = { CAD: 4, USD: 2};
        const expected = 0;
        expect(getRateForCurrency(rates, firstCur, secondCur)).toBe(expected);
    });

    it('will return 0 in case of lack of second currency', () => {
        const rates = { EUR: 4, CAD: 2};
        const expected = 0;
        expect(getRateForCurrency(rates, firstCur, secondCur)).toBe(expected);
    });
    
});

describe('truncateToTwoSigns ', () => {
    it('trucnate number to have two signs after dot', () => {
        const num = 123.4567;
        const expected = 123.45;
        expect(truncateToTwoSigns(num)).toBe(expected);
    });

    it('works correctly for 0', () => {
        const num = 0;
        const expected = 0;
        expect(truncateToTwoSigns(num)).toBe(expected);
    });

    it('works correctly for negative numbers ', () => {
        const num = -25.99999;
        const expected = -25.99;
        expect(truncateToTwoSigns(num)).toBe(expected);
    });
});


describe('emptifyValue ', () => {
    it('works for \'0\'', () => {
        const str = '0';
        const expected = '0';
        expect(emptifyValue(str)).toBe(expected);
    });

    it('works for number 0', () => {
        const str = 0;
        const expected = '';
        expect(emptifyValue(str)).toBe(expected);
    });

    it('works for any not 0 number', () => {
        const str = 123;
        const expected = 123;
        expect(emptifyValue(str)).toBe(expected);
    });

    it('works for any not \'0\' string', () => {
        const str = '123';
        const expected = '123';
        expect(emptifyValue(str)).toBe(expected);
    });

});

describe('emptifyValue ', () => {
    
});

describe('calculateNewValue ', () => {

});

