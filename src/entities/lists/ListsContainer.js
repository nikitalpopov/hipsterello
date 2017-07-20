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
            <div>
                { this.props.lists
                    .map((list, index) => {
                        return (
                        <List
                            list={ list }
                            index={ index }
                            onCreateList={ this.onCreateList.bind(this) }
                            onUpdateList={ this.onUpdateList.bind(this) }
                            onDeleteList={ this.onDeleteList.bind(this) }
                        />)}
                    )
                }
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
