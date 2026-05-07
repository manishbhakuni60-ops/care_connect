
require("dotenv").config();   
const express = require("express");
const cors = require("cors");
require("./config/db");       

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/hospital", require("./routes/hospitalRoutes"));
app.use("/api/patient", require("./routes/patientRoutes"));

app.get("/", (req, res) => {
  res.send("CareConnect Backend Running");
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
 