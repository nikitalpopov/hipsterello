import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './app/AppReducer';
import Auth from './auth/Auth';
import App from './app/App';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(ReduxPromise)
));

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
                <h1>Hipsterello</h1>
                <Route exact path="/" component={ App }/>
                <Route path="/boards" component={ App }/>
                <Route path="/login" component={ Auth }/>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
