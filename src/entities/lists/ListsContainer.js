/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import update from 'react/lib/update';
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
        console.log('push list');
        // let newState = JSON.parse(JSON.stringify(this.state));
        // newState.lists.push(listData);
        // console.dir(newState);
        //
        // return this.setState(newState);

        this.setState(update(this.state, {
            lists: {
                $push: [ listData ]
            }
        }));
    }

    onRemoveList(index) {
        console.log('remove list');
        // let newState = JSON.parse(JSON.stringify(this.state));
        // newState.lists.filter((obj) => {
        //     return obj._id !== index;
        // });
        // console.dir(newState);
        //
        // return this.setState(newState);

        this.setState(update(this.state, {
            lists: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    onMoveList(dragIndex, hoverIndex) {
        console.log('move list');
        // let newState = JSON.parse(JSON.stringify(this.state));
        // // console.dir(newState);
        // const dragList = newState.lists[dragIndex];
        //
        // newState.lists.splice(dragIndex, 1);
        // newState.lists.splice(hoverIndex, 0, dragList);
        // console.dir(newState);
        //
        // return this.setState(newState);

        const { lists } = this.state;
        const dragList = lists[dragIndex];

        this.setState(update(this.state, {
            lists: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragList]
                ]
            }
        }));
    }

    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget(
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
    return bindActionCreators({ createList, getList, updateList, deleteList }, dispatch)
};

const listTarget = {
    drop(props, monitor, component) {
        const { boardId } = props;
        const item = monitor.getItem();
        // console.dir(item);

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
