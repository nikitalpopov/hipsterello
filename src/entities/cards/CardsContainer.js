/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createCard, getCard, updateCard, deleteCard } from './CardActions';
import Card from './Card';

export class CardsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.list.cards // list будет передан через <CardsContainer list={someList} />
        }
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
            <div>
                { this.props.cards
                    .map((card, index) => (
                        <Card
                            card={ card }
                            index={ index }
                            onCreateCard={ this.onCreateCard.bind(this) }
                            onUpdateCard={ this.onUpdateCard.bind(this) }
                            onDeleteCard={ this.onDeleteCard.bind(this) }
                        />)
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boards,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createCard, getCard, updateCard, deleteCard }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);