import React from 'react';
import Main from './components/Main';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from "./redux/configureStore";

const store = configureStore()

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
