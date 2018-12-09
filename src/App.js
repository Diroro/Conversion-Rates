import React, { Component } from 'react';
import './App.css';
import { init as firebaseInit } from './scripts/firebase';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import Main from './containers';
class App extends Component {

  constructor(props) {
    super(props);
    firebaseInit();
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <Main></Main>
        </div>
      </Provider>

    );
  }
}

export default App;
