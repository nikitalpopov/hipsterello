/**
 * Created by @nikitalpopov on 16/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createCard, getCard, updateCard, deleteCard } from './CardActions';

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: [/*?*/]
        }
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            return (
                <div>
                    <h1>Welcome!</h1>
                    <br />There are your cards:
                    <p>{ this.props.board.title }</p>
                </div>
            )
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
        isAuthorized: state.auth.isAuthorized,
        board: state.boards,
        card: undefined
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCard }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);