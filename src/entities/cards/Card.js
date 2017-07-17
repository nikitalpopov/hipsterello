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
            title: this.props.title
        };


        this.onChangeCard = this.onChangeCard.bind(this);
    }


    onChangeCard(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    onKeyPress(event) {
        if (event.key === 13 || event.which ===13) {
            this.props.updateCard(this.state)
        }
    }

    deleteCard() {
        this.props.deleteCard(this.state)
    }



    // this.props.createCard(cardData)
    // this.props.updateCard(cardData)
    // this.props.deleteCard(cardData)


    renderHelper() {
        return (
            <div>
            <input type="text"
                   name="title"
                   value={this.state.title}
                   onChange={this.onChangeCardTitle}
                   onKeyPress={this.onKeyPress}
                   onBlur={}
            />

                <button onClick={this.deleteCard}>Delete</button>
            </div>
        );


        if (this.props.isAuthorized) {
            return (
                <div>
                    <h4>There are your cards:</h4>
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