/**
 * Created by @nikitalpopov on 16/07/2017.
 */

import React, { Component } from 'react';

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
             _id: this.props.card._id,
            title: this.props.card.title,
            text: this.props.card.text
        };
    }

    onChangeCard(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    renderHelper() {
        if (this.props.card._id !== 0) {
            return (
                <div>
                    <h4>Card</h4>
                    <div>
                        <input type="text"
                               name="title"
                               value={ this.state.title }
                               onChange={ this.onChangeCard.bind(this) }
                        />

                        <input type="text"
                               name="text"
                               value={ this.state.text }
                               onChange={ this.onChangeCard.bind(this) }
                        />

                        <button onClick={ (event) => { this.props.onUpdateCard(this.state) } }>Save</button>
                        <button onClick={ (event) => { this.props.onDeleteCard(this.state) } }>Delete</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h4>Add card</h4>
                    <div>
                        <input type="text"
                               name="title"
                               value="Add new title"
                               onChange={ this.onChangeCard.bind(this) }
                        />

                        <input type="text"
                               name="text"
                               value="Add new text"
                               onChange={ this.onChangeCard.bind(this) }
                        />

                        <button onClick={ this.props.onCreateCard(this.state).bind(this) }>Add</button>
                    </div>
                </div>
            )
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

export default Card;
