import React from 'react';
import { connect } from 'react-redux';
import CurrencyPanel from '../../components/CurrencyPanel';
import { getRates, setValue, selectFirstCurrency, selectSecondCurrency } from '../../store/actions/ratesActions';
import logo from '../../assets/logo-open-exchange-rates-white.png';
import PropTypes from 'prop-types';
import './Main.scss';

const INTERVAL = 10000;
// @TODO use slick or other slider
// @TODO eject react-scripts, here it's just not needed
// @TODO use notifications (for bigger app)
// @TODO add spinner (for bigger app) 
// @TODO use redux-saga (for bigger app)
// @TODO use custom eslint || tslint (and typescript || flow)
// @TODO use styles encapsulation e.g. by css-in-js

const Header = () => (
    <header className="currencies-header">
        <h1>Conversion Rates selector</h1>
        <h3>Only following currencies are available:</h3>
    </header>
);

const Footer = () => (
    <footer className="currencies-footer">
        <span className="currencies-footer__text">
            Powered by
        </span>
        <img className="currencies-footer__img"
            alt="Open Exchange Rates"
            src={logo}
        />
    </footer>
);

class Main extends React.PureComponent {
    interval;
    componentDidMount() {
        const { getRates } = this.props;
        getRates();
        this.interval = setInterval(() => getRates(), INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onSelectFirstCurrency = (currency) => {
        const { selectFirstCurrency } = this.props;
        selectFirstCurrency(currency);
    }

    onSelectSecondCurrency = (currency) => {
        const { selectSecondCurrency } = this.props;
        selectSecondCurrency(currency);
    }

    onInputValue = (value) => {
        const { setValue } = this.props;
        setValue(value);
    }

    render() {
        const {
            onSelectFirstCurrency,
            onSelectSecondCurrency,
            onInputValue,
            props: { firstCurrency, secondCurrency, firstValue, secondValue, rates },
        } = this;

        return (
            <div className="currencies-app">
                <Header />

                <div className="currencies-panels-list">
                    <CurrencyPanel
                        type="input"
                        onInput={onInputValue}
                        value={firstValue}
                        chosenCurrency={firstCurrency}
                        onChangeCurrency={onSelectFirstCurrency}
                        additionalCurrency={secondCurrency}
                        rates={rates}
                    />
                    <CurrencyPanel
                        type="output"
                        value={secondValue}
                        chosenCurrency={secondCurrency}
                        onChangeCurrency={onSelectSecondCurrency}
                        additionalCurrency={firstCurrency}
                        rates={rates}
                    />
                </div>
                <Footer />

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    firstCurrency: state.rates.firstCurrency,
    secondCurrency: state.rates.secondCurrency,
    rates: state.rates.rates,
    firstValue: state.rates.firstValue,
    secondValue: state.rates.secondValue,
});

const mapDispatchToProps = {
    getRates,
    setValue,
    selectFirstCurrency,
    selectSecondCurrency,
};

Main.propTypes = {
    firstCurrency: PropTypes.string,
    secondCurrency: PropTypes.string,
    rates: PropTypes.object,
    firstValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    secondValue: PropTypes.number,
    getRates: PropTypes.func,
    setValue: PropTypes.func,
    selectFirstCurrency: PropTypes.func,
    selectSecondCurrency: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

