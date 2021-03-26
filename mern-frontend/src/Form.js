import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      city: "",
      isActive: true,
    };
    this.initialState = this.state;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state);
    this.props.addNewCustomer(this.state)
    
    this.setState(this.initialState);
  };

  render() {
    const { name, email, city, phone } = this.state;
    console.log(this.props)
    return (
      <div className="container" style={{"width": "22rem"}}>
        <h2>
          {this.state.name
            ? `entered customer values are : ${this.state.name} , ${this.state.email} and ${this.state.city}`
            : ""}
        </h2>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Customer</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">Phone <small>Format: 123-456-7890</small></label>
          
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={this.handleChange}
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
          {this.props.message && (
              <div className="form-group">
                <div
                  className={
                    this.props.success
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.props.message}
                </div>
              </div>
            )}
        </form>
      </div>
    );
  }
}

export default Form;
