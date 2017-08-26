/**
 * Created by @nikitalpopov on 16/07/2017.
 */

import React, { Component } from 'react';
import { DragSource, DropTarget  } from 'react-dnd';
import { compose } from 'redux';
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

    componentWillReceiveProps(nextProps) {
        return this.setState({
            boardId: nextProps.boardId,
            index: nextProps.index
        });
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
                            id="card" name="text" value={ this.state.text }
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
                            className="panel-title form-control" type="text"
                            name="title" value={ this.state.title }
                            onChange={ this.onChangeCard.bind(this) }
                        />
                    </div>
                    <div className="panel-body">
                        <textarea
                            className="form-control" type="text" rows="1"
                            id="card" name="text" value={ this.state.text }
                            onChange={ this.onChangeCard.bind(this) }
                        />

                        <br />

                        <div className="btn-group-sm">
                            <button
                                type="button" className="btn btn-warning"
                                onClick={ (event) => { this.props.onCreateCard(this.state) } }>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(connectDropTarget(
            <div>
                { this.renderHelper() }
            </div>
        ))
    }
}

const cardSource = {
    beginDrag(props) {
        return {
            _id: props.card._id,
            listId: props.card.listId,
            card: props.card,
            index: props.index
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        // console.dir(dropResult);
        // console.dir(item);
        /**@todo check whether it works*/
        if (dropResult.listId && dropResult.listId !== item.listId) {
            props.onRemoveCard(item._id);
        }
    }
};

const cardTarget = {
    hover(props, monitor) {
        const dragId = monitor.getItem().index;
        const sourceListId = monitor.getItem().listId;
        let hoverId = null;
        if (props.card._id === 0) {
            return;
        } else hoverId = props.index;

        if (dragId === hoverId) {
            return;
        }

        if ( props.card.listId === sourceListId ) {
            props.onMoveCard(dragId, hoverId);
            monitor.getItem().index = hoverId;
        }
    }
};

export default  compose(
    DropTarget('CARD', cardTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource('CARD', cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(Card);
