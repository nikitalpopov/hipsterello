/**
 * Created by @nikitalpopov on 20/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getInitialData, updateBoard } from './BoardActions';
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

    renderHelper() {
        if (this.props.isAuthorized) {
            return (
                <div className="container col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
                    <Board
                        board={ this.props.board }
                        onUpdateBoard={ this.onUpdateBoard.bind(this) }
                    />
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
    return bindActionCreators({ getInitialData, updateBoard }, dispatch)
};

export default connect(mapStoreToProps, mapDispatchToProps)(BoardsContainer);
