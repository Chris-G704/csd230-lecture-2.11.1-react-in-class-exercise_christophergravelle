import { useAuth } from '../authProvider';

function Navbar() {
    const { isAdmin, username, logout } = useAuth();

    return (
        <nav style={{ display: 'flex', gap: '1rem', padding: '0.75rem 1rem', borderBottom: '1px solid #ccc' }}>
            <a href="/books">Books</a>
            <a href="/magazines">Magazines</a>
            <a href="/laptops">Laptops</a>

            {/* Add-new links are only visible to admins */}
            {isAdmin && (
                <>
                    <a href="/books/add">+ Add Book</a>
                    <a href="/magazines/add">+ Add Magazine</a>
                    <a href="/laptops/add">+ Add Laptop</a>
                </>
            )}

            <span style={{ marginLeft: 'auto' }}>
                {username && <span>Logged in as <strong>{username}</strong></span>}
                {' '}
                <button onClick={logout}>Logout</button>
            </span>
        </nav>
    );
}

export default Navbar;
