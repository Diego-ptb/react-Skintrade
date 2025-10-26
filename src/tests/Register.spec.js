describe('Validación del formulario de registro', () => {
  it('debería detectar un correo inválido', () => {
    const correo = 'usuario@';
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    expect(regex.test(correo)).toBeFalse();
  });

  it('debería aceptar un correo válido', () => {
    const correo = 'usuario@gmail.com';
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    expect(regex.test(correo)).toBeTrue();
  });

  it('debería rechazar contraseñas cortas', () => {
    const contrasena = '123';
    expect(contrasena.length >= 6).toBeFalse();
  });
});
//aa//