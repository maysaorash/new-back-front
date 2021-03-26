import axios from 'axios';

const API_URL = 'http://localhost:8000/api/customers/';

class CustomerService {
  getCustomer() {
    return axios.get(API_URL);
  }

  getOneCustomer(id) {
    return axios.get(API_URL + id);
  }

  addNewCustomer(data) {
    return axios.post(API_URL, data);
  }

  updateCustomer(id, data) {
    return axios.put(API_URL + id, data);
  }

  
  deleteCustomer(id) {
    return axios.delete(API_URL + id);
  }

}

export default new CustomerService();