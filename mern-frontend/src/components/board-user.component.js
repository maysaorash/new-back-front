import React, { Component } from "react";
import Form from "../Form";
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      isToken:false
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data,
          isToken:true
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
            isToken:error.response.data.isToken
        });
      }
    );
  }

  render() {
    console.log(this.props)
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          {this.state.isToken ? (
          <Form {...this.props} addNewCustomer={this.props.addNewCustomer} />
          ) : (
            ""
          )}
        </header>
      </div>
    );
  }
}