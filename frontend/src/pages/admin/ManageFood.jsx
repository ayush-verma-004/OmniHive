import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { toast } from 'react-toastify';
import foodService from '../../services/food.service';
import { Plus, X, List, UtensilsCrossed, ChevronLeft } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';

const ManageFood = () => {
    const [shops, setShops] = useState([]);
    const [view, setView] = useState('SHOPS'); // 'SHOPS' or 'ITEMS'
    const [selectedShop, setSelectedShop] = useState(null);
    const [shopItems, setShopItems] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [shopToDelete, setShopToDelete] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        openingTime: '09:00',
        closingTime: '22:00',
        image: null
    });

    const [itemFormData, setItemFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        availableFrom: '09:00',
        availableTo: '22:00',
        isVeg: true,
        image: null
    });

    const [loading, setLoading] = useState(false);

    const fetchShops = async () => {
        try {
            const data = await foodService.getAllShops();
            setShops(data);
        } catch (error) {
            // Handled by api interceptor
        }
    };

    const fetchItems = async (shopId) => {
        try {
            const data = await foodService.getItemsByShop(shopId);
            setShopItems(data);
        } catch (error) {
            // Handled by api interceptor
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    const shopColumns = [
        { header: 'Image', accessor: 'image', render: (val) => <img src={val} alt="shop" className="w-12 h-12 object-cover rounded-xl shadow-sm" /> },
        { header: 'Shop Name', accessor: 'name', render: (val) => <span className="font-bold text-text">{val}</span> },
        { header: 'Location', accessor: 'location', render: (val) => <span className="text-text-muted text-sm">{val}</span> },
        { header: 'Timings', accessor: 'openingTime', render: (val, item) => <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-full">{item.openingTime} - {item.closingTime}</span> },
        {
            header: 'Menu',
            accessor: '_id',
            render: (val, item) => (
                <button
                    onClick={() => {
                        setSelectedShop(item);
                        fetchItems(val);
                        setView('ITEMS');
                        setShowForm(false);
                    }}
                    className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-bold text-sm bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <List size={16} /> Manage Items
                </button>
            )
        },
    ];

    const itemColumns = [
        { header: 'Image', accessor: 'image', render: (val) => <img src={val} alt="item" className="w-12 h-12 object-cover rounded-xl shadow-sm" /> },
        { header: 'Item Name', accessor: 'name', render: (val) => <span className="font-bold text-text">{val}</span> },
        { header: 'Price', accessor: 'price', render: (val) => <span className="text-secondary font-black">₹{val}</span> },
        { header: 'Availability', accessor: 'availableFrom', render: (val, item) => <span className="text-xs font-bold text-gray-500">{item.availableFrom} - {item.availableTo}</span> },
        {
            header: 'Type',
            accessor: 'isVeg',
            render: (val) => (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${val ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                    {val ? 'Veg' : 'Non-Veg'}
                </span>
            )
        },
    ];

    const handleDeleteShop = async () => {
        if (!shopToDelete) return;
        try {
            setLoading(true);
            await foodService.deleteShop(shopToDelete._id);
            setShops(shops.filter(s => s._id !== shopToDelete._id));
            toast.success('Shop deleted successfully');
            setShopToDelete(null);
        } catch (error) {
            // Handled
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async () => {
        if (!itemToDelete) return;
        try {
            setLoading(true);
            await foodService.deleteItem(itemToDelete._id);
            setShopItems(shopItems.filter(i => i._id !== itemToDelete._id));
            toast.success('Item deleted from menu');
            setItemToDelete(null);
        } catch (error) {
            // Handled
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleItemInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'image') {
            setItemFormData({ ...itemFormData, image: files[0] });
        } else if (type === 'checkbox') {
            setItemFormData({ ...itemFormData, [name]: checked });
        } else {
            setItemFormData({ ...itemFormData, [name]: value });
        }
    };

    const handleSubmitShop = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            await foodService.createShop(data);
            toast.success('New food shop created');
            setShowForm(false);
            setFormData({ name: '', description: '', location: '', openingTime: '09:00', closingTime: '22:00', image: null });
            fetchShops();
        } catch (error) {
            // Toast handled
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitItem = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(itemFormData).forEach(key => {
                data.append(key, itemFormData[key]);
            });
            data.append('shop', selectedShop._id);

            await foodService.createItem(data);
            toast.success('Menu item added successfully');
            setShowForm(false);
            setItemFormData({ name: '', description: '', price: '', category: '', availableFrom: '09:00', availableTo: '22:00', isVeg: true, image: null });
            fetchItems(selectedShop._id);
        } catch (error) {
            // Toast handled
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {view === 'SHOPS' ? (
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-display font-bold">Manage Food Shops</h1>
                            <p className="text-text-muted">Register and oversee food vendors across the platform.</p>
                        </div>
                        <button onClick={() => setShowForm(true)} className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                            <Plus size={20} /> Add New Shop
                        </button>
                    </div>

                    <AdminTable
                        title="Registered Shops"
                        columns={shopColumns}
                        data={shops}
                        onDelete={(item) => setShopToDelete(item)}
                    />

                    {/* Shop Form Modal */}
                    <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Register New Shop" maxWidth="max-w-xl">
                        <form onSubmit={handleSubmitShop} className="space-y-6 py-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Shop Name</label>
                                    <input type="text" name="name" placeholder="e.g. Pizza Paradise" required onChange={handleInputChange} value={formData.name} className="input-field" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Location</label>
                                    <input type="text" name="location" placeholder="e.g. Block A, Food Court" required onChange={handleInputChange} value={formData.location} className="input-field" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Opens At</label>
                                    <input type="time" name="openingTime" required onChange={handleInputChange} value={formData.openingTime} className="input-field" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Closes At</label>
                                    <input type="time" name="closingTime" required onChange={handleInputChange} value={formData.closingTime} className="input-field" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Short Description</label>
                                <textarea name="description" placeholder="What makes this shop special?" required onChange={handleInputChange} value={formData.description} className="input-field" rows="3"></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Shop Image/Brand Logo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:border-primary/50 transition-colors">
                                    <div className="space-y-1 text-center">
                                        <Plus className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input type="file" name="image" accept="image/*" required onChange={handleInputChange} className="sr-only" />
                                            </label>
                                        </div>
                                        <p className="text-xs text-text-muted">PNG, JPG up to 10MB</p>
                                        {formData.image && <p className="text-xs text-green-600 font-bold">{formData.image.name}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 text-text font-bold rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-[2] btn-primary">
                                    {loading ? 'Registering...' : 'Register Shop'}
                                </button>
                            </div>
                        </form>
                    </Modal>

                    {/* Shop Delete Dialog */}
                    <ConfirmationDialog
                        isOpen={!!shopToDelete}
                        onClose={() => setShopToDelete(null)}
                        onConfirm={handleDeleteShop}
                        loading={loading}
                        title="Delete Shop"
                        message={`Are you sure you want to delete "${shopToDelete?.name}"? All associated menu items will be lost.`}
                    />
                </>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <button onClick={() => setView('SHOPS')} className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-bold text-sm mb-2 transition-transform hover:-translate-x-1">
                                <ChevronLeft size={16} /> Back to Shops
                            </button>
                            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                                <UtensilsCrossed className="text-secondary" />
                                {selectedShop?.name} Menu
                            </h1>
                        </div>
                        <button onClick={() => setShowForm(true)} className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                            <Plus size={20} /> Add Menu Item
                        </button>
                    </div>

                    <AdminTable
                        title={`Current Menu for ${selectedShop?.name}`}
                        columns={itemColumns}
                        data={shopItems}
                        onDelete={(item) => setItemToDelete(item)}
                    />

                    {/* Item Form Modal */}
                    <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={`Add Item to ${selectedShop?.name}`} maxWidth="max-w-xl">
                        <form onSubmit={handleSubmitItem} className="space-y-5 py-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Item Name</label>
                                    <input type="text" name="name" placeholder="e.g. Classic Margherita" required onChange={handleItemInputChange} value={itemFormData.name} className="input-field" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Price (₹)</label>
                                    <input type="number" name="price" placeholder="499" required onChange={handleItemInputChange} value={itemFormData.price} className="input-field" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Available From</label>
                                    <input type="time" name="availableFrom" required onChange={handleItemInputChange} value={itemFormData.availableFrom} className="input-field" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Until</label>
                                    <input type="time" name="availableTo" required onChange={handleItemInputChange} value={itemFormData.availableTo} className="input-field" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Category</label>
                                    <input type="text" name="category" placeholder="e.g. Main Course, Fast Food" required onChange={handleItemInputChange} value={itemFormData.category} className="input-field" />
                                </div>
                                <div className="flex items-center gap-3 px-1 pt-6">
                                    <input type="checkbox" name="isVeg" id="isVeg" checked={itemFormData.isVeg} onChange={handleItemInputChange} className="w-5 h-5 rounded accent-primary cursor-pointer" />
                                    <label htmlFor="isVeg" className="text-sm font-bold text-text cursor-pointer">Vegetarian Item</label>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Full Description</label>
                                <textarea name="description" placeholder="List ingredients or special features..." required onChange={handleItemInputChange} value={itemFormData.description} className="input-field" rows="2"></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">Item Image</label>
                                <input type="file" name="image" accept="image/*" required onChange={handleItemInputChange} className="text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                {itemFormData.image && <p className="text-xs text-green-600 font-bold mt-1 px-1">{itemFormData.image.name}</p>}
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 text-text font-bold rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-[2] btn-primary">
                                    {loading ? 'Adding...' : 'Add to Menu'}
                                </button>
                            </div>
                        </form>
                    </Modal>

                    {/* Item Delete Dialog */}
                    <ConfirmationDialog
                        isOpen={!!itemToDelete}
                        onClose={() => setItemToDelete(null)}
                        onConfirm={handleDeleteItem}
                        loading={loading}
                        title="Remove Item"
                        message={`Are you sure you want to remove "${itemToDelete?.name}" from the menu?`}
                    />
                </>
            )}
        </div>
    );
};

export default ManageFood;
