const customerService = require("../service/customer-service");

class CustomerController {
  async createCustomer(req, res) {
    try {
      const customer = await customerService.createCustomer(req.body);
      return res.status(201).json({
        success: true,
        message: "customer create successfully",
        data: customer,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: error.message, data: [] });
    }
  }

  async getCustomerById(req, res) {
    try {
      const customer = await customerService.getCustomerById(req.params.id);
      if (!customer) throw new Error(`Customer not found`);
      return res
        .status(200)
        .json({ success: true, message: "Customer found", data: customer });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error.message, data: [] });
    }
  }

  async getAllCustomers(req, res) {
    try {
      const { customers, total } = await customerService.getAllCustomers(
        req.query
      );

      return res.status(200).json({
        success: true,
        message: "Customers found",
        data: customers,
        total,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: error.message, data: [] });
    }
  }

  async updateCustomer(req, res) {
    try {
      const customer = await customerService.updateCustomer(
        req.params.id,
        req.body
      );
      if (!customer)
        return res
          .status(404)
          .json({ success: false, message: "Customer not found", data: [] });
      res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: customer,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: error.message, data: [] });
    }
  }

  async deleteCustomer(req, res) {
    try {
      const result = await customerService.deleteCustomer(req.params.id);
      if (!result)
        return res.status(404).json({ message: "Customer not found" });
      res.status(204).send({ message: "Customer deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error.message, data: [] });
    }
  }
}

module.exports = new CustomerController();
