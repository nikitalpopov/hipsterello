/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import CardsContainer from "../cards/CardsContainer";

export class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.list._id,
            boardId: this.props.boardId,
            title: this.props.list.title,
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
                <div className="panel panel-default panel-modest">
                    <div className="panel-heading">
                        <div className="input-group">
                            <input
                                className="panel-title form-control"
                                type="text" name="title" value={ this.state.title }
                                onChange={ this.onChangeList.bind(this) }
                            />

                            <span className="input-group-btn">
                                <button
                                    type="button" className="btn btn-success btn-secondary"
                                    onClick={ (event) => { this.props.onUpdateList(this.state) } }>
                                    Save
                                </button>
                                <button
                                    type="button" className="btn btn-danger btn-secondary"
                                    onClick={ (event) => { this.props.onDeleteList(this.state) } }>
                                    Delete
                                </button>
                            </span>
                        </div>
                    </div>

                    <div className="panel-body">
                        <CardsContainer listId={ this.props.list._id } boardId={ this.props.boardId } />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="panel panel-default panel-modest">
                    <div className="panel-heading">
                        <input
                            className="panel-title"
                            type="text" name="title" value="Add new list"
                            onChange={ this.onChangeList.bind(this) }
                        />

                        <div className="btn-group-sm">
                            <button onClick={ this.props.onCreateList(this.state).bind(this) }>
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="panel-body">
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
