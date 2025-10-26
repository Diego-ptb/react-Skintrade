import React from 'react';

export default function Home(){
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Bienvenido a <span>SkinTrade</span></h2>
          <p>Tu tienda de skins y armas virtuales con los mejores precios y diseños únicos.</p>
          <a href="/catalogo" className="register-btn">Explorar Catálogo</a>
          <img src="/images/menu1.png" alt="image-menu" className="menu-img" />
        </div>
      </section>

      <section className="wrap featured">
        <h1>Productos Destacados</h1>
        <div className="products-list">
          <div className="product-item">
            <img src="/images/rifle1.webp" alt="" />
            <a href="/catalogo">AK-47 | Herencia 🔥</a>
          </div>
          <div className="product-item">
            <img src="/images/cuchillo2.webp" alt="" />
            <a href="/catalogo">Cuchillo Kukri | Forest DDPAT ⚡</a>
          </div>
          <div className="product-item">
            <img src="/images/pistola2.webp" alt="" />
            <a href="/catalogo">Five-SeveN ✨</a>
          </div>
        </div>
      </section>
    </>
  );
}
