const Product = require("../models/Product"); 
const cloudinary = require("../config/cloudinary"); 
exports.getProducts = async (req, res) => { 
try { 
const products = await Product.find(); 
res.status(200).json (products); 
} catch (err) { 
res.status(500).json({ message: err.message }); 
} 
}; 
exports.getDetailProduct = async (req, res) => { 
try { 
const {id} = req.params;
const product = await Product.findById(id); 
if (!product) { 
return res.status(404).json({ message: "Product not found" }); 
} 
res.json(product); 
} catch (error) { 
console.error(error);
res.status(500).json({message: "Server error"});
}
};

exports.createProduct = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const product = new Product({
            ...req.body,
            tumbnail: result?.secure_url,
            cloudinaryId: result?.public_id,
        });
    
    await product.save();

    res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req,params.id);
        await cloudinary.uploader.destroy(product.cloudinaryId);

        await product.deleteOne();

        res.status(200).json({ message: "Product deleted succesfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Faiiled to delete product"});
    }
};

exports.updateProduct = async (req, res) => { 
    try { 
    const {id} = req.params; 
    let product = await Product.findById(id); 
    if (!product) { 
    return res.status(404).json({ message: "Product not found" }); 
    } 
    console.log('req.file', req.file); 
    let result; 
    if (req.file) { 
    await cloudinary.uploader.destroy (product.cloudinaryId); 
    result = await cloudinary.uploader.upload(req.file.path); 
    }
    const updatedProduct = { 
    ...req.body, 
    thumbnail: result?.secure_url || product.thumbnail, 
    cloudinaryId: result?.public_id || product.cloudinaryId,
    };

    product = await Product.findByIdAndUpdate(id, updatedProduct, {new:true});

    res.status(200).json(product);
} catch (err) {
    res.status(400).json({message:err.message});
}
};