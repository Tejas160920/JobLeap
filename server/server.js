const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); 

console.log("Mongo URI:", process.env.MONGO_URI);



const app = express();
connectDB(); 

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});





const jobRoutes = require("./routes/jobRoutes");
app.use("/api", jobRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
