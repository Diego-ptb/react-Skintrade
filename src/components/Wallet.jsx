import React, { useEffect, useState } from 'react';

const BALANCE_KEY = 'skintrade_balance_v1';

function validateCardNumber(num){
  const digits = num.replace(/\s+/g,'').replace(/[^0-9]/g,'');
  return digits.length >= 13 && digits.length <= 19;
}

function validateExpiry(exp){
  if (!exp) return false;
  const raw = String(exp).trim();
  const m = raw.match(/^(0[1-9]|1[0-2])(?:\s|\/|\-)?(\d{2}|\d{4})$/);
  if (!m) return false;
  const mm = Number(m[1]);
  const yy = m[2].length === 2 ? Number('20' + m[2]) : Number(m[2]);
  const now = new Date();
  const expMonthIndex = mm - 1;
  const firstOfNextMonth = new Date(yy, expMonthIndex + 1, 1);
  return firstOfNextMonth > now;
}

export default function Wallet({ className }){
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ firstName:'', lastName:'', rut:'', cardNumber:'', expiry:'', cvv:'', amount:'' });
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(BALANCE_KEY);
    if (raw !== null) {
      const val = Number(raw);
      if (!Number.isNaN(val)) setBalance(val);
    } else {
      const defaultBalance = 50000;
      setBalance(defaultBalance);
      localStorage.setItem(BALANCE_KEY, String(defaultBalance));
    }
    function onStorage(e){
      if (e.key === BALANCE_KEY) setBalance(Number(e.newValue || 0));
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function format(n){
    return n.toLocaleString();
  }

  function openTopUp(){
    setForm({ firstName:'', lastName:'', rut:'', cardNumber:'', expiry:'', cvv:'', amount:'' });
    setShowModal(true);
  }

  function closeModal(){
    setShowModal(false);
    setAlertMessage('');
  }

  function handleChange(e){
    const { name, value } = e.target;
    if (name === 'expiry') {
      let v = value.replace(/[^0-9/]/g, '');
      const digits = v.replace(/[^0-9]/g, '');
      if (digits.length >= 3 && !v.includes('/')) {
        v = digits.slice(0, 2) + '/' + digits.slice(2, 6);
      }
      setForm(prev => ({ ...prev, [name]: v }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e){
    e.preventDefault();
    // Basic validation
    const { firstName, lastName, rut, cardNumber, expiry, cvv, amount } = form;
    if(!firstName.trim() || !lastName.trim()) { setAlertMessage('Nombre y apellido son requeridos'); return; }
    if(!rut.trim()) { setAlertMessage('RUT es requerido'); return; }
    if(!validateCardNumber(cardNumber)) { setAlertMessage('Número de tarjeta inválido'); return; }
    if(!validateExpiry(expiry)) { setAlertMessage('Fecha de vencimiento inválida'); return; }
    if(!/^[0-9]{3,4}$/.test(cvv)) { setAlertMessage('CVV inválido'); return; }
    const v = Number(String(amount).replace(/[^0-9.-]+/g,''));
    if(Number.isNaN(v) || v <= 0) { setAlertMessage('Monto inválido'); return; }

    const next = Math.round(balance + v);
    setBalance(next);
    localStorage.setItem(BALANCE_KEY, String(next));
    try { window.dispatchEvent(new StorageEvent('storage', { key: BALANCE_KEY, newValue: String(next) })); } catch {}
    setAlertMessage('Recarga simulada exitosa');
    setShowModal(true);
    try { window.dispatchEvent(new StorageEvent('storage', { key: BALANCE_KEY, newValue: String(next) })); } catch {}
    setTimeout(() => { setShowModal(false); setAlertMessage(''); }, 1100);
  }

  const rootClass = `wallet-root ${className || ''}`.trim();

  return (
    <>
      <div className={rootClass}>
        <div className="wallet-box" title={`Saldo disponible: ${balance}`}>
          <div className="wallet-label">Saldo</div>
          <div className="wallet-amount">${format(balance)}</div>
          <button className="wallet-btn" onClick={openTopUp} aria-label="Recargar saldo">+</button>
        </div>
      </div>

      {/* Modal usando estilos globales .modal .modal-content */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }} role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2>Recargar saldo</h2>
            {/* inline alert (red) shown inside the modal */}
            {alertMessage && (
              <div className="inline-alert" role="alert">{alertMessage}</div>
            )}
            <form className="topup-form" onSubmit={handleSubmit}>
              <div className="topup-form-grid">
                <input className="topup-input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Nombre" required />
                <input className="topup-input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Apellido" required />
                <input className="topup-input full" name="rut" value={form.rut} onChange={handleChange} placeholder="RUT" required />
                <input className="topup-input full" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Número de tarjeta" required />
                <input className="topup-input" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" required />
                <input className="topup-input" name="cvv" value={form.cvv} onChange={handleChange} placeholder="CVV" required />
                <input className="topup-input full" name="amount" value={form.amount} onChange={handleChange} placeholder="Monto a recargar" required />
              </div>
              <div className="topup-actions">
                <button type="button" className="topup-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="topup-submit">Recargar</button>
              </div>
            </form>
            <span className="close" onClick={closeModal}>&times;</span>
          </div>
        </div>
      )}
    </>
  );
}
