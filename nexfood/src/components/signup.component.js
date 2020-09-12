import React, { Component } from "react";
import api from "../services/api"
import { login } from "../services/auth";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: ""
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
        console.log(this.state)

        api.post("/auth/register", this.state)
            .then(response => {
                console.log(response.data.token);
                login(response.data.token)
                window.location = "/dashboard";
            })
            .catch(error => {
                console.log("registration error", error);
            });
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Cadastro</h3>

                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" name ="name" className="form-control" placeholder="First name" value={this.state.name} onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email"  value={this.state.email} onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>

            </form>
        );
    }
}
