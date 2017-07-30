import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { logInUser } from './AuthActions';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enteredEmail: '',
            enteredPassword: '',
        };
    }

    handleEmailChange(event) {
        this.setState({ enteredEmail: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ enteredPassword: event.target.value });
    }

    handleLoginButtonClick(event) {
        event.preventDefault();

        const user = ({
            email: this.state.enteredEmail,
            password: this.state.enteredPassword
        });

        this.props.logInUser(user);
    }

    renderHelper() {
        debugger;
        if (this.props.isAuthorized === true) {
            return (
                <Redirect to="/boards"/>
            );
        } else {
            return (
                <form className="form-horizontal">
                    <fieldset>
                        <legend>Auth</legend>
                        <div className="form-group">
                            <label className="col-md-4 control-label">E-mail</label>
                            <div className="col-md-4">
                                <input id="textinput" onChange={ this.handleEmailChange.bind(this) }
                                       name="textinput" type="text" placeholder="Enter e-mail"
                                       className="form-control input-md"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Password</label>
                            <div className="col-md-4">
                                <input id="passwordinput" onChange={ this.handlePasswordChange.bind(this) }
                                       name="passwordinput" type="password" placeholder="Enter password"
                                       className="form-control input-md"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <button id="login-button" name="login-button" className="btn btn-info"
                                        onClick={ this.handleLoginButtonClick.bind(this) }>
                                    Log in
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            );
        }
    }

    render() {
        return (
            <div>
                { this.renderHelper() }
            </div>
        );
    }
}

function mapStoreToProps(store) {
    return {
        isAuthorized: store.auth.isAuthorized,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logInUser }, dispatch);
};

export default connect(mapStoreToProps, mapDispatchToProps)(Auth);
