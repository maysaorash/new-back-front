import React, { Component } from "react";
import { Link } from "react-router-dom";

class Table extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>Add a character with a name and a job to the table.</p>
        <div className="container-md" style={{ width: "55rem" }}>
          <table className="table table-responsive-sm">
            <thead className="thead-light" 
            style={{ fontSize: 14, fontWeight: 600 }}>
              <tr className="align-middle text-left">
                <th scope="col">Customer</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">City</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 14, fontWeight: 500 }}>
              {this.props.users.map((item, index) => {
                return (
                  <tr className="align-middle text-left" key={index}>
                    <td className="align-middle text-left p-1">
                      <Link
                        to={"/home/" + item.id}
                        key={item.id}
                        onFocus={() => this.props.getOneCustomer(item.id)}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="align-middle text-left p-1">{item.email}</td>
                    <td className="align-middle text-left p-1">{item.phone}</td>
                    <td className="align-middle text-left p-1">{item.city}</td>
                    <td className="align-middle p-1">
                      <span
                        className={
                          item.isActive
                            ? "badge badge-success"
                            : "badge badge-danger"
                        }
                      >
                        {" "}
                        {item.isActive ? "Active" : "Inactive"}{" "}
                      </span>
                    </td>
                    <td className="align-middle text-left p-1">
                      {this.props.showAdminBoard ? (
                        <button
                          className="btn btn-secondary m-0"
                          style={{ fontSize: 14, fontWeight: 500 }}
                          onClick={() => this.props.deleteCustomer(item.id)}
                          data-toggle="modal"
                          data-target="#deleteModal"
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="deleteModal"
            data-backdrop="static"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="deleteModalTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">{this.props.deleteMessage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
