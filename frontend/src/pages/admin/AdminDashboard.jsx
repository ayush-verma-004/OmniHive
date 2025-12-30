import { useEffect, useState } from 'react';
import orderService from '../../services/order.service';
import ebookService from '../../services/ebook.service';
import foodService from '../../services/food.service';
import clothService from '../../services/cloth.service';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        orders: 0,
        ebooks: 0,
        foodItems: 0,
        clothes: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [orders, ebooks, foods, clothes] = await Promise.all([
                    orderService.getAllOrders(),
                    ebookService.getAllEbooks(),
                    foodService.getAllItems(),
                    clothService.getAllClothes()
                ]);

                setStats({
                    orders: orders.length,
                    ebooks: ebooks.length,
                    foodItems: foods.length,
                    clothes: clothes.length
                });
            } catch (error) {
                console.error("Error fetching dashboard stats", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-display font-bold">Admin Dashboard</h1>
                <div className="text-sm text-gray-400">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="card group hover:bg-primary hover:border-primary transition-all duration-300">
                    <h3 className="text-gray-500 group-hover:text-white/80 transition-colors mb-1 text-sm md:text-base">Total Orders</h3>
                    <p className="text-2xl md:text-3xl font-bold text-primary group-hover:text-white transition-colors">{stats.orders}</p>
                </div>
                <div className="card group hover:bg-secondary hover:border-secondary transition-all duration-300">
                    <h3 className="text-gray-500 group-hover:text-white/80 transition-colors mb-1 text-sm md:text-base">E-Books</h3>
                    <p className="text-2xl md:text-3xl font-bold text-secondary group-hover:text-white transition-colors">{stats.ebooks}</p>
                </div>
                <div className="card group hover:bg-primary-light hover:border-primary-light transition-all duration-300">
                    <h3 className="text-gray-500 group-hover:text-white/80 transition-colors mb-1 text-sm md:text-base">Food Items</h3>
                    <p className="text-2xl md:text-3xl font-bold text-primary-light group-hover:text-white transition-colors">{stats.foodItems}</p>
                </div>
                <div className="card group hover:bg-green-500 hover:border-green-500 transition-all duration-300">
                    <h3 className="text-gray-500 group-hover:text-white/80 transition-colors mb-1 text-sm md:text-base">Clothes</h3>
                    <p className="text-2xl md:text-3xl font-bold text-green-500 group-hover:text-white transition-colors">{stats.clothes}</p>
                </div>
            </div>

            {/* Placeholder for recent activity or charts */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-soft">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <p className="text-gray-400 italic">Recent activity tracking coming soon...</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
