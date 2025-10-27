import React from 'react';
import useCart from '../hooks/useCart';

export default function CartWidget(){
  const { cart, removeFromCart, emptyCart, total } = useCart();

  React.useEffect(() => {

    const linkId = 'bootstrap-icons-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    document.body.classList.add('has-fixed-cart');
    return () => {
      document.body.classList.remove('has-fixed-cart');
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', width: '300px', zIndex: 999 }}>
      <div className="card shadow" style={{ background: 'rgba(30, 32, 36, 0.95)', border: '2px solid #00ffc8', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)', borderRadius: '16px' }}>
        <div className="card-header" style={{ background: 'linear-gradient(90deg, #00ffc8 0%, #ffb300 100%)', color: '#232526', borderTopLeftRadius: '14px', borderTopRightRadius: '14px' }}>
          <h2 className="h5 mb-0">🛒 Carrito de Compras</h2>
        </div>
        <ul className="list-group list-group-flush">
          {cart.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center" style={{ background: 'rgba(30, 32, 36, 0.95)', border: '1px solid #00ffc8', color: '#fff' }}>
              <div className="d-flex align-items-center">
                <img src={item.imagenProducto} width="40" className="me-3 rounded" alt={item.tituloProducto} />
                <span>{item.tituloProducto}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ color: '#00ffc8' }}>${item.precioProducto}</span>
                <button
                  className="btn btn-sm"
                  style={{ background: 'linear-gradient(90deg, #ffb300 0%, #00ffc8 100%)', color: '#232526', border: 'none', boxShadow: '0 2px 8px 0 #00ffc844' }}
                  onClick={() => removeFromCart(i)}
                  aria-label="Eliminar item"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </li>
          ))}
          {cart.length === 0 && (
            <li className="list-group-item text-center text-muted py-3" style={{ background: 'rgba(30, 32, 36, 0.95)', color: '#fff' }}>
              El carrito está vacío
            </li>
          )}
        </ul>
        <div className="card-footer" style={{ background: 'rgba(30, 32, 36, 0.95)' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0" style={{ color: '#fff' }}>Total: <span style={{ color: '#00ffc8' }}>${total}</span></h5>
            {cart.length > 0 && (
              <button className="btn btn-sm" style={{ background: 'linear-gradient(90deg, #ffb300 0%, #00ffc8 100%)', color: '#232526', border: 'none', boxShadow: '0 2px 8px 0 #00ffc844' }} onClick={emptyCart}>
                Vaciar carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
