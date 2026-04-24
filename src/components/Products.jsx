import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../utils/database';

export default function Products({ onAddToCart, search, artistFilter, maxPrice }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    const results = products.filter((p) => {
      const q = (p.title + ' ' + p.artist + ' ' + (p.description || '')).toLowerCase();
      if (search && !q.includes(search.toLowerCase())) return false;
      if (artistFilter && p.artist !== artistFilter) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    setFiltered(results);
  }, [products, search, artistFilter, maxPrice]);

  return (
    <section className="products-section">
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <article key={p.id} className="card animate-fade-up">
              <div className="thumb">
                <div className="placeholder">{p.title}</div>
              </div>
              <div className="card-body">
                <h3>{p.title}</h3>
                <p className="artist">{p.artist}</p>
                <p className="desc">{p.description}</p>
                <div className="card-foot">
                  <span className="price">${p.price.toFixed(2)}</span>
                  <button className="add" onClick={() => onAddToCart(p)}>
                    Añadir
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="muted">No se encontraron productos.</p>
        )}
      </div>
    </section>
  );
}
