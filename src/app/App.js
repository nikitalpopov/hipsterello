import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BoardsContainer from '../entities/boards/BoardsContainer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isAuthorized: localStorage.getItem('isAuthorized') ? (localStorage.getItem('isAuthorized') === 'true') : false
        });

        console.log(this.state.isAuthorized);
    }

    renderHelper() {
        debugger;
        if (this.state.isAuthorized === true) {
            return ( <BoardsContainer /> );
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
