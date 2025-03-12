const express = require("express");
const connectDB = require("./db");
const userRouter = require("./routes/userRoutes.js");

const Airfryer = require("./Airfryer.js");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(userRouter);

async function startAPI() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Express server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

app.post("/airfryer", async (req, res) => {
  try {
    const { price, brand, model } = req.body;
    const newAirfryer = new Airfryer({ price, brand, model });
    await newAirfryer.save();
    res.status(201).send({ message: "airfryer added successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

startAPI();