import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './app/AppReducer';
import App from './app/App';
import Auth from './auth/Auth';
import NotFound from './app/NotFound';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(ReduxPromise)
));

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
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
