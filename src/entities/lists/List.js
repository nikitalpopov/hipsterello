/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
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

        return connectDragSource(connectDropTarget(
            <div>
                { this.renderHelper() }
            </div>
        ))
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

        if (monitor.didDrop() && dropResult && dropResult.boardId !== item.boardId) {
            props.onRemoveList(item._id);
        }
    }
};

const listTarget = {
    hover(props, monitor, component) {
        const dragId = monitor.getItem().index;
        const hoverId = props.index;
        const sourceBoardId = monitor.getItem().boardId;

        // // Don't replace items with themselves
        // if (dragId === hoverId) {
        //     console.log('dragId === hoverId');
        //     return;
        // }
        //
        // // Determine rectangle on screen
        // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        //
        // // Get vertical middle
        // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        //
        // // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        //
        // // Get pixels to the top
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        //
        // // Only perform the move when the mouse has crossed half of the items height
        // // When dragging downwards, only move when the cursor is below 50%
        // // When dragging upwards, only move when the cursor is above 50%
        //
        // // Dragging downwards
        // if (dragId < hoverId && hoverClientY < hoverMiddleY) {
        //     console.log('dragId < hoverId && hoverClientY < hoverMiddleY');
        //     return;
        // }
        //
        // // Dragging upwards
        // if (dragId > hoverId && hoverClientY > hoverMiddleY) {
        //     console.log('dragId > hoverId && hoverClientY > hoverMiddleY');
        //     return;
        // }

        // Time to actually perform the action
        if ( props.boardId === sourceBoardId ) {
            props.onMoveList(dragId, hoverId);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
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
