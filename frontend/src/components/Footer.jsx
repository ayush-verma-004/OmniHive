import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-border pt-16 pb-8">
            <div className="mx-auto w-full max-w-screen-xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    <div className="lg:col-span-5 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                                <img src="/logo.svg" className="h-6 w-auto brightness-0 group-hover:brightness-100 invert transition-all duration-500" alt="OmniHive" />
                            </div>
                            <span className="text-2xl font-display font-black tracking-tighter text-text">
                                Omni<span className="text-primary">Hive</span>
                            </span>
                        </Link>
                        <p className="text-text-muted text-lg font-medium leading-relaxed max-w-sm">
                            The ultimate digital ecosystem for knowledge, style, and taste. Elevating your daily experience.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 hover:shadow-soft transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-text uppercase tracking-widest">Ecosystem</h3>
                            <ul className="space-y-4">
                                {['E-Books', 'Food', 'Clothes'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={`/${item.toLowerCase().replace(' ', '')}`}
                                            className="text-text-muted font-bold hover:text-primary transition-colors flex items-center group gap-1"
                                        >
                                            {item}
                                            <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-text uppercase tracking-widest">Connect</h3>
                            <ul className="space-y-4">
                                {[
                                    { icon: MapPin, text: 'Tech City, IN' },
                                    { icon: Phone, text: '+91 98765 43210' },
                                    { icon: Mail, text: 'hello@omnihive.com' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-text-muted font-bold">
                                        <item.icon size={16} className="text-primary" />
                                        <span className="text-sm">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6 col-span-2 sm:col-span-1">
                            <h3 className="text-xs font-bold text-text uppercase tracking-widest">Office</h3>
                            <p className="text-text-muted text-sm font-bold leading-relaxed">
                                4th Floor, Innovation Hub,<br />
                                Silicon Valley of India,<br />
                                Bengaluru, KA 560001
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-text-muted text-sm font-bold">
                        © 2024 OmniHive. Crafted with ❤️ for a better web.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/admin/login" className="text-xs font-bold text-text-muted/40 hover:text-text transition-colors">Staff Port</Link>
                        <a href="#" className="text-xs font-bold text-text-muted hover:text-text transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs font-bold text-text-muted hover:text-text transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
