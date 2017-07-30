import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import App from './app/App';
import Auth from './auth/Auth';
import NotFound from './app/NotFound';

import reducer from './app/AppReducer';
let initialState = {
    auth: {
        user: { _id: localStorage.getItem('_id') },
        isAuthorized: !!localStorage.getItem('isAuthorized')
    }
};

const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(ReduxPromise)
));

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
                <h1>Hipsterello</h1>
                <Switch>
                    <Route exact path="/" component={ App } />
                    <Route path="/boards" component={ App } />
                    <Route path="/login" component={ Auth } />
                    <Route path="*" component={ NotFound } />
                </Switch>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
