import React, { useState, useEffect, useMemo } from 'react';
import { initializeDB } from './utils/database';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import AdminProducts from './components/AdminProducts';
import AdminUsers from './components/AdminUsers';
import CartDrawer from './components/CartDrawer';

export default function App() {
  // Initialize database on mount
  useEffect(() => {
    initializeDB();
  }, []);

  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('Dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('cart');
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [{ ...product, qty: 1 }, ...prev];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleChangeQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  // Si no hay usuario logueado, mostrar Home (login + productos públicos)
  if (!user) {
    return (
      <div className="app-guest">
        <Home onLogin={handleLogin} />
        <footer className="site-footer">
          <div className="container">© {new Date().getFullYear()} ViniloStore</div>
        </footer>
      </div>
    );
  }

  // Render based on current page para usuarios logueados
  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return (
          <>
            <Hero />
            <main className="container">
              <section className="dashboard">
                <h2>¡Bienvenido, {user.name}!</h2>
                <p>Explora nuestro catálogo completo de vinilos clásicos y nuevos lanzamientos.</p>
                <p>Carrito: {cart.reduce((s, i) => s + i.qty, 0)} artículos</p>
              </section>
            </main>
          </>
        );

      case 'Productos':
        return (
          <main className="container layout">
            <aside className="filters">
              <h4>Buscar y filtrar</h4>
              <label>Artista</label>
              <select value={artistFilter} onChange={(e) => setArtistFilter(e.target.value)}>
                <option value="">Todos</option>
              </select>

              <label>Precio máximo: ${maxPrice}</label>
              <input
                type="range"
                min="0"
                max="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />

              <button
                className="btn"
                onClick={() => {
                  setArtistFilter('');
                  setMaxPrice(1000);
                  setSearch('');
                }}
              >
                Limpiar
              </button>
            </aside>

            <Products
              onAddToCart={handleAddToCart}
              search={search}
              artistFilter={artistFilter}
              maxPrice={maxPrice}
            />
          </main>
        );

      case 'Admin':
        if (user.role !== 'admin') {
          return (
            <main className="container">
              <section className="error-section">
                <h2>Acceso denegado</h2>
                <p>No tienes permisos para acceder a esta sección.</p>
              </section>
            </main>
          );
        }

        return (
          <main className="container admin-main">
            <AdminProducts />
            <AdminUsers />
          </main>
        );

      case 'Perfil':
        return (
          <main className="container">
            <section className="profile-section">
              <h2>Mi Perfil</h2>
              <div className="profile-card">
                <p>
                  <strong>Nombre:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Rol:</strong> {user.role}
                </p>
                <p>
                  <strong>Artículos en carrito:</strong> {cart.reduce((s, i) => s + i.qty, 0)}
                </p>
              </div>
            </section>
          </main>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />

      <div className="page-content">
        {renderPage()}
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onRemove={handleRemoveFromCart}
        onChangeQty={handleChangeQty}
      />

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} ViniloStore</div>
      </footer>
    </div>
  );
}
