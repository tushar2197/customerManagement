const Customer = require("../model/customer-model");

class CustomerRepository {
  async create(data) {
    return await Customer.create(data);
  }

  async findById(id) {
    return await Customer.findById(id);
  }

  async findAll(filters = {}) {
    console.log(filters);
    let whereCluase = {};
    const { searchTerm = "", page = 1, limit = 10 } = filters;
    if (searchTerm != "") {
      whereCluase = {
        ...whereCluase,
        $or: [
          { firstName: new RegExp(searchTerm, "i") },
          { lastName: new RegExp(searchTerm, "i") },
          { email: new RegExp(searchTerm, "i") },
        ],
      };
    }

    console.log(whereCluase);
    let customer = await Customer.find(whereCluase)
      .skip((page - 1) * limit)
      .limit(limit);

    let total = await Customer.countDocuments(whereCluase);
    return { total, customers: customer };
  }

  async update(id, data) {
    return await Customer.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Customer.findByIdAndDelete(id);
  }
}

module.exports = new CustomerRepository();
