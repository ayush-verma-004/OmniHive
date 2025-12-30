import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import foodService from '../services/food.service';
import { toast } from 'react-toastify';
import Skeleton from '../components/ui/Skeleton';

const Food = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const shopsData = await foodService.getShopsWithItems();
                setShops(shopsData);
            } catch (error) {
                // Toast already handled by API interceptor, but we can add specific ones here
            } finally {
                setLoading(false);
            }
        };

        fetchFoodData();
    }, []);

    const handleAddToCart = (item) => {
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        currentCart.push({
            id: item._id,
            title: item.name,
            subtitle: item.category,
            price: item.price,
            image: item.image,
            onModel: 'FoodItem',
            quantity: 1
        });
        localStorage.setItem('cart', JSON.stringify(currentCart));
        toast.success(`${item.name} added to cart`);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-12 text-center animate-pulse">
                    <Skeleton className="h-12 w-64 mx-auto mb-4" />
                    <Skeleton className="h-4 w-96 mx-auto" />
                </div>
                {[1, 2].map(i => (
                    <div key={i} className="mb-16">
                        <div className="flex items-center gap-6 mb-8 pb-4 border-b border-border/50">
                            <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-2xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {[1, 2, 3, 4].map(j => (
                                <div key={j} className="card p-0 overflow-hidden">
                                    <Skeleton className="h-64 w-full rounded-none" />
                                    <div className="p-5 space-y-3">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <div className="flex justify-between items-center pt-2">
                                            <Skeleton className="h-8 w-20" />
                                            <Skeleton className="h-8 w-24" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-4">Food Court</h1>
                <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">Order delicious meals from our curated selection of top restaurants.</p>
            </div>

            {shops.length === 0 ? (
                <div className="text-center text-text-muted py-24 bg-white rounded-3xl border border-border shadow-soft">
                    <p className="text-xl font-medium">No shops available at the moment.</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {shops.map(shop => (
                        <div key={shop._id} className="animate-slide-up">
                            <div className="flex items-center gap-6 mb-8 pb-4 border-b border-border/50">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-premium border-2 border-primary/10">
                                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text">{shop.name}</h2>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <p className="text-text-muted text-sm md:text-base font-medium">{shop.location}</p>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-full border border-primary/5">
                                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                            <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                                Open: {shop.openingTime} - {shop.closingTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {shop.items.length === 0 ? (
                                <p className="text-text-muted italic py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-border">No menu items added yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                    {shop.items.map(item => (
                                        <ProductCard
                                            key={item._id}
                                            id={item._id}
                                            title={item.name}
                                            subtitle={item.category}
                                            price={item.price}
                                            rating={4.5}
                                            category={item.isVeg ? "Veg" : "Non-Veg"}
                                            image={item.image}
                                            description={item.description}
                                            type="FOOD"
                                            actionLabel="Add to Cart"
                                            onClick={() => handleAddToCart(item)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Food;
