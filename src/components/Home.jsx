import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../utils/database';
import Login from './Login';

export default function Home({ onLogin }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  // Productos públicos (sin login necesario)
  const publicProducts = products.filter(p => p.public === true);
  // Productos premium (solo con login)
  const premiumProducts = products.filter(p => p.public === false);

  return (
    <div className="home-container">
      {/* Sección de Login */}
      <div className="login-section">
        <Login onLogin={onLogin} />
      </div>

      {/* Sección de Productos */}
      <div className="products-section-home">
        <div className="products-header">
          <h2>🎵 Catálogo de Vinilos</h2>
          <p className="products-subtitle">Explora nuestras colecciones. Inicia sesión para ver todos nuestros productos premium.</p>
        </div>

        {/* Productos Públicos */}
        <div className="products-group">
          <h3 className="group-title">✨ Productos Destacados (Para Todos)</h3>
          <div className="products-grid">
            {publicProducts.map((product) => (
              <div key={product.id} className="product-card-home">
                <div className="card-image">
                  {product.image ? (
                    <img src={product.image} alt={product.title} />
                  ) : (
                    <div className="card-vinyl-icon">💿</div>
                  )}
                </div>
                <h4>{product.title}</h4>
                <p className="card-artist">{product.artist}</p>
                <p className="card-desc">{product.description}</p>
                <div className="card-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button className="btn-add-public">Más info</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Premium (Bloqueados) */}
        <div className="products-group">
          <h3 className="group-title">🔒 Colección Premium (Requiere Inicio de Sesión)</h3>
          <div className="products-grid">
            {premiumProducts.map((product) => (
              <div key={product.id} className="product-card-home locked">
                <div className="card-image">
                  {product.image ? (
                    <img src={product.image} alt={product.title} style={{ opacity: 0.5 }} />
                  ) : (
                    <div className="card-vinyl-icon">🔒</div>
                  )}
                  <div className="lock-overlay">🔒</div>
                </div>
                <h4>{product.title}</h4>
                <p className="card-artist">{product.artist}</p>
                <p className="card-desc">{product.description}</p>
                <div className="card-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button className="btn-locked" disabled>
                    🔒 Bloqueado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Beneficios */}
        <div className="benefits-section">
          <h3>✅ ¿Por qué registrarse?</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">📚</span>
              <h4>Acceso Completo</h4>
              <p>Desbloquea toda nuestra colección premium de vinilos</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🛒</span>
              <h4>Carrito Persistente</h4>
              <p>Guarda tus productos favoritos y compra cuando quieras</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📊</span>
              <h4>Panel Administrativo</h4>
              <p>Gestiona tu perfil y acceso a funciones exclusivas</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎁</span>
              <h4>Ofertas Especiales</h4>
              <p>Recibe notificaciones de descuentos y nuevos lanzamientos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
