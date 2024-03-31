const { insertManyLaptops, getAllLaptops } = require("../controllers/laptops");
const laptopRoutes = require("express").Router();

laptopRoutes.post("/insert_many", insertManyLaptops);
laptopRoutes.get("/", getAllLaptops);

module.exports = laptopRoutes;