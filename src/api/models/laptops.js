const mongoose = require("mongoose");

const laptopsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    views: { type: Number, required: false },
    isViews: { type: Boolean, required: true, default: true }
}, {
    timestamps: true,
    collection: "laptops"
});

const Laptop = mongoose.model("laptops", laptopsSchema, "laptops");
module.exports = Laptop;