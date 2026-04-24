import React, { useState } from 'react';
import { loginUser, registerUser } from '../utils/database';

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const result = loginUser(formData.email, formData.password);
        if (result.success) {
          setMessage('Login exitoso');
          setTimeout(() => onLogin(result.user), 500);
        } else {
          setMessage(result.message);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setMessage('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setMessage('La contraseña debe tener al menos 6 caracteres');
          setLoading(false);
          return;
        }

        const result = registerUser(formData.email, formData.password, formData.name);
        if (result.success) {
          setMessage(result.message);
          setFormData({ email: '', password: '', name: '', confirmPassword: '' });
          setIsLogin(true);
        } else {
          setMessage(result.message);
        }
      }
    } catch (error) {
      setMessage('Error en la operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card-standalone">
      <div className="login-header">
        <h2>🎵 ViniloStore</h2>
        <p>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
        </button>
      </form>

      {message && <div className={`message ${message.includes('Error') || message.includes('no') ? 'error' : 'success'}`}>{message}</div>}

      <p className="toggle-form-home">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button type="button" onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
          {isLogin ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </p>

      {isLogin && (
        <div className="demo-users-home">
          <p><strong>Demo:</strong></p>
          <p>admin@vinilo.com</p>
          <p>admin123</p>
        </div>
      )}
    </div>
  );
}
