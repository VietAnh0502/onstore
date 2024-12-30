// productTypeController.js

const ProductType = require('../Model/productType'); // Adjust the path as necessary

// Create a new product type
const createProductType = async (req, res) => {
    try {
        const newProductType = new ProductType(req.body);
        await newProductType.save();
        res.status(201).json(newProductType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all product types
const getAllProductTypes = async (req, res) => {
    try {
        const productTypes = await ProductType.find();
        res.status(200).json(productTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a product type by ID
const getProductTypeById = async (req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id);
        if (!productType) {
            return res.status(404).json({ message: 'Product type not found' });
        }
        res.status(200).json(productType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product type by ID
const updateProductType = async (req, res) => {
    try {
        const updatedProductType = await ProductType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProductType) {
            return res.status(404).json({ message: 'Product type not found' });
        }
        res.status(200).json(updatedProductType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product type by ID
const deleteProductType = async (req, res) => {
    try {
        const productType = await ProductType.findByIdAndDelete(req.params.id);
        if (!productType) {
            return res.status(404).json({ message: 'Product type not found' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export controller functions
module.exports = {
    createProductType,
    getAllProductTypes,
    getProductTypeById,
    updateProductType,
    deleteProductType,
};