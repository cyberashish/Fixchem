const ProductData = require("../model/product.js");
const Product = ProductData.ProductModel;

exports.createProduct = async (req,res) =>{
    try{
      const productData = req.body;
      const imageData = {"thumbnail":req.files['image'][0].filename};
      console.log(req.files);
      const images = req.files['photos'].map((item)=>{
        return item.filename;
      });
      const photosData = {"images":images};

      const data = {...productData,...imageData,...photosData};
      const product = new Product(data);
      const doc = await product.save();
      res.status(201).json(doc);
    }catch(error){
      res.status(400).json(error);
    }
}

exports.getproducts = async (req,res) => {
  try{
    const docs = await Product.find();
    res.status(200).json(docs);
  }catch(error){
     res.status(400).json(error);
  }

}
exports.getAdhesiveProducts = async (req,res) => {
  try{
    const docs = await Product.find({category:"Tile Adhesive"}).exec();
    res.status(200).json(docs);
  }catch(error){
     res.status(400).json(error);
  }

}
exports.getGroutProducts = async (req,res) => {
  try{
    const docs = await Product.find({category:"Grout"}).exec();
    res.status(200).json(docs);
  }catch(error){
     res.status(400).json(error);
  }

}
exports.getCleanerProducts = async (req,res) => {
  try{
    const docs = await Product.find({category:"Tile Cleaner"}).exec();
    res.status(200).json(docs);
  }catch(error){
     res.status(400).json(error);
  }

}
exports.getJointProducts = async (req,res) => {
  try{
    const docs = await Product.find({category:"Block Joint Mortar"}).exec();
    res.status(200).json(docs);
  }catch(error){
     res.status(400).json(error);
  }

}
exports.getTileProducts = async (req,res) => {
  try{
    const docs = await Product.find({category:"Tile Accessories"}).exec();
    res.status(200).json(docs);
  }catch(error){
     res.status(400).json(error);
  }

}
exports.getproduct = async (req,res) => {
try{
  const id = req.params.id;
  const doc = await Product.findById(id).exec();
  res.status(200).json(doc);
}catch(error){
  res.status(400).json(error);
}
}
// exports.getAdhesiveProduct = async (req,res) => {
// try{
//   const id = req.params.id;
//   const doc = await Product.find({category:"Tile Adhesive"}).exec();
//   res.status(200).json(doc);
// }catch(error){
//   res.status(400).json(error);
// }
// }
exports.replaceproduct = async (req,res) => {
try{
  const id = req.params.id;
  const doc = await Product.findOneAndReplace({"_id":id},req.body,{new:true});
  res.status(201).json(doc);
}catch(error){
  res.status(404).json(error)
}
}
exports.updateproduct = async (req,res) => {
  const id = req.params.id;
  try{
    if(req.file===undefined){
      let doc = Product.findByIdAndUpdate(id,req.body,{new:true}).exec();
      res.status(201).json(doc);
    }
    else{
      let imageData = {"thumbnail":req.file.filename};
      let productData = {...req.body,...imageData};
      let doc = Product.findByIdAndUpdate(id,productData,{new:true}).exec();
      res.status(201).json(doc);
    }
  }catch(error){
    res.status(400).json(error);
  }
}
exports.deleteproduct = async (req,res) => {
try{
  const id = req.params.id;
  const doc = await Product.findByIdAndDelete(id,{new:false});
  console.log(doc);
  res.status(200).json(doc);
}catch(error){
  res.status(404).json(error);
}
}
