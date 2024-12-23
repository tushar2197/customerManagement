const express = require("express");
const customerController = require("../controller/customer-controller");
const router = express.Router();
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require("../validation/customerValidation");
const validate = require("../middelware/validation-middelware");

router.post(
  "/",
  validate(createCustomerSchema),
  customerController.createCustomer
);
router.get("/", customerController.getAllCustomers);

router.get("/:id", customerController.getCustomerById);
router.put(
  "/:id",
  validate(updateCustomerSchema),
  customerController.updateCustomer
);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
