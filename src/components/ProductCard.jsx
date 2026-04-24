import React from 'react';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card animate-fade-up">
      <div className="thumb">
        <div className="placeholder">{product.title}</div>
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="artist">{product.artist}</p>
        <p className="desc">{product.description}</p>
        <div className="card-foot">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="add" onClick={() => onAdd(product)}>
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}
