/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import React, { Component } from 'react';

import ListsContainer from "../lists/ListsContainer";

export class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.board._id,
            title: this.props.board.title
        }
    }

    componentWillReceiveProps(nextProps) {
        return this.setState({
            _id: nextProps.board._id,
            title: nextProps.board.title
        });
    }

    onChangeBoard(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="input-group">
                        <input
                            className="panel-title form-control"
                            type="text" name="title" value={ this.state.title }
                            onChange={ this.onChangeBoard.bind(this) }
                        />
                        <span className="input-group-btn">
                            <button
                                type="button" className="btn btn-success btn-secondary"
                                onClick={ (event) => { this.props.onUpdateBoard(this.state) } }>
                                Save
                            </button>
                       </span>
                    </div>
                </div>

                <div className="panel-body">
                    <ListsContainer boardId={ this.state._id } />
                </div>
            </div>
        )
    }
}

export default Board;
