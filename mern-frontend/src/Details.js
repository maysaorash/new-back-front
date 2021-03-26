import React from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      city: "",
      phone: "",
      isActive: true,
    };
    this.initialState = this.props.oneUser;
  }

  componentDidMount() {
    const { name, email, city, phone } = this.props.oneUser;
    this.setState({
      name: name,
      email: email,
      city: city,
      phone: phone,
      isActive: true,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    const id = this.props.match.params.id;
    event.preventDefault();
    console.log(this.state);
    this.props.updateCustomer(id, this.state);
    this.setState(this.initialState);
    //window.location = "/home"
  };

  render() {
    console.log(this.props);
    const { name, email, city, phone } = this.props.oneUser;
    return (
      <div className="container" style={{ width: "22rem" }}>
        <h1>Details Page</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Customer</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={email}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            defaultValue={phone}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={this.handleChange}
          />
          <small>Format: 123-456-7890</small>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={city}
            onChange={this.handleChange}
          />
          {this.props.isAdmin ? <button type="submit">Update</button> : ""}
          {this.props.updateMessage && (
            <div className="form-group">
              <div
                className={
                  this.props.updateSuccess
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.props.updateMessage}
              </div>
            </div>
          )}
        </form>
        <h2>
          {this.state.name
            ? `entered customer values are : ${this.state.name} , ${this.state.email} and ${this.state.city}`
            : ""}
        </h2>
      </div>
    );
  }
}

export default Details;
