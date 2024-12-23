require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongo-connection");
const customerRoutes = require("./routes/customer-routes");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
