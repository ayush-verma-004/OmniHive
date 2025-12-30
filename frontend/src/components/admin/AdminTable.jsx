import { Edit, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const AdminTable = ({ columns, data, onEdit, onDelete, title, actionAction }) => {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg md:text-xl font-bold text-text">{title}</h3>
                {actionAction && (
                    <button onClick={actionAction} className="btn-primary text-sm py-2 px-4 shadow-none w-full sm:w-auto">
                        + Add New
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-slate-900 text-gray-200 uppercase font-bold">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="px-6 py-4">{col.header}</th>
                            ))}
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {data.map((item, index) => (
                            <tr key={item.id || item._id || index} className="hover:bg-white/5 transition-colors">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => onEdit && onEdit(item)}
                                        className="p-2 text-primary-light hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete && onDelete(item)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No data available</div>
                )}
            </div>
        </div>
    );
};

AdminTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    title: PropTypes.string,
    actionAction: PropTypes.func,
};

export default AdminTable;
