/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createCard, getCard, updateCard, deleteCard } from './CardActions';
import Card from './Card';

export class CardsContainer extends Component {
    componentWillReceiveProps(nextProps) {
        return this.setState({
            boardId: nextProps.boardId,
            listId: nextProps.listId
        });
    }

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
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                { this.props.cards
                    .map((card, index) => {
                        if (String(this.props.listId) === String(card.listId)) {
                            return (
                                <Card
                                    key={ card._id } boardId={ this.props.boardId }
                                    card={ card } index={ index }

                                    onUpdateCard={ this.onUpdateCard.bind(this) }
                                    onDeleteCard={ this.onDeleteCard.bind(this) }
                                />
                            )} else { return null; }
                    })
                }
                <Card
                    key={ 0 } boardId={ this.props.boardId } card={ ({ _id: 0, title: "Add new card", text: "with this text", listId: this.props.listId }) }
                    onCreateCard={ this.onCreateCard.bind(this) }
                />
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        cards: store.cards
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createCard, getCard, updateCard, deleteCard }, dispatch)
};

export default connect(mapStoreToProps, mapDispatchToProps)(CardsContainer);