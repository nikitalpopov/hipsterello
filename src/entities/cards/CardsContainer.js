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
    }

    // Alternative?
    // renderHelper() {
    //     let res = '';
    //     for (let iter of this.state.cardsId.length) {
    //         res += (
    //             <Card id={ this.state.cardsId[iter] }/>
    //         )
    //     }
    //     return res;
    // }

    render() {
        return (
            <div>
                { this.props.cardsId
                    .map((card, index) => (<Card id={index} />))
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

export default connect(mapStateToProps, null)(CardsContainer);