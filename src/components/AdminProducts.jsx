import React, { useState } from 'react';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../utils/database';

export default function AdminProducts() {
  const [products, setProducts] = useState(getAllProducts());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      const result = updateProduct(editingId, formData.title, formData.artist, formData.price, formData.description);
      if (result.success) {
        setProducts(getAllProducts());
        resetForm();
      }
    } else {
      const result = addProduct(formData.title, formData.artist, formData.price, formData.description);
      if (result.success) {
        setProducts(getAllProducts());
        resetForm();
      }
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro?')) {
      deleteProduct(id);
      setProducts(getAllProducts());
    }
  };

  const resetForm = () => {
    setFormData({ title: '', artist: '', price: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Gestión de Productos</h2>
        <button className="btn" onClick={() => { setShowForm(!showForm); resetForm(); }}>
          {showForm ? 'Cancelar' : '+ Nuevo Producto'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="title"
            placeholder="Título del producto"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artist"
            placeholder="Artista"
            value={formData.artist}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="btn">
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      )}

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.artist}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.description}</td>
                <td>
                  <button className="btn-sm edit" onClick={() => handleEdit(product)}>
                    Editar
                  </button>
                  <button className="btn-sm delete" onClick={() => handleDelete(product.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
