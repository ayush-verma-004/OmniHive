import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ServiceCard = ({ icon: Icon, title, description, link, gradient }) => {
    return (
        <Link to={link} className="block group">
            <motion.div
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-2xl overflow-hidden bg-card border border-border hover:border-gray-400 transition-colors h-full`}
            >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} shadow-lg shadow-purple-900/20`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-display font-bold text-text mb-3 group-hover:text-primary transition-all">
                    {title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                    {description}
                </p>

                <div className="flex items-center text-sm font-semibold text-gray-500 group-hover:text-primary transition-colors">
                    <span>Explore Now</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </motion.div>
        </Link>
    );
};

ServiceCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    gradient: PropTypes.string.isRequired,
};

export default ServiceCard;
