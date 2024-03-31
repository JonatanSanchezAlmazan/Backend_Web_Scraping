require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const { scrapper } = require("./src/utils/scrapper/scrapper");
const laptopRoutes = require("./src/api/routes/laptops");
const app = express();
connectDB();

app.use("/api/v1/laptops", laptopRoutes);
app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");

});

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
})

scrapper("https://www.pccomponentes.com/portatiles");