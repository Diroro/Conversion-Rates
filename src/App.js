import * as React from 'react';
import './App.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Main from './containers/Main';
import Notifications from './containers/Notifications';
class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
          <Main></Main>
          <Notifications></Notifications>
      </Provider>

    );
  }
}

export default App;
