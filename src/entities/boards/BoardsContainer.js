/**
 * Created by @nikitalpopov on 20/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getInitialData, updateBoard } from './BoardActions';
import { logOutUser } from '../../auth/AuthActions';
import Board from './Board';

export class BoardsContainer extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('_id')) {
            this.props.getInitialData({ _id: localStorage.getItem('_id') })
        } else {
            this.props.getInitialData(this.props.user)
        }
    }

    onUpdateBoard(boardData) {
        this.props.updateBoard(boardData)
    }

    handleLogoutButtonClick(event) {
        event.preventDefault();

        this.props.logOutUser(this.props.user);
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            return (
                <div className="container col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
                    <Board
                        board={ this.props.board }
                        onUpdateBoard={ this.onUpdateBoard.bind(this) }
                    />
                    <button type="button" className="btn btn-warning"
                            onClick={ (event) => { this.handleLogoutButtonClick.bind(this) } }>
                        Log out
                    </button>
                </div>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
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

function mapStoreToProps(store) {
    return {
        isAuthorized: store.auth.isAuthorized,
        user: store.auth.user,
        board: store.boards
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getInitialData, updateBoard, logOutUser }, dispatch)
};

export default connect(mapStoreToProps, mapDispatchToProps)(BoardsContainer);
