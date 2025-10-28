import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-grid wrap">
        <div className="footer-section">
          <h3>Sobre nosotros</h3>
          <p>
            Somos SkinTrade, una tienda online especializada en la compra y venta de skins
            para juegos dirigida a usuarios de Latinoamérica. Ofrecemos un catálogo
            curado, precios competitivos y soporte en español para que compres con
            confianza.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: <a href="mailto:skintrade@skintrade.com">skintrade@skintrade.com</a></p>
          <p>Soporte: <a href="mailto:soporte@skintrade.com">soporte@skintrade.com</a></p>
          <p>Tel: +56 9 1234 5678 (WhatsApp)</p>
        </div>

        <div className="footer-section">
          <h3>Nuestra historia</h3>
          <p>
            Nacimos con la misión de facilitar el acceso a skins de calidad para
            jugadores en toda la región. Empezamos como un pequeño proyecto y hoy
            atendemos a miles de clientes, manteniendo siempre transparencia y seguridad
            en cada operación.
          </p>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>© 2025 SkinTrade - Todos los derechos reservados.</div>
    </footer>
  );
}
