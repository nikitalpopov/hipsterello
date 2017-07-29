/**
 * Created by @nikitalpopov on 20/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as Menu } from 'react-burger-menu'

import { getInitialData, updateBoard } from './BoardActions';
import PageHeader from '../../app/PageHeader';
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
                <div>
                <PageHeader />
                <div id="outer-container">
                    <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }
                          className="bm-overlay" isOpen={ false } noOverlay id="padding">
                        <a id="home" className="menu-item" href="/">There are should be Boards previews</a>
                    </Menu>
                    <main id="page-wrap">
                        <div className="container col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
                            <Board
                                board={ this.props.board }
                                onUpdateBoard={ this.onUpdateBoard.bind(this) }
                            />
                        </div>
                    </main>
                </div>
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
