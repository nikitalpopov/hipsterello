import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import registerServiceWorker from './registerServiceWorker';

// import './css/index.css';
import './css/style.css';

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
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="menu-elem"><a href=""> <span className="glyphicon glyphicon-th-list"></span> Boards</a></li>
                            </ul>



                            <ul className="nav navbar-nav navbar-right">
                                <li><a href=""><span className="glyphicon glyphicon-user"></span> User Name</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="non-transperent"></div>

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
