/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getInitialData } from './BoardActions'
import ListsContainer from "../lists/ListsContainer";

export class Board extends Component {
    constructor(props) {
        super(props);

        this.props.getInitialData(this.props.user);

        this.state = {
            // Наверняка this.props.boards пустой из-за промиса выше
            title: this.props.board.title
        }
    }

    onChangeBoard(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            return (
                <div>
                    <h2>Board</h2>
                    <div>
                        <h2>Welcome!</h2>
                        <h2>There is your board:</h2>

                        <input type="text"
                               name="title"
                               value={ this.state.title }
                               onChange={ this.onChangeBoard.bind(this) }
                        />

                        <button /* onClick={ this.props.onUpdateCard(this.state) } */>Save</button>
                        <button /* onClick={ this.props.onDeleteCard(this.state) } */>Delete</button>

                        <ListsContainer />
                    </div>
                </div>
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
