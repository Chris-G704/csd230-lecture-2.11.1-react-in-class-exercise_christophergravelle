import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../authProvider';

function Laptop() {
    const [laptops, setLaptops] = useState([]);
    const [error, setError] = useState(null);
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetchLaptops();
    }, []);

    function fetchLaptops() {
        axiosInstance.get('/api/laptops')
            .then(res => setLaptops(res.data))
            .catch(() => setError('Failed to load laptops.'));
    }

    function handleDelete(id) {
        if (!window.confirm('Delete this laptop?')) return;
        axiosInstance.delete(`/api/laptops/${id}`)
            .then(() => setLaptops(prev => prev.filter(l => l.id !== id)))
            .catch(() => setError('Failed to delete laptop.'));
    }

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Laptops</h2>
            {laptops.length === 0 ? (
                <p>No laptops found.</p>
            ) : (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Copies</th>
                            {/* Only render the Actions column header for admins */}
                            {isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {laptops.map(laptop => (
                            <tr key={laptop.id}>
                                <td>{laptop.id}</td>
                                <td>{laptop.title}</td>
                                <td>{laptop.brand}</td>
                                <td>${laptop.price.toFixed(2)}</td>
                                <td>{laptop.copies}</td>
                                {/* Edit and Delete buttons are hidden for non-admins */}
                                {isAdmin && (
                                    <td>
                                        <a href={`/laptops/edit/${laptop.id}`}>Edit</a>
                                        {' | '}
                                        <button onClick={() => handleDelete(laptop.id)}>
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Laptop;
