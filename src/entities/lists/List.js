/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import CardsContainer from "../cards/CardsContainer";

export class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
        };
    }

    onChangeList(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    renderHelper() {
        if (this.props.list._id !== 0) {
            return (
                <div>
                    <h3>List</h3>
                    <div>
                        <input type="text"
                               name="title"
                               value={ this.state.title }
                               onChange={ this.onChangeList.bind(this) }
                        />

                        <button onClick={ this.props.onUpdateList(this.state) }>Save</button>
                        <button onClick={ this.props.onDeleteList(this.state) }>Delete</button>
                    </div>
                    <CardsContainer listId={ this.state._id } />
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Add list</h3>
                    <div>
                        <input type="text"
                               name="title"
                               placeholder="Add new title"
                               onChange={ this.onChangeList.bind(this) }
                        />

                        <button onClick={ this.props.onCreateList(this.state).bind(this) }>Add</button>
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

export default List;
