/**
 * Created by @nikitalpopov on 18/07/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createList, getList, updateList, deleteList } from './ListActions';
import List from './List';

export class ListsContainer extends Component {
    onCreateList(listData) {
        this.props.createList(listData)
    }

    onUpdateList(listData) {
        this.props.updateList(listData)
    }

    onDeleteList(listData) {
        this.props.deleteList(listData)
    }

    render() {
        return (
            <div className="col-modest">
                { this.props.lists
                    .map((list, index) => {
                        return (
                            <div className="col-xs-4">
                                <List
                                    key={ list._id } boardId={ this.props.boardId }
                                    list={ list } index={ index }

                                    onUpdateList={ this.onUpdateList.bind(this) }
                                    onDeleteList={ this.onDeleteList.bind(this) }
                                />
                            </div>
                        )}
                    )
                }
                <div className="col-xs-4">
                    <List
                        key={ 0 } boardId={ this.props.boardId } list={ ({ _id: 0}) }
                        onCreateList={ this.onCreateList.bind(this) }
                        />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lists: state.lists
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createList, getList, updateList, deleteList }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
