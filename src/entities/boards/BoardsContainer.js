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

        this.props.getInitialData(this.props.user)
    }

    onUpdateBoard(boardData) {
        this.props.updateBoard(boardData)
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            return (
                <div className="container">
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

function mapStateToProps(state) {
    debugger;
    return {
        isAuthorized: state.auth.isAuthorized,
        user: state.auth.user,
        board: state.boards
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getInitialData, updateBoard }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);
