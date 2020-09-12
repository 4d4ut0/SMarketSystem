import React, { Component } from "react";

import api from "../services/api"
import { login } from "../services/auth";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        api.post("/auth/authenticate", this.state)
            .then(response => {
                console.log(response);
                login(response.data.token);
                window.location = "/dashboard";
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password}  onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Lembrar-se</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Logar</button>

            </form>
        );
    }
}
