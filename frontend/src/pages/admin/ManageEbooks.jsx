import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { toast } from 'react-toastify';
import ebookService from '../../services/ebook.service';
import { Plus, X } from 'lucide-react';

const ManageEbooks = () => {
    const [ebooks, setEbooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        affiliateLink: '',
        coverImage: null
    });
    const [loading, setLoading] = useState(false);

    const fetchEbooks = async () => {
        try {
            const data = await ebookService.getAllEbooks();
            setEbooks(data);
        } catch (error) {
            toast.error('Failed to fetch ebooks');
        }
    };

    useEffect(() => {
        fetchEbooks();
    }, []);

    const columns = [
        { header: 'Cover', accessor: 'coverImage', render: (val) => <img src={val} alt="cov" className="w-10 h-14 object-cover rounded" /> },
        { header: 'Title', accessor: 'title', render: (val) => <span className="font-bold text-white">{val}</span> },
        { header: 'Author', accessor: 'author' },
        { header: 'Price', accessor: 'price', render: (val) => `₹${val}` },
        { header: 'Clicks', accessor: 'clicks' },
    ];

    const handleDelete = async (item) => {
        if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
            try {
                await ebookService.deleteEbook(item._id);
                setEbooks(ebooks.filter(book => book._id !== item._id));
                toast.success('E-book deleted successfully');
            } catch (error) {
                toast.error('Failed to delete ebook');
            }
        }
    };

    const handleEdit = (item) => {
        toast.info(`Editing ${item.title} (Not implemented yet)`);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'coverImage') {
            setFormData({ ...formData, coverImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            await ebookService.createEbook(data);
            toast.success('E-book created successfully');
            setShowForm(false);
            setFormData({ title: '', author: '', description: '', price: '', affiliateLink: '', coverImage: null });
            fetchEbooks();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create ebook');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold">Manage E-Books</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg"
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    {showForm ? 'Cancel' : 'Add New E-Book'}
                </button>
            </div>

            {showForm && (
                <div className="bg-card p-6 rounded-xl border border-border mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Add New E-Book</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="title" placeholder="Title" required onChange={handleInputChange} className="input-field" />
                        <input type="text" name="author" placeholder="Author" required onChange={handleInputChange} className="input-field" />
                        <input type="number" name="price" placeholder="Price" required onChange={handleInputChange} className="input-field" />
                        <input type="url" name="affiliateLink" placeholder="Affiliate Link" required onChange={handleInputChange} className="input-field" />
                        <textarea name="description" placeholder="Description" required onChange={handleInputChange} className="input-field md:col-span-2" rows="3"></textarea>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">Cover Image</label>
                            <input type="file" name="coverImage" accept="image/*" required onChange={handleInputChange} className="text-gray-300" />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary md:col-span-2 py-2 rounded-lg font-bold">
                            {loading ? 'Creating...' : 'Create E-Book'}
                        </button>
                    </form>
                </div>
            )}

            <AdminTable
                title="E-Book Library"
                columns={columns}
                data={ebooks}
                onDelete={handleDelete}
                onEdit={handleEdit}
                actionAction={() => setShowForm(true)}
            />
        </div>
    );
};

export default ManageEbooks;
