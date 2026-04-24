import React from 'react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
  };

  return (
    <section id="contacto" className="container contact">
      <h3>Contacto</h3>
      <p>¿Tienes una pregunta? Escríbenos y te respondemos pronto.</p>
      <form onSubmit={handleSubmit}>
        <input placeholder="Tu nombre" required />
        <input placeholder="Tu email" type="email" required />
        <textarea placeholder="Mensaje" required></textarea>
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}
