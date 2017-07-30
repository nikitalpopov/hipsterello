import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BoardsContainer from '../entities/boards/BoardsContainer';

class App extends Component {
    renderHelper() {
        debugger;
        return (this.props.isAuthorized)
            ? <div><Redirect to='/boards'/><BoardsContainer /></div>
            : <Redirect to='/login'/>;
    }

    render() {
        return (
            <div>
                { this.renderHelper() }
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        isAuthorized: store.auth.isAuthorized,
    };
}

export default connect(mapStoreToProps, null)(App);
