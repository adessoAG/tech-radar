import React, {Component} from "react";
import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import "./Login.scss"
import userService from "../services/userService";
import {FormGroup, Button, TextField} from '@material-ui/core';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            passwort: '',
            loginSuccess: '',
        }
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePasswortChanged = this.handlePasswortChanged.bind(this);
        this.verifyUserInput = this.verifyUserInput.bind(this);
    }

    handleEmailChanged(event) {
        this.setState({email: event.target.value});

    }

    handlePasswortChanged(event) {
        this.setState({passwort: event.target.value});
    }


    verifyUserInput = async (event) => {
        event.preventDefault();
        const datatest = await userService.submitUser(this.state.email, this.state.passwort);
        console.log(datatest);

        if (datatest.user != null) {
            localStorage.setItem('email', JSON.stringify(this.state.email));
            this.props.history.push('/');
            this.setState({loginSuccess: true})
        } else {
            this.setState({loginSuccess: false})
            console.log("no matching")
        }
    };


    render() {

        let error = '';
        if (this.state.loginSuccess === false) {
            error = (<div className="error">Email oder Passwort nicht korrekt</div>);
            return (
                <div className="Login">
                    <form onSubmit={this.verifyUserInput}>
                        <div className="form">
                            <h3 align="center">Willkommen beim Adesso TechnologieRadar</h3>
                            <div>{error}</div>
                            <FormGroup controlId="email">
                                <TextField error id="name" errorstyling type="email" required name="email"
                                           variant="outlined"
                                           label="email"
                                           onChange={this.handleEmailChanged}/>
                            </FormGroup>
                            <FormGroup controlId="passwort">
                                <TextField error id="passwort" name="passwort" required variant="outlined"
                                           label="passwort"
                                           onChange={this.handlePasswortChanged}/>
                            </FormGroup>

                            <div className="button">
                                <FormGroup controlId="submit">
                                    <Button variant="contained" onClick={this.verifyUserInput}
                                            bsstyle="primary">Einloggen</Button>
                                </FormGroup>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        return (
            <div className="Login">
                <form onSubmit={this.verifyUserInput}>
                    <div className="form">
                        <div className="header">
                            <h3 align="center">Willkommen beim Adesso Technologie Radar</h3>
                        </div>
                        <FormGroup controlId="email">
                            <TextField id="name" errorstyling type="email" required name="email" variant="outlined"
                                       label="email"
                                       onChange={this.handleEmailChanged}/>
                        </FormGroup>
                        <FormGroup controlId="passwort">
                            <TextField id="passwort" name="passwort" required variant="outlined" label="passwort"
                                       onChange={this.handlePasswortChanged}/>
                        </FormGroup>
                        <div className="button">
                            <FormGroup controlId="submit">
                                <Button variant="contained" onClick={this.verifyUserInput}
                                        bsstyle="primary">Einloggen</Button>
                            </FormGroup>

                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;