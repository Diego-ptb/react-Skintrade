import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const navigate = useNavigate();
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Bienvenido a <span>SkinTrade</span></h2>
          <p>Tu tienda de skins y armas virtuales con los mejores precios y diseños únicos.</p>
          <img src="/images/menu1.png" alt="image-menu" className="menu-img" />
        </div>
      </section>

      <section className="wrap featured">
        <h1>Productos Destacados</h1>
        <Carousel 
          className="products-carousel" 
          interval={3000} 
        >
          <Carousel.Item>
            <div className="carousel-product">
              <img src="/images/rifle1.webp" alt="AK-47 Herencia" onClick={() => navigate('/catalogo')} style={{cursor: 'pointer'}} />
              <Carousel.Caption>
                <h3>AK-47 | Herencia </h3>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-product">
              <img src="/images/cuchillo2.webp" alt="Cuchillo Kukri Forest" onClick={() => navigate('/catalogo')} style={{cursor: 'pointer'}} />
              <Carousel.Caption>
                <h3>Cuchillo Kukri | Forest DDPAT </h3>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-product">
              <img src="/images/pistola2.webp" alt="Five-SeveN" onClick={() => navigate('/catalogo')} style={{cursor: 'pointer'}} />
              <Carousel.Caption>
                <h3>Five-SeveN </h3>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
}
