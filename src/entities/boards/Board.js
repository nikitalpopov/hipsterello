/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getInitialData } from './BoardActions'
import { ListsContainer } from "../lists/ListsContainer";

export class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: this.props.getInitialData(this.props.user)
        }
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            return (
                <form className="form-horizontal">
                    <fieldset>
                        <legend>Board</legend>
                        <div>
                            <h2>Welcome!</h2>
                            <h2>There is your board:</h2>
                            <p>{ this.props.board.title }</p>
                            <ListsContainer />
                        </div>
                    </fieldset>
                </form>
            )
        } else {
            return (
                <div>
                    <Redirect to="/login" />
                </div>
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
        user: state.auth.user,
        board: state.boards
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getInitialData }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
