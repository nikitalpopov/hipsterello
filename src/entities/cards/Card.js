/**
 * Created by @nikitalpopov on 16/07/2017.
 */

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
             _id: this.props.card._id,
            boardId: this.props.boardId,
            listId: this.props.card.listId,
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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <input
                            className="panel-title form-control" type="text"
                            name="title" value={ this.state.title }
                            onChange={ this.onChangeCard.bind(this) }
                        />
                    </div>

                    <div className="panel-body">
                        <textarea
                            className="form-control" type="text" rows="4"
                            name="text" value={ this.state.text }
                            onChange={ this.onChangeCard.bind(this) }
                        />

                        <br />

                        <div className="btn-group-sm">
                            <button
                                type="button" className="btn btn-success"
                                onClick={ (event) => { this.props.onUpdateCard(this.state) } }>
                                Save
                            </button>
                            <button
                                type="button" className="btn btn-danger"
                                onClick={ (event) => { this.props.onDeleteCard(this.state) } }>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <input
                            className="panel-title" type="text"
                            name="title" value="Add new card"
                            onChange={ this.onChangeCard.bind(this) }
                        />
                    </div>
                    <div className="panel-body">
                        <input type="text"
                               name="text"
                               value="with this text"
                               onChange={ this.onChangeCard.bind(this) }
                        />

                        <div className="btn-group-sm">
                            <button onClick={ this.props.onCreateCard(this.state).bind(this) }>
                                Add
                            </button>
                        </div>
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
