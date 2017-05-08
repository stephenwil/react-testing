import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from 'react-redux';
import configureStore from './js/store/configureStore';

import CakeLister from './js/components/CakeLister/cakelister';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <h1>Cakes</h1>
        </div>

        <CakeLister/>

      </div>
        </Provider>
    );
  }
}

export default App;
