import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import orderService from '../services/order.service';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        deliveryTime: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(storedCart);

        const handleCartUpdate = () => {
            setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'));
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const updateQuantity = (id, delta) => {
        const updated = cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, (item.quantity || 1) + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        setLoading(true);
        try {
            // Determine order type based on first item (Simplified logic)
            const firstItemModel = cartItems[0].onModel;
            let orderType = 'FOOD';
            if (firstItemModel === 'Cloth') orderType = 'CLOTHES';
            if (firstItemModel === 'EBook') orderType = 'EBOOK';

            const payload = {
                orderType,
                user: customer,
                items: cartItems.map(item => ({
                    product: item.id,
                    onModel: item.onModel || 'Cloth', // Defaulting if missing
                    quantity: item.quantity || 1,
                    price: item.price,
                    size: item.size
                })),
                deliveryTime: customer.deliveryTime,
                totalAmount: cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0) + 5
            };

            await orderService.createOrder(payload);
            toast.success("Order placed successfully!");
            localStorage.removeItem('cart');
            setCartItems([]);
            window.dispatchEvent(new Event('cartUpdated'));
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Go add some goodies!</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-display font-bold text-text mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item, index) => (
                        <motion.div
                            key={`${item.id}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border"
                        >
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />

                            <div className="flex-1">
                                <h3 className="font-bold text-text text-lg">{item.title}</h3>
                                <p className="text-primary-light font-bold">₹{item.price}</p>
                                {item.size && <span className="text-xs text-gray-500">Size: {item.size}</span>}
                            </div>

                            <div className="flex items-center gap-3 bg-bg border border-border rounded-lg p-1">
                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary transition-colors">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-text font-bold w-6 text-center">{item.quantity || 1}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Checkout Summary & Form */}
                <div className="lg:col-span-1">
                    <div className="bg-card p-6 rounded-xl border border-border sticky top-24">
                        <h2 className="text-xl font-bold text-text mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span>₹{shipping.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-border pt-3 flex justify-between text-text font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping Details</h3>
                            <input type="text" name="name" required placeholder="Full Name" onChange={handleInputChange} className="input-field" />
                            <input type="email" name="email" required placeholder="Email Address" onChange={handleInputChange} className="input-field" />
                            <input type="tel" name="phone" required placeholder="Phone Number" onChange={handleInputChange} className="input-field" />
                            <textarea name="address" required placeholder="Delivery Address" onChange={handleInputChange} className="input-field" rows="2"></textarea>

                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                                <label className="block text-xs font-bold text-primary uppercase mb-2 tracking-wider">Requested Delivery Time</label>
                                <input
                                    type="time"
                                    name="deliveryTime"
                                    required
                                    onChange={handleInputChange}
                                    value={customer.deliveryTime}
                                    className="input-field"
                                />
                                <p className="text-[10px] text-text-muted mt-2 italic">Please specify your preferred delivery time.</p>
                            </div>

                            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 mt-6">
                                <CreditCard className="w-5 h-5" />
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
