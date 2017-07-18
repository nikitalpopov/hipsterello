import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Board from '../entities/boards/Board';

class App extends Component {
    renderHelper() {
        if (this.props.isAuthorized) {
            return ( <Board /> );
        } else {
            return ( <Redirect to='/login'/> );
        }
    }

    render() {
        return (
            <div>
                { this.renderHelper() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
};

export default connect(mapStateToProps, null)(App);
