import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import clothService from '../services/cloth.service';
import { toast } from 'react-toastify';
import Skeleton from '../components/ui/Skeleton';

const Clothes = () => {
    const [clothes, setClothes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClothes = async () => {
            try {
                const data = await clothService.getAllClothes();
                const formattedData = data.map(item => ({
                    id: item._id,
                    title: item.name,
                    subtitle: item.category,
                    price: item.price,
                    rating: 4.8,
                    category: item.category,
                    image: item.images[0] || 'https://via.placeholder.com/300',
                    description: item.description,
                    type: 'CLOTHES'
                }));
                setClothes(formattedData);
            } catch (error) {
                // Error handled by API interceptor
            } finally {
                setLoading(false);
            }
        };

        fetchClothes();
    }, []);

    const handleAddToCart = (item) => {
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        currentCart.push({ ...item, quantity: 1, onModel: 'Cloth' });
        localStorage.setItem('cart', JSON.stringify(currentCart));
        toast.success(`${item.title} added to cart`);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-12 animate-pulse">
                    <Skeleton className="h-12 w-64 mb-4" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="card p-0 overflow-hidden">
                            <Skeleton className="h-72 w-full rounded-none" />
                            <div className="p-5 space-y-3">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <div className="flex justify-between items-center pt-2">
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-4">Fashion Store</h1>
                <p className="text-text-muted text-lg leading-relaxed max-w-2xl">Discover the latest trends in fashion with our curated collection.</p>
            </div>

            {clothes.length === 0 ? (
                <div className="text-center text-text-muted py-24 bg-white rounded-3xl border border-border shadow-soft">
                    <p className="text-xl font-medium">No clothes available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {clothes.map(item => (
                        <ProductCard
                            key={item.id}
                            {...item}
                            onClick={() => handleAddToCart(item)}
                            actionLabel="Add to Cart"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Clothes;
