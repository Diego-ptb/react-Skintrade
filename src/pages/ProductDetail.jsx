import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialProducts, precios } from '../data/products';
import useCart from '../hooks/useCart';

export default function ProductDetail(){
  const { id } = useParams();
  const product = initialProducts.find(p => p.id === id);
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div className="container py-5">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, no encontramos el producto solicitado.</p>
        <Link to="/catalogo" className="register-btn">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.img} alt={product.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h1 style={{color:'#00ffc8'}}>{product.title}</h1>
          <h3 style={{color:'#ffb300'}}>${precios[product.title]}</h3>
          <p style={{color: '#fff'}}>Categoría: <span style={{textTransform: 'capitalize'}}>{product.category}</span></p>
          {product.description && (
            <p style={{color: '#ddd', marginTop: 12}}>{product.description}</p>
          )}
          <div style={{marginTop:20}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
              <button
                className="register-btn"
                style={{flex: 1, padding: '10px 18px'}}
                onClick={() => {
                  const priceValue = precios[product.title] || 0;
                  const item = {
                    id: product.id,
                    title: product.title,
                    tituloProducto: product.title,
                    img: product.img,
                    imagenProducto: product.img,
                    price: priceValue,
                    precioProducto: priceValue,
                    category: product.category
                  };
                  addToCart(item);
                  setJustAdded(true);
                }}
              >
                Añadir al carrito
              </button>
              <Link to="/catalogo" className="register-btn" style={{flex: 1, textAlign: 'center'}}>Volver al Catálogo</Link>
            </div>
            {justAdded && (
              <div style={{marginTop:8, color:'#00ffc8', fontWeight:600}}>Producto añadido al carrito</div>
            )}
            {/* limpiar mensaje después de un momento */}
            {justAdded && (
              <AutoClear setJustAdded={setJustAdded} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutoClear({ setJustAdded }){
  useEffect(() => {
    const t = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(t);
  }, [setJustAdded]);
  return null;
}
