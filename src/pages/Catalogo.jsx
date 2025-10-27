import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initialProducts, precios } from '../data/products';

export default function Catalogo() {
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  

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

  return (
    <>
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
                    onClick={() => navigate(`/product/${p.id}`)}
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
                        <Link to={`/product/${p.id}`} style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.stopPropagation(); /* let Link handle navigation */ }}>
                          {p.title}
                        </Link>
                      </h5>
                      <p className="card-text" style={{ color: '#00ffc8' }}>
                        ${precios[p.title]}
                      </p>
                      {/* botón de añadir al carrito eliminado por petición del usuario */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product modal removed: cards now navigate to product detail pages */}
    </>
  );
}
