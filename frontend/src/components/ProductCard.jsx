import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const ProductCard = ({ title, subtitle, price, image, rating, category, onClick, actionLabel = "View Details" }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-lg group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white uppercase">
                    {category}
                </div>
                <button
                    onClick={onClick}
                    className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-hover cursor-pointer"
                >
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-text leading-tight mb-1">{title}</h3>
                        <p className="text-sm text-gray-400">{subtitle}</p>
                    </div>
                    {rating && (
                        <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="ml-1 text-xs font-bold text-yellow-400">{rating}</span>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-secondary">₹{price}</span>
                    <button
                        onClick={onClick}
                        className="text-sm font-medium text-primary-light hover:text-white transition-colors"
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    category: PropTypes.string,
};

export default ProductCard;
