// const laptops = require("../../../laptops.json");

const Laptop = require("../models/laptops");


const insertManyLaptops = async(req, res, next) => {
    try {

        await Laptop.insertMany(laptops);
        return res.status(201).json("Todos los ordenadores subidos a la BBDD");
    } catch (error) {
        return res.status(400).json(error);
    }
}

const getAllLaptops = async(req, res, next) => {
    try {
        const allLaptops = await Laptop.find();
        return res.status(200).json(allLaptops);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = { insertManyLaptops, getAllLaptops }