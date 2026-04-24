import React, { useState } from 'react';
import { getAllUsers, deleteUser } from '../utils/database';

export default function AdminUsers() {
  const [users, setUsers] = useState(getAllUsers());

  const handleDelete = (id) => {
    if (id === 1) {
      alert('No puedes eliminar el usuario administrador');
      return;
    }
    if (confirm('¿Estás seguro?')) {
      deleteUser(id);
      setUsers(getAllUsers());
    }
  };

  return (
    <div className="admin-section">
      <h2>Gestión de Usuarios</h2>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role role-${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <button
                    className="btn-sm delete"
                    onClick={() => handleDelete(user.id)}
                    disabled={user.id === 1}
                  >
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
