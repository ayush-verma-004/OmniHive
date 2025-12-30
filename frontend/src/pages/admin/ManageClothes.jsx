import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { toast } from 'react-toastify';
import clothService from '../../services/cloth.service';
import { Plus, X } from 'lucide-react';

const ManageClothes = () => {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Men',
        price: '',
        sizes: '',
        images: []
    });
    const [loading, setLoading] = useState(false);

    const fetchClothes = async () => {
        try {
            const data = await clothService.getAllClothes();
            setItems(data);
        } catch (error) {
            toast.error('Failed to fetch clothes');
        }
    };

    useEffect(() => {
        fetchClothes();
    }, []);

    const columns = [
        { header: 'Image', accessor: 'images', render: (val) => val && val.length ? <img src={val[0]} alt="cloth" className="w-12 h-12 object-cover rounded" /> : null },
        { header: 'Product Name', accessor: 'name', render: (val) => <span className="font-bold text-white">{val}</span> },
        { header: 'Category', accessor: 'category' },
        { header: 'Price', accessor: 'price', render: (val) => `₹${val}` },
        {
            header: 'Stock', accessor: 'inStock', render: (val) => (
                <span className={!val ? 'text-red-400 font-bold' : 'text-green-400'}>
                    {val ? 'In Stock' : 'Out of Stock'}
                </span>
            )
        },
    ];

    const handleDelete = async (item) => {
        if (window.confirm(`Delete item "${item.name}"?`)) {
            try {
                await clothService.deleteCloth(item._id);
                setItems(items.filter(i => i._id !== item._id));
                toast.success('Item removed');
            } catch (error) {
                toast.error('Failed to delete item');
            }
        }
    };

    const handleEdit = (item) => toast.info(`Edit ${item.name} (Not implemented)`);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({ ...formData, images: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('price', formData.price);

            // Handle sizes split by comma
            formData.sizes.split(',').forEach(size => data.append('sizes', size.trim()));

            // Handle multiple files
            for (let i = 0; i < formData.images.length; i++) {
                data.append('images', formData.images[i]);
            }

            await clothService.createCloth(data);
            toast.success('Cloth created successfully');
            setShowForm(false);
            setFormData({ name: '', description: '', category: 'Men', price: '', sizes: '', images: [] });
            fetchClothes();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create cloth');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold">Manage Inventory</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg"
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    {showForm ? 'Cancel' : 'Add New Item'}
                </button>
            </div>

            {showForm && (
                <div className="bg-card p-6 rounded-xl border border-border mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Add New Cloth</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Product Name" required onChange={handleInputChange} className="input-field" />
                        <select name="category" onChange={handleInputChange} className="input-field">
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                        <input type="number" name="price" placeholder="Price" required onChange={handleInputChange} className="input-field" />
                        <input type="text" name="sizes" placeholder="Sizes (e.g. S, M, L)" onChange={handleInputChange} className="input-field" />
                        <textarea name="description" placeholder="Description" required onChange={handleInputChange} className="input-field md:col-span-2" rows="3"></textarea>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">Upload Images</label>
                            <input type="file" name="images" multiple accept="image/*" required onChange={handleInputChange} className="text-gray-300" />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary md:col-span-2 py-2 rounded-lg font-bold">
                            {loading ? 'Creating...' : 'Create Item'}
                        </button>
                    </form>
                </div>
            )}

            <AdminTable
                title="Clothing Catalog"
                columns={columns}
                data={items}
                onDelete={handleDelete}
                onEdit={handleEdit}
                actionAction={() => setShowForm(true)}
            />
        </div>
    );
};

export default ManageClothes;
