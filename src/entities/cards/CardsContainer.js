/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createCard, getCard, updateCard, deleteCard } from './CardActions';
import Card from './Card';

export class CardsContainer extends Component {
    onCreateCard(cardData) {
        this.props.createCard(cardData)
    }

    onUpdateCard(cardData) {
        this.props.updateCard(cardData)
    }

    onDeleteCard(cardData) {
        this.props.deleteCard(cardData)
    }

    render() {
        return (
            <div className="container">
                { this.props.cards
                    .map((card, index) => {
                        if (String(this.props.listId) === String(card.listId)) {
                            return (
                                <div className="col-modest align-self-center">
                                    <Card
                                        boardId={ this.props.boardId }
                                        card={ card }
                                        index={ index }
                                        onCreateCard={ this.onCreateCard.bind(this) }
                                        onUpdateCard={ this.onUpdateCard.bind(this) }
                                        onDeleteCard={ this.onDeleteCard.bind(this) }
                                    />
                                </div>
                            )} else { return null; }
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createCard, getCard, updateCard, deleteCard }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);