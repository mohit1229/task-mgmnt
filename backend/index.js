const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json()); // Parses incoming JSON requests
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from Node.js backend!" });
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.once("open", () => console.log("Connected to MongoDB"));
  db.on("error", (err) => console.error(err));
  
  // Import routes
  const taskRoutes = require("./routes/taskRoutes");
  app.use("/task", itemRoutes);
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));;
