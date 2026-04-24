import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h2 className="hero-title">Vinilos con historia y carácter</h2>
          <p className="hero-sub">
            Ediciones cuidadas, nuevos lanzamientos y clásicos de colección. Envío seguro y asesoría personalizada.
          </p>
          <a className="btn" href="#productos">
            Explorar ahora
          </a>
        </div>
        <div className="hero-art">
          <div className="vinyl-graphic" />
        </div>
      </div>
    </section>
  );
}
