/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBoards } from './BoardActions'

export class Boards extends Component {
    handleBoardsLoad(event) {
        event.preventDefault();

        getBoards( this.store.user );
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            this.handleBoardsLoad.bind(this);
            return <div><h1>Welcome!</h1><br />There are your boards:</div>
        }

        if (!this.props.isAuthorized) {
            return (
                <div><Redirect to="/login" /></div>
            );
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

function mapStateToProps(state) {
    return {
        isAuthorized: state.auth.isAuthorized
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getBoards }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps())(Boards);
