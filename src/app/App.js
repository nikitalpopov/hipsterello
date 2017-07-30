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
        if (!this.props.isAuthorized === true) {
            console.log(this.state.isAuthorized);
            return ( <Redirect to='/login'/> );
        } else {
            console.log(this.state.isAuthorized);
            return ( <BoardsContainer /> );
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
