import React, { useState } from 'react';

export default function Register() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetir, setRepetir] = useState('');
  const [errores, setErrores] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensajes = [];
    const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!correoRegex.test(correo)) mensajes.push('El correo electrónico no es válido.');
    if (contrasena.length < 6) mensajes.push('La contraseña debe tener al menos 6 caracteres.');
    if (contrasena !== repetir) mensajes.push('Las contraseñas no coinciden.');
    setErrores(mensajes);
    if (mensajes.length === 0) {
      alert('Registro exitoso (demo)');
    }
  };

  return (
    <div className="container py-5">
      {/* Bootstrap container + row = estructura responsiva */}
      <div className="row justify-content-center">
        
        {/* Columna Login */}
        <div className="col-md-5 col-sm-10 mb-4">
          <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form>
              <div className="form-group">
                <label htmlFor="login-usuario">Nombre de usuario</label>
                <input
                  type="text"
                  id="login-usuario"
                  name="login-usuario"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-contrasena">Contraseña</label>
                <input
                  type="password"
                  id="login-contrasena"
                  name="login-contrasena"
                  required
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="register-btn w-100">Iniciar sesión</button>
            </form>
          </div>
        </div>

        {/* Columna Registro */}
        <div className="col-md-5 col-sm-10">
          <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
              {errores.length > 0 && (
                <div id="errores" style={{ color: '#ff4d4d', marginBottom: 16, textAlign: 'center' }}>
                  {errores.map((m, i) => <div key={i}>{m}</div>)}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="usuario">Nombre de usuario Steam</label>
                <input
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  type="text"
                  id="usuario"
                  name="usuario"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="correo">Correo electrónico</label>
                <input
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  value={contrasena}
                  onChange={e => setContrasena(e.target.value)}
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="repetir-contrasena">Repetir contraseña</label>
                <input
                  value={repetir}
                  onChange={e => setRepetir(e.target.value)}
                  type="password"
                  id="repetir-contrasena"
                  name="repetir-contrasena"
                  required
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="register-btn w-100">Registrarse</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
