import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logInUser } from '../auth/AuthActions';
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
        return <div>{ this.renderHelper() }</div>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logInUser }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
