// orderController.js
const Order = require('../Model/order');
const Cart = require('../Model/cart');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the verified token
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        const newOrder = new Order({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            })),
            total: cart.total,
        });

        await newOrder.save();

        // Optionally, after successful order placement, clear the cart
        await Cart.findByIdAndDelete(cart._id); // clear the cart after creating an order

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order details
exports.getCurrentUserOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the verified token
        const order = await Order.findOne({ user: userId }).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders for a user
exports.getAllUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the order status
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body; // Expecting the new status in the request body
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order || order.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Order not found or does not belong to the user' });
        }

        order.status = status; // Update status
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order (if needed)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order || order.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Order not found or does not belong to the user' });
        }

        await Order.findByIdAndDelete(req.params.orderId);
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};