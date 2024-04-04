const mongoose = require("mongoose");

// material/Product Schema
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type: String , required:true},
    description: {type : String},
    price: {type: Number, min:[0,"wrong min price"], required:true},
    discountPercentage: {type: Number, min:[0,"wrong min percentage"], max:[50,"wrong max percentage"]},
    rating: {type: Number, min:[0,"wrong min rating"], max:[5,"wrong max rating"], default:0},
    brand: {type: String},
    category: {type: String},
    thumbnail: {type: String  , required:true},
    images: [String]
})

exports.ProductModel = mongoose.model("Material",productSchema);