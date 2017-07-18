/**
 * Created by @nikitalpopov on 16/07/2017.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createCard, updateCard, deleteCard } from './CardActions';

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            text: this.props.text
        };

        this.onChangeCard = this.onChangeCard.bind(this);
    }

    onChangeCard(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    // onKeyPress(event) {
    //     if (event.key === 'Enter') {
    //         this.props.updateCard(this.state)
    //     }
    // }

    createCard() {
        this.props.createCard(this.state);
    }

    saveCard() {
        this.props.updateCard(this.state);
    }

    deleteCard() {
        this.props.deleteCard(this.state)
    }

    renderHelper() {
        if (this.props.isAuthorized) {
            if (this.props.card._id !== 0) {
                return (
                    <form className="form-horizontal">
                        <fieldset>
                            <legend>Card</legend>
                            <div>
                                <input type="text"
                                       name="title"
                                       value={ this.state.title }
                                       onChange={ this.onChangeCard }
                                />

                                <input type="text"
                                       name="text"
                                       value={ this.state.text }
                                       onChange={ this.onChangeCard }
                                />

                                <button onClick={ this.saveCard }>Save</button>
                                <button onClick={ this.deleteCard }>Delete</button>
                            </div>
                        </fieldset>
                    </form>
                )
            } else {
                return (
                    <form className="form-horizontal">
                        <fieldset>
                            <legend>Add card</legend>
                            <div>
                                <input type="text"
                                       name="title"
                                       placeholder="Add new title"
                                       onChange={ this.onChangeCard }
                                />

                                <input type="text"
                                       name="text"
                                       placeholder="Add new text"
                                       onChange={ this.onChangeCard }
                                />

                                <button onClick={ this.createCard }>Add</button>
                            </div>
                        </fieldset>
                    </form>
                )
            }
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
    return bindActionCreators({ createCard, updateCard, deleteCard }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
