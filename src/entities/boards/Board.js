/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBoardByUser } from './BoardActions'

export class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: getBoardByUser(this.props.user)
        };
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            return <div><h1>Welcome!</h1><br />There is your board:</div>
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
        board: state.board
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getBoardByUser }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
