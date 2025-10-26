# SkinTrade — React conversion

Este subproyecto contiene una versión React del sitio original (HTML/CSS/JS). No uso Vite por petición del usuario; está preparado para ejecutarse con `react-scripts` (Create React App style).

Pasos para ejecutar:

1. Abrir terminal en `c:\Users\Diego\Downloads\pagina-main\react-app`
2. Copiar la carpeta `images` del proyecto original dentro de `react-app/public` (debe quedar `react-app/public/images/...`)
3. Ejecutar:

```powershell
npm install
npm start
```

Notas:
- El CSS original (`StyleV2.css`) se ha copiado a `src/styles/StyleV2.css` y se importa en `App.jsx`.
- El código jQuery fue porteado a React en `src/pages/Catalogo.jsx` (modal, filtrado y carrito) y `src/pages/Register.jsx` (validación del formulario).
- No se incluyen archivos binarios (imágenes). Copia manualmente la carpeta `images` a `public/images`.

Si prefieres que copie/ajuste más páginas o que configure otra herramienta de bundling (webpack manual, Parcel), dímelo.
