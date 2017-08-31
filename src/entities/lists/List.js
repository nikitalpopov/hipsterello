/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import { DragSource, DropTarget  } from 'react-dnd';
import { compose } from 'redux';

import CardsContainer from "../cards/CardsContainer";

export class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.list._id,
            title: this.props.list.title,
            boardId: this.props.boardId,
            index: this.props.index
        };
    }

    componentWillReceiveProps(nextProps) {
        return this.setState({
            boardId: nextProps.boardId,
            index: nextProps.index
        });
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
                <div className="panel panel-default">
                    <div className="panel-heading input-group">
                        <input
                            className="panel-title form-control" type="text"
                            name="title" value={ this.state.title }
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

                    <div className="panel-body">
                        <CardsContainer
                            listId={ this.props.list._id }
                            boardId={ this.props.boardId }
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading input-group">
                        <input
                            className="panel-title form-control"
                            type="text" name="title" value={ this.state.title }
                            onChange={ this.onChangeList.bind(this) }
                        />

                        <span className="input-group-btn">
                            <button
                                type="button" className="btn btn-warning btn-secondary"
                                onClick={ (event) => {  this.props.onCreateList(this.state) } }>
                                Add
                            </button>
                        </span>
                    </div>

                    <div className="panel-body">
                    </div>
                </div>
            )
        }
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;

        if (this.props.list._id !== 0) {
            return connectDragSource(connectDropTarget(
                <div>
                    { this.renderHelper() }
                </div>
            ))
        } else {
            return (
                <div>
                    { this.renderHelper() }
                </div>
            )
        }
    }
}

const listSource = {
    beginDrag(props) {
        return {
            _id: props._id,
            boardId: props.boardId,
            list: props.list,
            index: props.index
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        // console.dir(dropResult);
        // console.dir(item);
        /**@todo check whether it works (useless with lists for now, but needed for cards)*/
        if (dropResult.boardId && dropResult.boardId !== item.boardId) {
            props.onRemoveList(item._id);
        }
    }
};

const listTarget = {
    hover(props, monitor) {
        const dragId = monitor.getItem().index;
        const sourceBoardId = monitor.getItem().boardId;
        let hoverId = null;
        if (props.list._id === 0) {
            return;
        } else hoverId = props.index;

        if (dragId === hoverId) {
            return;
        }

        if ( props.boardId === sourceBoardId ) {
            props.onMoveList(dragId, hoverId);
            monitor.getItem().index = hoverId;
        }
    }
};

export default compose(
    DropTarget('LIST', listTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource('LIST', listSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(List);
