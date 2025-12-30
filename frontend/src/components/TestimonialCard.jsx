import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, content, rating, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 relative"
        >
            <div className="flex gap-1 mb-4 text-secondary">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />
                ))}
            </div>
            <p className="text-gray-600 italic mb-6">"{content}"</p>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{role}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialCard;
