import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { toast } from 'react-toastify';
import orderService from '../../services/order.service';
import Modal from '../../components/ui/Modal';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [rawOrders, setRawOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await orderService.getAllOrders();
            setRawOrders(data);
            const formattedOrders = data.map(order => ({
                id: order._id,
                displayId: `#ORD-${order._id.slice(-6).toUpperCase()}`,
                customer: order.user?.name || 'Unknown',
                total: order.totalAmount,
                date: new Date(order.createdAt).toLocaleDateString(),
                status: order.status
            }));
            setOrders(formattedOrders);
        } catch (error) {
            // Error handled by API interceptor
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async () => {
        if (!orderToDelete) return;
        try {
            setIsUpdatingStatus(true);
            await orderService.deleteOrder(orderToDelete.id);
            toast.success("Order deleted successfully");
            setOrderToDelete(null);
            fetchOrders();
        } catch (error) {
            // Error handled by API interceptor
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            setIsUpdatingStatus(true);
            await orderService.updateOrderStatus(id, newStatus);
            toast.success(`Order status updated to ${newStatus}`);
            setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            fetchOrders();
        } catch (error) {
            // Error handled by API interceptor
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleViewDetails = (item) => {
        const fullOrder = rawOrders.find(o => o._id === item.id);
        setSelectedOrder(fullOrder);
    };

    const columns = [
        { header: 'Order ID', accessor: 'displayId', render: (val) => <span className="font-mono text-primary font-bold">{val}</span> },
        { header: 'Customer', accessor: 'customer', render: (val) => <span className="text-text font-medium">{val}</span> },
        { header: 'Total', accessor: 'total', render: (val) => <span className="font-bold">₹{val.toFixed(2)}</span> },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status', accessor: 'status', render: (val) => {
                const colors = {
                    'Pending': 'text-yellow-600 bg-yellow-400/10',
                    'Processing': 'text-blue-600 bg-blue-400/10',
                    'Delivered': 'text-green-600 bg-green-400/10',
                    'Cancelled': 'text-red-600 bg-red-400/10',
                };
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${colors[val] || 'text-gray-400'}`}>
                        {val}
                    </span>
                );
            }
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl font-display font-bold">Order Management</h1>
            <AdminTable
                title="Recent Orders"
                columns={columns}
                data={orders}
                onEdit={handleViewDetails}
                onDelete={(item) => setOrderToDelete(item)}
            />

            {/* Order Details Modal */}
            <Modal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title={selectedOrder ? `Order Details - #${selectedOrder._id.slice(-6).toUpperCase()}` : ''}
                maxWidth="max-w-3xl"
            >
                {selectedOrder && (
                    <div className="space-y-8 pb-4">
                        {/* Status Update Row */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Current Status</h3>
                                <span className="px-3 py-1 bg-yellow-400/10 text-yellow-700 rounded-full text-xs font-extrabold uppercase ring-1 ring-yellow-400/20">{selectedOrder.status}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    disabled={isUpdatingStatus}
                                    value={selectedOrder.status}
                                    onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                                    className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-text shadow-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all cursor-pointer"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border pb-2">Customer Info</h3>
                                <div className="space-y-1">
                                    <p className="text-text font-bold text-lg">{selectedOrder.user.name}</p>
                                    <p className="text-text-muted text-sm">{selectedOrder.user.email}</p>
                                    <p className="text-text-muted text-sm">{selectedOrder.user.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border pb-2">Delivery Address</h3>
                                <p className="text-text-muted text-sm leading-relaxed">{selectedOrder.user.address}</p>
                            </div>
                        </div>

                        {/* Additional Info: Shop and Delivery Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Delivery Schedule</h3>
                                <p className="text-text font-extrabold text-xl">{selectedOrder.deliveryTime || 'Standard Delivery'}</p>
                            </div>
                            {selectedOrder.orderType === 'FOOD' && selectedOrder.shop && (
                                <div className="bg-secondary/5 p-5 rounded-2xl border border-secondary/10">
                                    <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Fulfillment Shop</h3>
                                    <p className="text-text font-extrabold text-xl">{selectedOrder.shop.name}</p>
                                    <p className="text-text-muted text-xs font-medium">{selectedOrder.shop.location}</p>
                                </div>
                            )}
                        </div>

                        {/* Items */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border pb-2">Ordered Items</h3>
                            <div className="space-y-3">
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-border/60 hover:border-border transition-colors group">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 rounded-lg bg-white border border-border p-1 flex items-center justify-center shrink-0">
                                                <img src={item.product?.image || item.product?.coverImage} className="w-full h-full object-cover rounded-md" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-text font-bold group-hover:text-primary transition-colors">{item.product?.name || item.product?.title || 'Product'}</p>
                                                <p className="text-text-muted text-xs font-bold">{item.quantity} × ₹{item.price}</p>
                                            </div>
                                        </div>
                                        <p className="text-text font-extrabold text-lg">₹{(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/20 flex justify-between items-center text-white">
                            <span className="font-bold text-lg">Total Payable</span>
                            <span className="font-black text-3xl">₹{selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button onClick={() => setSelectedOrder(null)} className="btn-primary">
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmationDialog
                isOpen={!!orderToDelete}
                onClose={() => setOrderToDelete(null)}
                onConfirm={handleDelete}
                loading={isUpdatingStatus}
                title="Delete Order"
                message={`Are you sure you want to delete order ${orderToDelete?.displayId}? this action cannot be undone.`}
            />
        </div>
    );
};

export default Orders;
