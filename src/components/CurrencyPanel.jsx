import React from 'react';
import { emptifyValue, getRateForCurrency as getRates, truncateToTwoSigns, isNumber } from '../helpers/helper';
import './CurrencyPanel.scss';

const chosenStyles = (flag) => ({
    'border': flag ? '1px solid white' : '1px solid transparent'
});

const CurrencyItem = ({ rates, currency, chosenCurrency, additionalCurrency, onChangeCurrency }) => (
    <div className="currencies__item"
        onClick={() => onChangeCurrency(currency)}
        style={chosenStyles(currency === chosenCurrency)}>

        {currency}

        <div className="currencies__additional">
            1 {currency} = {truncateToTwoSigns(getRates(rates, currency, additionalCurrency))} {additionalCurrency}
        </div>

    </div>
);

const CurrenciesList = (props) => {
    const { rates } = props;

    return (
        <div className="currencies__list">
            {Object.keys(rates).map((currency) => (
                <CurrencyItem
                    key={currency}
                    currency={currency}
                    {...props}
                />
            ))}
        </div>
    )
};


const Input = ({ value, onChange }) => (
    <input maxLength="10"
        className="currencies__input"
        placeholder="enter value"
        type="text"
        value={emptifyValue(value)}
        onChange={onChange}
    />
);

const RestrictedValue = ({ value }) => (
    <span className="currencies__output">
        {truncateToTwoSigns(emptifyValue(value))}
    </span>
);

const CurrenciesChosen = ({ value, onChange, chosenCurrency, type }) => (
    <div className="currencies__chosen">
        {chosenCurrency}:
        {type === 'input' && <Input value={value} onChange={onChange} />}
        {type === 'output' && <RestrictedValue value={value} />}
    </div>
);

const CurrencyPanel = (props) => {
    const { onInput } = props;

    const onChange = (event) => {
        const { value } = event.target;
        if (isNumber(value) && onInput) {
            onInput(+value.trim());
        }
    }

    return (
        <div className="currencies">
            <CurrenciesList {...props} />
            <CurrenciesChosen onChange={onChange} {...props} />
        </div>
    );
}

export default CurrencyPanel;
