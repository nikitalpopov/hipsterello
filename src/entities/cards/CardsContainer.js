/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import React, { Component } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { createCard, getCard, updateCard, deleteCard } from './CardActions';
import Card from './Card';

export class CardsContainer extends Component {
    constructor(props) {
        super(props);

        this.setState({
            cards: this.props.cards
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            boardId: nextProps.boardId,
            listId: nextProps.listId,
            cards: nextProps.cards
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

    onPushCard(cardData) {
        console.log('push card');

        this.setState(update(this.state, {
            cards: {
                $push: [ cardData ]
            }
        }));
    }

    onRemoveCard(index) {
        console.log('remove card');

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    onMoveCard(dragIndex, hoverIndex) {
        console.log('move card');

        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }

    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget(
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                { this.props.cards.length > 0
                    ? this.props.cards
                    .map((card, index) => {
                        if (String(this.props.listId) === String(card.listId)) {
                            return (
                                <Card
                                    key={ card._id } boardId={ this.props.boardId }
                                    card={ card } index={ index }

                                    onUpdateCard={ this.onUpdateCard.bind(this) }
                                    onDeleteCard={ this.onDeleteCard.bind(this) }
                                    onPushCard=  { this.onPushCard.bind(this) }
                                    onRemoveCard={ this.onRemoveCard.bind(this) }
                                    onMoveCard=  { this.onMoveCard.bind(this) }
                                />
                            )} else { return null; }
                    }) : {}
                }
                <Card
                    key={ 0 } boardId={ this.props.boardId } index={ this.props.cards.length }
                    card={ ({ _id: 0, title: "Add new card", text: "with this text", listId: this.props.listId }) }
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

const cardTarget = {
    drop(props, monitor, component) {
        const { listId } = props;
        console.log('listId');
        console.dir(listId);
        const item = monitor.getItem();
        console.log('item');
        console.dir(item);

        if (listId !== item.listId) component.onPushList(item.card);

        return {
            listId: listId
        };
    }
};

export default compose(
    DropTarget('CARD', cardTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    })),
    connect(mapStoreToProps, mapDispatchToProps)
)(CardsContainer);