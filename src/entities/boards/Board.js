/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import React, { Component } from 'react';

import ListsContainer from "../lists/ListsContainer";

export class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.board.title
        }
    }

    componentWillReceiveProps(nextProps) {
        return this.setState({
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
            <div>
                <h2>Board</h2>
                <div>
                    <input type="text"
                           name="title"
                           value={ this.state.title }
                           onChange={ (event) => { this.onChangeBoard.bind(this) } }
                    />

                    <button /* onClick={ this.props.onUpdateCard(this.state) } */>Save</button>

                    <ListsContainer />
                </div>
            </div>
        )
    }
}

export default Board;
