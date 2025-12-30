import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'E-Books', path: '/ebooks' },
        { name: 'Food', path: '/food' },
        { name: 'Clothes', path: '/clothes' },
    ];

    const isAdmin = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
            setCartCount(count);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('cartUpdated', updateCount);
        updateCount();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('cartUpdated', updateCount);
        };
    }, []);

    if (isAdmin) return null;

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3 bg-white/80 backdrop-blur-xl shadow-soft border-b border-border/50' : 'py-5 bg-transparent'}`}>
            <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                        <img src="/logo.svg" className="h-6 w-auto brightness-0 group-hover:brightness-100 invert group-hover:invert-0 transition-all duration-500" alt="OmniHive" />
                    </div>
                    <span className="text-xl font-display font-black tracking-tighter text-text">
                        Omni<span className="text-primary">Hive</span>
                    </span>
                </Link>

                <div className="flex md:order-2 items-center gap-2 sm:gap-4">
                    <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group">
                        <ShoppingCart className="w-6 h-6 text-text group-hover:text-primary transition-colors" />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white shadow-lg ring-2 ring-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    {/* Login hidden for better UX as per request */}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2.5 md:hidden text-text hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-1 order-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-5 py-2 text-sm font-bold rounded-xl transition-all relative group ${location.pathname === link.path ? 'text-primary' : 'text-text-muted hover:text-text'
                                }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div layoutId="nav-active" className="absolute bottom-0 left-5 right-5 h-0.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold p-3 rounded-2xl ${location.pathname === link.path ? 'bg-primary/5 text-primary' : 'text-text-muted'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {/* Mobile login hidden */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
