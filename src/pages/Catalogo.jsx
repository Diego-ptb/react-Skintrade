import React, { useState } from 'react';
import { initialProducts, precios } from '../data/products';
import useCart from '../hooks/useCart';

export default function Catalogo() {
  const [category, setCategory] = useState('all');
  const [modal, setModal] = useState(null);
  const { cart, addToCart, removeFromCart, emptyCart, total } = useCart();

  const categories = [
    'all',
    'cuchillos',
    'pistolas',
    'subfusiles',
    'rifles',
    'snipers',
    'escopetas',
    'ligeras'
  ];

  const visible = (p) => category === 'all' || p.category === category;

  // Cargar íconos de Bootstrap y indicar que esta página tiene carrito fijo
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    // Añadir clase al body para reservar espacio al carrito fijo
    document.body.classList.add('has-fixed-cart');
    return () => {
      document.head.removeChild(link);
      document.body.classList.remove('has-fixed-cart');
    };
  }, []);

  return (
    <>
      {/* Carrito Fijo */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '300px',
        zIndex: 999
      }}>
        <div className="card shadow" style={{
          background: 'rgba(30, 32, 36, 0.95)',
          border: '2px solid #00ffc8',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)',
          borderRadius: '16px'
        }}>
          <div className="card-header" style={{
            background: 'linear-gradient(90deg, #00ffc8 0%, #ffb300 100%)',
            color: '#232526',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px'
          }}>
            <h2 className="h5 mb-0">🛒 Carrito de Compras</h2>
          </div>
          <ul className="list-group list-group-flush">
            {cart.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center" style={{
                background: 'rgba(30, 32, 36, 0.95)',
                border: '1px solid #00ffc8',
                color: '#fff'
              }}>
                <div className="d-flex align-items-center">
                  <img src={item.imagenProducto} width="40" className="me-3 rounded" alt={item.tituloProducto} />
                  <span>{item.tituloProducto}</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-3" style={{color: '#00ffc8'}}>${item.precioProducto}</span>
                  <button 
                    className="btn btn-sm" 
                    style={{
                      background: 'linear-gradient(90deg, #ffb300 0%, #00ffc8 100%)',
                      color: '#232526',
                      border: 'none',
                      boxShadow: '0 2px 8px 0 #00ffc844'
                    }}
                    onClick={() => removeFromCart(i)}
                    aria-label="Eliminar item"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </li>
            ))}
            {cart.length === 0 && (
              <li className="list-group-item text-center text-muted py-3" style={{
                background: 'rgba(30, 32, 36, 0.95)',
                color: '#fff'
              }}>
                El carrito está vacío
              </li>
            )}
          </ul>
          <div className="card-footer" style={{background: 'rgba(30, 32, 36, 0.95)'}}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0" style={{color: '#fff'}}>Total: <span style={{color: '#00ffc8'}}>${total}</span></h5>
              {cart.length > 0 && (
                <button 
                  className="btn btn-sm"
                  style={{
                    background: 'linear-gradient(90deg, #ffb300 0%, #00ffc8 100%)',
                    color: '#232526',
                    border: 'none',
                    boxShadow: '0 2px 8px 0 #00ffc844'
                  }}
                  onClick={emptyCart}
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container py-5">
        <h1 className="text-center mb-4">Escoge un producto</h1>
        <div className="row">
          {/* CATEGORÍAS */}
          <div className="col-md-3 mb-4">
            <div className="list-group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`list-group-item list-group-item-action ${category === cat ? 'active' : ''}`}
                  style={{
                    background:
                      category === cat
                        ? 'linear-gradient(90deg, #00ffc8 0%, #ffb300 100%)'
                        : 'rgba(30, 32, 36, 0.95)',
                    color: category === cat ? '#232526' : '#fff',
                    border: '1px solid #00ffc8'
                  }}
                  onClick={() => setCategory(cat)}
                >
                  {cat === 'all'
                    ? 'Todo'
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTOS */}
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {initialProducts.filter(visible).map((p, idx) => (
                <div key={idx} className="col">
                  <div
                    className="card h-100"
                    style={{
                      cursor: 'pointer',
                      background: 'rgba(30, 32, 36, 0.95)',
                      border: '2px solid #00ffc8',
                      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)',
                      borderRadius: '16px'
                    }}
                    onClick={() => setModal(p)}
                  >
                    <img
                      src={p.img}
                      className="card-img-top"
                      alt={p.title}
                      style={{
                        objectFit: 'cover',
                        height: '200px',
                        borderTopLeftRadius: '14px',
                        borderTopRightRadius: '14px'
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: '#fff' }}>
                        {p.title}
                      </h5>
                      <p className="card-text" style={{ color: '#00ffc8' }}>
                        ${precios[p.title]}
                      </p>
                      <button
                        className="btn w-100"
                        style={{
                          background:
                            'linear-gradient(90deg, #00ffc8 0%, #ffb300 100%)',
                          color: '#232526',
                          fontWeight: 'bold',
                          border: 'none',
                          boxShadow: '0 2px 8px 0 #00ffc844'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            tituloProducto: p.title,
                            precioProducto: precios[p.title],
                            imagenProducto: p.img
                          });
                        }}
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* MODAL PRODUCTO */}
      {modal && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => {
            if (e.target.className === 'modal show') setModal(null);
          }}
        >
          <div className="modal-dialog modal-lg">
            <div
              className="modal-content"
              style={{
                background: 'rgba(30, 32, 36, 0.95)',
                border: '2px solid #00ffc8',
                borderRadius: '16px',
                color: '#fff'
              }}
            >
              <div
                className="modal-header"
                style={{
                  background: 'linear-gradient(90deg, #00ffc8 0%, #ffb300 100%)',
                  color: '#232526',
                  borderTopLeftRadius: '14px',
                  borderTopRightRadius: '14px',
                  border: 'none'
                }}
              >
                <h5 className="modal-title">{modal.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className="img-fluid rounded"
                      src={modal.img}
                      alt={modal.title}
                    />
                  </div>
                  <div className="col-md-6">
                    <h3 className="mb-3">${precios[modal.title]}</h3>
                    <p className="text-muted">Categoría: {modal.category}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModal(null)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart({
                      tituloProducto: modal.title,
                      precioProducto: precios[modal.title],
                      imagenProducto: modal.img
                    });
                    setModal(null);
                  }}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
