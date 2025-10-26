import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/StyleV2.css';
import App from './components/App';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<CartProvider>
		<App />
	</CartProvider>
);


