const customerRepository = require("../repository/customer-repository");

class CustomerService {
  async createCustomer(data) {
    return await customerRepository.create(data);
  }

  async getCustomerById(id) {
    return await customerRepository.findById(id);
  }

  async getAllCustomers(filter) {
    const { total, customers } = await customerRepository.findAll(filter);
    return { total, customers };
  }

  async updateCustomer(id, data) {
    return await customerRepository.update(id, data);
  }

  async deleteCustomer(id) {
    return await customerRepository.delete(id);
  }
}

module.exports = new CustomerService();
