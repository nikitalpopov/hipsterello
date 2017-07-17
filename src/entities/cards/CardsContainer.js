/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card';

export class CardsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardsId: this.props.list.cardsId
        }

        this.onCardCreate = this.onCardCreate.bind(this);

        // store.methods
    }

    onCardCreate(cardData) {
        this.props.createCard()
    }

    updateCard(cardData) {
        this.props.updateCard()
    }




    render() {
        return (
            <div>
                { this.props.cards
                    .map((card, index) => (<Card id={index} onCardCreate={this.onCardCreate} updateCard={this.updateCard}/>))
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boards,
        list: state.lists // .?
    };
}

const mapDispatchToProps = () => {

}

export default connect(mapStateToProps, null)(CardsContainer);