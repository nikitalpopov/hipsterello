/**
 * Created by @nikitalpopov on 16/07/2017.
 */

import React, { Component } from 'react';

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            text: this.props.text
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
                <form className="form-horizontal">
                    <fieldset>
                        <legend>Card</legend>
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

                            <button onClick={ this.props.onUpdateCard(this.state) }>Save</button>
                            <button onClick={ this.props.onDeleteCard(this.state) }>Delete</button>
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
                                   onChange={ this.onChangeCard.bind(this) }
                            />

                            <input type="text"
                                   name="text"
                                   placeholder="Add new text"
                                   onChange={ this.onChangeCard.bind(this) }
                            />

                            <button onClick={ this.props.onCreateCard(this.state).bind(this) }>Add</button>
                        </div>
                    </fieldset>
                </form>
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
