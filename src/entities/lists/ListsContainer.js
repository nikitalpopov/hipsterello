/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { createList, getList, updateList, deleteList } from './ListActions';
import List from './List';

export class ListsContainer extends Component {
    constructor(props) {
        super(props);

        this.setState({
            lists: this.props.lists
        })
    }

    componentWillReceiveProps(nextProps) {
        return this.setState({
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
        console.dir(listData);
        this.props.deleteList(listData)
    }

    onPushList(listData) {
        console.log('push list');
        let newState = JSON.parse(JSON.stringify(this.state));
        // console.dir(newState);
        newState.lists.push(listData);

        return this.setState(newState);
    }

    onRemoveList(index) {
        console.log('remove list');
        let newState = JSON.parse(JSON.stringify(this.state));
        // console.dir(newState);
        newState.lists.filter((obj) => {
            return obj._id !== index;
        });

        return this.setState(newState);
    }

    onMoveList(dragIndex, hoverIndex) {
        console.log('move list');
        let newState = JSON.parse(JSON.stringify(this.state));
        // console.dir(newState);
        const dragList = newState.lists[dragIndex];

        newState.lists.splice(dragIndex, 1);
        newState.lists.splice(hoverIndex, 0, dragList);
        // console.dir(newState);

        return this.setState(newState);
    }

    render() {
        // const { connectDropTarget } = this.props;

        return (
            <div>
                { this.props.lists
                    .map((list, index) => {
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
                        )}
                    )
                }
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <List
                        key={ 0 } boardId={ this.props.boardId }
                        list={ ({ _id: 0, title: "Add new list" }) }
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
    return bindActionCreators({ createList, getList, updateList, deleteList }, dispatch)
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
