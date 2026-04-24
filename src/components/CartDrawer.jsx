import React from 'react';

export default function CartDrawer({ open, onClose, cartItems, onRemove, onChangeQty }) {
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  
  return (
    <aside className={'cart-drawer ' + (open ? 'open' : '')}>
      <div className="cart-head">
        <h4>Tu carrito</h4>
        <button onClick={onClose}>X</button>
      </div>
      <div className="cart-body">
        {cartItems.length === 0 ? (
          <p className="muted">El carrito está vacío</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-row">
              <div className="cart-meta">
                <div className="cart-title">{item.title}</div>
                <div className="cart-artist">{item.artist}</div>
              </div>
              <div className="cart-actions">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    onChangeQty(item.id, Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button className="remove" onClick={() => onRemove(item.id)}>
                  Eliminar
                </button>
              </div>
              <div className="cart-price">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
      <div className="cart-foot">
        <div>
          Total: <strong>${total.toFixed(2)}</strong>
        </div>
        <button className="btn" disabled={cartItems.length === 0}>
          Ir a pagar
        </button>
      </div>
    </aside>
  );
}
