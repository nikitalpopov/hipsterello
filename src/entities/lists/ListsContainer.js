/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { createList, getList, updateList, deleteList, moveList } from './ListActions';
import List from './List';

export class ListsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: this.props.lists
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            boardId: nextProps.boardId,
            lists: nextProps.lists
        });
    }

    onCreateList(listData) {
        this.props.createList(listData)
    }

    onUpdateList(listData) {
        this.props.updateList(listData)
    }

    onDeleteList(listData) {
        this.props.deleteList(listData)
    }

    onPushList(listData) {
        // console.log('push list');
        let newState = JSON.parse(JSON.stringify(this.state));
        newState.lists.push(listData);

        this.props.moveList(newState);
    }

    onRemoveList(index) {
        // console.log('remove list');
        let newState = JSON.parse(JSON.stringify(this.state));
        newState.lists.filter((obj) => {
            return obj._id !== index;
        });

        this.props.moveList(newState);
    }

    onMoveList(dragIndex, hoverIndex) {
        // console.log('move list');
        let newState = JSON.parse(JSON.stringify(this.state));
        const dragList = newState.lists[dragIndex];

        newState.lists.splice(dragIndex, 1);
        newState.lists.splice(hoverIndex, 0, dragList);

        this.props.moveList(newState);
    }

    renderLists() {
        if (this.props.lists.length === 0) {
            return '';
        }

        return this.props.lists.map((list, index) => {
            return (
                <div key={ list._id } className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <List
                        key={ list._id } boardId={ this.props.boardId }
                        list={ list } index={ index }
                        onUpdateList={ this.onUpdateList.bind(this) }
                        onDeleteList={ this.onDeleteList.bind(this) }
                        onPushList=  { this.onPushList.bind(this) }
                        onRemoveList={ this.onRemoveList.bind(this) }
                        onMoveList=  { this.onMoveList.bind(this) }
                    />
                </div>
            )
        });
    }

    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget(
            <div>
                { this.renderLists() }

                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <List
                        key={ 0 } boardId={ this.props.boardId }
                        list={ ({ _id: 0, title: "Add new list" }) }
                        index={ this.props.lists.length }
                        onCreateList={ this.onCreateList.bind(this) }
                        />
                </div>
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        lists: store.lists
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createList,
        getList,
        updateList,
        deleteList,
        moveList
    }, dispatch)
};

const listTarget = {
    drop(props, monitor, component) {
        const { boardId } = props;
        const item = monitor.getItem();

        if (boardId !== item.boardId) component.onPushList(item.list);

        return {
            boardId: boardId
        };
    }
};

export default compose(
    DropTarget('LIST', listTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    })),
    connect(mapStoreToProps, mapDispatchToProps)
)(ListsContainer);
