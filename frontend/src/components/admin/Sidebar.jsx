import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Utensils, Shirt, ShoppingBag, LogOut, LayoutDashboard, X } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = ({ onClose }) => {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'E-Books', path: '/admin/ebooks', icon: BookOpen },
        { name: 'Food Shops', path: '/admin/food', icon: Utensils },
        { name: 'Clothes', path: '/admin/clothes', icon: Shirt },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    ];

    return (
        <aside className="w-72 md:w-64 bg-white border-r border-border flex flex-col h-full shadow-2xl md:shadow-none">
            <div className="p-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-text flex items-center gap-2">
                        <img src="/logo.svg" className="h-10 w-auto object-contain" alt="OmniHive Logo" />
                        <span><span className="text-primary-light">Omni</span>Hive</span>
                    </h2>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Admin Panel</span>
                </div>
                <button
                    onClick={onClose}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={onClose}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-primary"
                            )}
                        >
                            <Icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-primary")} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border bg-slate-50/50">
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Back to Site</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
