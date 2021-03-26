import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Particles from "react-particles-js";
import particlesConfig from './particlesConfig';

import AuthService from "./services/auth.service";
import CustomerService from "./services/customer.service";

import Navbar from "./Navbar";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Table from "./Table";
import Details from "./Details";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      users: [],
      oneUser: {},
      message:"",
      success:false,
      updateMessage:"",
      updateSuccess:false,
      deleteMessage:"",
      deleteSuccess:false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    this.getCustomer();
  }

  logOut() {
    AuthService.logout();
  }

  getCustomer = () => {
    CustomerService.getCustomer()
      .then((result) => {
        //console.log(result)
        this.setState({ users: result.data })})
      .catch((error) => console.log(error.message));
  };

  getOneCustomer = (id) => {
    // console.log("getonecustomer çalıştı");
    // const url = `http://localhost:8000/api/customers/${id}`;
    // fetch(url)
    CustomerService.getOneCustomer(id)
      .then((result) => {
        console.log(result)
        this.setState({ oneUser: result.data })})
      .catch((error) => console.log(error.message));
  };

  addNewCustomer = (data) => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // };
    // fetch("http://localhost:8000/api/customers", requestOptions)
    //   .then((response) => response.json())
    CustomerService.addNewCustomer(data)
    .then(response => {
        console.log(response.data.message);
        this.setState({message:response.data.message})
        this.setState({success:true})
        setTimeout(() => {
          this.setState({success:false})
          this.setState({message:""})
        }, 5000);
      })
      .catch((error) => console.log(error.message));
  };

  updateCustomer = (id, data) => {
    CustomerService.updateCustomer(id, data)
    .then(response => {
        this.setState({updateMessage:response.data.message})
        this.setState({updateSuccess:true})
        setTimeout(() => {
          this.setState({updateSuccess:false})
          this.setState({updateMessage:""})
        }, 5000);
      })
      .catch((error) => console.log(error.message));
  };

  deleteCustomer = (id) => {
    CustomerService.deleteCustomer(id)
    .then(response => {
        this.setState({deleteMessage:response.data.message})
        this.setState({deleteSuccess:true})
        setTimeout(() => {
          this.setState({deleteSuccess:false})
          this.setState({deleteMessage:""})
          window.$('#deleteModal').modal('hide');
          this.getCustomer();
        }, 3000);
      })
      .catch((error) => console.log(error.message));
  };



  render() {
    //console.log(this.state);
    return (
      <div className="App" style={{ position: "relative", overflow: "hidden" }}>  
        {/* <div style={{ position: "absolute" }}>
          <Particles height="100vh" width="100vw" params={particlesConfig} />
        </div> */}
        <div>
          <Navbar props={this.state} logOut={this.logOut} />
          <div className="container mt-3">
            <Switch>
              <Route
                exact
                path="/home"
                render={(props) => (
                  <Table
                    {...props}
                    {...this.state}
                    getOneCustomer={this.getOneCustomer}
                    deleteCustomer={this.deleteCustomer}
                  />
                )}
              />
              <Route
                path="/home/:id"
                render={(props) => (
                  <Details
                    {...props}
                    updateSuccess={this.state.updateSuccess}
                    updateMessage={this.state.updateMessage}
                    oneUser={this.state.oneUser}
                    isAdmin={this.state.showAdminBoard}
                    getOneCustomer={this.getOneCustomer}
                    updateCustomer={this.updateCustomer}
                  />
                )}
              />
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route
                exact
                path="/user"
                render={(props) => (
                  <BoardUser {...props} {...this.state} addNewCustomer={this.addNewCustomer} />
                )}
              />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
