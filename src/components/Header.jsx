import React from 'react';

export default function Header({ onOpenCart, cartCount, onSearchChange, search }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="logo">ViniloStore</h1>
        <div className="header-right">
          <input
            className="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar vinilos, artistas..."
          />
          <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrito">
            Carrito <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
