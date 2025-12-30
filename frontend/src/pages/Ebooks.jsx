import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ebookService from '../services/ebook.service';
import { toast } from 'react-toastify';
import Skeleton from '../components/ui/Skeleton';

const Ebooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await ebookService.getAllEbooks();
                const formattedData = data.map(book => ({
                    id: book._id,
                    title: book.title,
                    subtitle: `By ${book.author}`,
                    price: book.price,
                    rating: 5.0,
                    category: "General",
                    image: book.coverImage,
                    affiliateLink: book.affiliateLink,
                    isAffiliate: true
                }));
                setBooks(formattedData);
            } catch (error) {
                // Error handled by API interceptor
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleAffiliateClick = async (id, link) => {
        try {
            await ebookService.trackClick(id);
            window.open(link, '_blank');
        } catch (error) {
            console.error("Tracking error", error);
            window.open(link, '_blank');
        }
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
                            <Skeleton className="h-80 w-full rounded-none" />
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
                <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-4">E-Books Library</h1>
                <p className="text-text-muted text-lg leading-relaxed max-w-2xl">Explore our vast collection of digital books and curated resources.</p>
            </div>

            {books.length === 0 ? (
                <div className="text-center text-text-muted py-24 bg-white rounded-3xl border border-border shadow-soft">
                    <p className="text-xl font-medium">No ebooks available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {books.map(book => (
                        <ProductCard
                            key={book.id}
                            {...book}
                            onClick={() => handleAffiliateClick(book.id, book.affiliateLink)}
                            actionLabel="Read More"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ebooks;
