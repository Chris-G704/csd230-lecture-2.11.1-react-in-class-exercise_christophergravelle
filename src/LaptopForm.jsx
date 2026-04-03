import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../authProvider';

// Empty form state used for "Add" mode
const emptyForm = {
    title: '',
    brand: '',
    price: '',
    copies: '',
};

function LaptopForm() {
    const { id } = useParams();          // present when editing, undefined when adding
    const isEditMode = Boolean(id);

    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    // If not an admin, do not render the form at all
    if (!isAdmin) {
        return <p style={{ color: 'red' }}>Access denied. Admins only.</p>;
    }

    useEffect(() => {
        if (isEditMode) {
            axiosInstance.get(`/api/laptops/${id}`)
                .then(res => setForm(res.data))
                .catch(() => setError('Failed to load laptop.'));
        }
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...form,
            price: parseFloat(form.price),
            copies: parseInt(form.copies, 10),
        };

        const request = isEditMode
            ? axiosInstance.put(`/api/laptops/${id}`, payload)
            : axiosInstance.post('/api/laptops', payload);

        request
            .then(() => navigate('/laptops'))
            .catch(() => setError('Failed to save laptop.'));
    }

    return (
        <div>
            <h2>{isEditMode ? 'Edit Laptop' : 'Add Laptop'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Brand:</label><br />
                    <input
                        type="text"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label><br />
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Copies:</label><br />
                    <input
                        type="number"
                        name="copies"
                        value={form.copies}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <button type="submit">{isEditMode ? 'Update' : 'Add'} Laptop</button>
                <button type="button" onClick={() => navigate('/laptops')}>Cancel</button>
            </form>
        </div>
    );
}

export default LaptopForm;
